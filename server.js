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

function broadcast(room) {
  room.touched = Date.now();
  io.to(room.code).emit('state', publicState(room));
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
    const questions = cleanList(payload?.questions, 100, 200);
    if (options.length < 2) return ack?.({ error: 'Bitte mindestens 2 Namen eintragen.' });
    if (questions.length < 1) return ack?.({ error: 'Bitte mindestens 1 Frage auswählen.' });

    const code = newCode();
    const room = {
      code,
      hostToken: newToken(),
      title,
      options,
      questions,
      current: -1,
      phase: 'lobby',
      votes: questions.map(() => new Map()),
      players: new Set(),
      touched: Date.now(),
    };
    rooms.set(code, room);
    socket.join(code);
    ack?.({ code, token: room.hostToken, state: publicState(room) });
  });

  socket.on('host:resume', (payload, ack) => {
    const room = hostRoom(socket, payload);
    if (!room) return ack?.({ error: 'Spiel nicht mehr vorhanden.' });
    socket.join(room.code);
    ack?.({ state: publicState(room) });
  });

  socket.on('host:next', (payload) => {
    const room = hostRoom(socket, payload);
    if (!room) return;
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
    const myVote = room.current >= 0 ? room.votes[room.current].get(pid) : undefined;
    ack?.({ state: publicState(room), myVote: myVote ?? null });
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
