// Anonyme Live-Abstimmung – Server
// Hält alle Spielräume im Speicher und verteilt den Spielstand per Socket.io.
// Stimmen werden nur pro (anonymer) Geräte-ID gespeichert, damit jeder genau
// einmal abstimmen kann – an die Clients gehen ausschließlich die Summen.

const path = require('path');
const http = require('http');
const express = require('express');
const QRCode = require('qrcode');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 3000;
const MAX_QUESTIONS = 300;
const ROOM_TTL_MS = 12 * 60 * 60 * 1000; // Räume nach 12 h Inaktivität löschen

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

// QR-Code als SVG für den Beitritts-Link
app.get('/qr.svg', async (req, res) => {
  const text = String(req.query.u || '').slice(0, 500);
  if (!text) return res.status(400).end();
  try {
    const svg = await QRCode.toString(text, { type: 'svg', margin: 1, errorCorrectionLevel: 'M' });
    res.type('image/svg+xml').send(svg);
  } catch {
    res.status(500).end();
  }
});

/** @type {Map<string, any>} */
const rooms = new Map();

function newCode() {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // ohne I/O, um Verwechslungen zu vermeiden
  let code;
  do {
    code = Array.from({ length: 4 }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
  } while (rooms.has(code));
  return code;
}

function newToken() {
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
}

function cleanList(list, maxItems, maxLen) {
  if (!Array.isArray(list)) return [];
  const seen = new Set();
  const out = [];
  for (const item of list) {
    const s = String(item ?? '').trim().slice(0, maxLen);
    if (!s || seen.has(s.toLowerCase())) continue;
    seen.add(s.toLowerCase());
    out.push(s);
    if (out.length >= maxItems) break;
  }
  return out;
}

function tally(room, qIndex) {
  const counts = room.options.map(() => 0);
  const votes = room.votes[qIndex];
  if (!votes) return counts;
  if (votes) for (const opt of votes.values()) counts[opt]++;
  return counts;
}

// Öffentlicher Zustand – enthält nie, wer wofür gestimmt hat
function publicState(room) {
  const q = room.current;
  const votes = q >= 0 ? room.votes[q] : null;
  return {
    code: room.code,
    title: room.title,
    mode: room.mode, // host = Host stellt Fragen | open = alle reichen Fragen ein
    submissions: room.submissions.length,
    options: room.options,
    totalQuestions: room.questions.length,
    phase: room.phase, // lobby | voting | results | end
    index: q,
    question: q >= 0 ? room.questions[q] : null,
    players: room.players.size,
    voted: votes ? votes.size : 0,
    counts: room.phase === 'results' ? tally(room, q) : null,
    summary:
      room.phase === 'end'
        ? room.questions
            .slice(0, room.current + 1) // nur Fragen, die tatsächlich gespielt wurden
            .map((question, i) => ({ question, counts: tally(room, i) }))
        : null,
  };
}

// Nur für den Host: komplette Fragenliste + eingereichte Fragen (anonym)
function hostInfo(room) {
  return { code: room.code, questions: room.questions, submissions: room.submissions };
}

function broadcast(room) {
  room.touched = Date.now();
  io.to(room.code).emit('state', publicState(room));
  io.to(room.code + ':host').emit('hostinfo', hostInfo(room));
}

function hostRoom(socket, payload) {
  const room = rooms.get(String(payload?.code || '').toUpperCase());
  if (!room || room.hostToken !== payload?.token) return null;
  return room;
}

io.on('connection', (socket) => {
  // ---- Host ----
  socket.on('host:create', (payload, ack) => {
    const title = String(payload?.title || '').trim().slice(0, 120) || 'Wer würde am ehesten …?';
    const options = cleanList(payload?.options, 30, 40);
    const mode = payload?.mode === 'open' ? 'open' : 'host';
    const questions = cleanList(payload?.questions, MAX_QUESTIONS, 200);
    if (options.length < 2) return ack?.({ error: 'Bitte mindestens 2 Namen eintragen.' });
    if (mode === 'host' && questions.length < 1) return ack?.({ error: 'Bitte mindestens 1 Frage auswählen.' });

    const code = newCode();
    const room = {
      code,
      hostToken: newToken(),
      title,
      mode,
      options,
      questions,
      submissions: [], // { id, text } – ohne Absender
      submitCount: new Map(), // pid -> Anzahl (nur gegen Spam)
      current: -1,
      phase: 'lobby',
      votes: [],
      players: new Set(),
      touched: Date.now(),
    };
    rooms.set(code, room);
    socket.join([code, code + ':host']);
    ack?.({ code, token: room.hostToken, state: publicState(room), info: hostInfo(room) });
  });

  socket.on('host:resume', (payload, ack) => {
    const room = hostRoom(socket, payload);
    if (!room) return ack?.({ error: 'Spiel nicht mehr vorhanden.' });
    socket.join([room.code, room.code + ':host']);
    ack?.({ state: publicState(room), info: hostInfo(room) });
  });

  // Fragenliste in der Lobby ändern
  socket.on('host:questions', (payload) => {
    const room = hostRoom(socket, payload);
    if (!room || room.phase !== 'lobby') return;
    room.questions = cleanList(payload?.questions, MAX_QUESTIONS, 200);
    broadcast(room);
  });

  socket.on('host:next', (payload, ack) => {
    const room = hostRoom(socket, payload);
    if (!room) return;
    if (room.phase === 'lobby') {
      if (!room.questions.length) return ack?.({ error: 'Nimm erst mindestens 1 Frage ins Spiel.' });
      room.votes = room.questions.map(() => new Map());
    }
    ack?.({ ok: true });
    if (room.current + 1 >= room.questions.length) {
      room.phase = 'end';
    } else {
      room.current++;
      room.phase = 'voting';
    }
    broadcast(room);
  });

  socket.on('host:reveal', (payload) => {
    const room = hostRoom(socket, payload);
    if (!room || room.phase !== 'voting') return;
    room.phase = 'results';
    broadcast(room);
  });

  socket.on('host:end', (payload) => {
    const room = hostRoom(socket, payload);
    if (!room) return;
    if (room.phase === 'lobby') room.votes = room.questions.map(() => new Map());
    room.phase = 'end';
    broadcast(room);
  });

  // ---- Spieler ----
  socket.on('player:join', (payload, ack) => {
    const room = rooms.get(String(payload?.code || '').trim().toUpperCase());
    if (!room) return ack?.({ error: 'Diesen Spielcode gibt es nicht.' });
    const pid = String(payload?.pid || '').slice(0, 64);
    if (!pid) return ack?.({ error: 'Ungültiges Gerät.' });
    socket.data.code = room.code;
    socket.data.pid = pid;
    socket.join(room.code);
    room.players.add(pid);
    const myVote = room.current >= 0 ? room.votes[room.current]?.get(pid) : undefined;
    ack?.({ state: publicState(room), myVote: myVote ?? null });
    broadcast(room);
  });

  // Eigene Fragen einreichen (Modus "open", in der Lobby)
  socket.on('player:submit', (payload, ack) => {
    const room = rooms.get(socket.data.code);
    const pid = socket.data.pid;
    if (!room || !pid) return ack?.({ error: 'Nicht im Spiel.' });
    if (room.mode !== 'open') return ack?.({ error: 'In diesem Spiel stellt der Host die Fragen.' });
    if (room.phase !== 'lobby') return ack?.({ error: 'Das Spiel läuft schon.' });
    const texts = cleanList(String(payload?.text || '').split('\n'), 10, 200);
    if (!texts.length) return ack?.({ error: 'Bitte eine Frage eintippen.' });
    const used = room.submitCount.get(pid) || 0;
    if (used + texts.length > 30) return ack?.({ error: 'Du hast schon genug Fragen eingereicht 😄' });
    room.submitCount.set(pid, used + texts.length);
    const known = new Set(room.submissions.map((x) => x.text.toLowerCase()));
    for (const text of texts) {
      if (known.has(text.toLowerCase())) continue;
      room.submissions.push({ id: room.submissions.length + 1, text });
      known.add(text.toLowerCase());
    }
    ack?.({ ok: true, added: texts });
    broadcast(room);
  });

  socket.on('player:vote', (payload, ack) => {
    const room = rooms.get(socket.data.code);
    const pid = socket.data.pid;
    if (!room || !pid) return ack?.({ error: 'Nicht im Spiel.' });
    if (room.phase !== 'voting' || payload?.index !== room.current) {
      return ack?.({ error: 'Abstimmung ist schon vorbei.' });
    }
    const opt = Number(payload?.option);
    if (!Number.isInteger(opt) || opt < 0 || opt >= room.options.length) {
      return ack?.({ error: 'Ungültige Auswahl.' });
    }
    room.votes[room.current].set(pid, opt); // erneutes Abstimmen ändert die Stimme
    ack?.({ ok: true });
    broadcast(room);
  });
});

// Alte Räume aufräumen
setInterval(() => {
  const now = Date.now();
  for (const [code, room] of rooms) if (now - room.touched > ROOM_TTL_MS) rooms.delete(code);
}, 30 * 60 * 1000).unref();

server.listen(PORT, () => {
  console.log(`Umfrage-Seite läuft auf http://localhost:${PORT}`);
});
