// Votum – anonyme Live-Abstimmung für die Gruppe
// Alle Spielräume liegen im Speicher, der Spielstand wird per Socket.io verteilt.
// Stimmen werden nur pro (anonymer) Geräte-ID gespeichert, damit jeder genau
// einmal abstimmt – an die Clients gehen ausschließlich Summen.
//
// Modi:
//   host – der Host stellt alle Fragen
//   open – alle reichen in der Lobby Fragen ein, der Host wählt aus
//   said – "Wer hat's gesagt?": jeder beantwortet eine Meinungsfrage, 1–4 Aussagen
//          werden gezogen, die Gruppe rät, von wem sie stammen
//   impostor – alle bekommen dasselbe Wort, nur die Impostor nicht; die Gruppe
//          versucht per Abstimmung die Impostor rauszuwerfen

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

const newToken = () => Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Wörter für Impostor: [{ w: Wort, d: Deck, h: Tipp }]
function cleanWords(list) {
  if (!Array.isArray(list)) return [];
  const out = [];
  const seen = new Set();
  for (const x of list.slice(0, 5000)) {
    const w = String(x?.w ?? '').trim().slice(0, 60);
    if (!w || seen.has(w.toLowerCase())) continue;
    seen.add(w.toLowerCase());
    out.push({ w, d: String(x?.d ?? '').trim().slice(0, 40), h: String(x?.h ?? '').trim().slice(0, 60) });
  }
  return out;
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

// ---------- Abstimmungen ----------
function openVote(room) {
  room.voteKey++;
  room.votes.set(room.voteKey, new Map());
}
function tally(room, key) {
  const counts = room.options.map(() => 0);
  const votes = room.votes.get(key);
  if (votes) for (const opt of votes.values()) counts[opt]++;
  return counts;
}
const currentVotes = (room) => room.votes.get(room.voteKey);

// ---------- Zustand ----------
// Öffentlicher Zustand – enthält nie, wer wofür gestimmt oder was geschrieben hat
function publicState(room) {
  const votes = currentVotes(room);
  const base = {
    code: room.code,
    title: room.title,
    mode: room.mode,
    options: room.options,
    phase: room.phase,
    players: room.players.size,
    submissions: room.submissions.length,
    allowSubmit: canSubmit(room),
    totalQuestions: room.questions.length,
    voteKey: room.voteKey,
    voted: votes ? votes.size : 0,
  };

  if (room.mode === 'impostor') return impostorState(room, base);

  if (room.mode !== 'said') {
    const q = room.current;
    return {
      ...base,
      index: q,
      question: q >= 0 ? room.questions[q] : null,
      counts: room.phase === 'results' ? tally(room, room.voteKey) : null,
      summary: room.phase === 'end' ? room.history : null,
    };
  }

  const pick = room.picks[room.pickIdx];
  const showPick = ['guess', 'reveal'].includes(room.phase) && pick;
  return {
    ...base,
    perRound: room.perRound,
    round: room.round,
    claimed: [...room.claims.values()],
    writers: room.claims.size,
    written: room.answers.size,
    done: [...room.answers.keys()].map((pid) => room.claims.get(pid)).filter((x) => x != null),
    pickIndex: room.pickIdx,
    picksTotal: room.picks.length,
    prompt: showPick ? pick.prompt : null,
    quote: showPick ? pick.text : null,
    author: room.phase === 'reveal' && pick ? pick.author : null,
    counts: room.phase === 'reveal' ? tally(room, room.voteKey) : null,
    roundRecap: room.phase === 'roundEnd' ? room.history.filter((h) => h.round === room.round) : null,
    summary: room.phase === 'end' ? room.history : null,
  };
}

// ---------- Impostor ----------
const nameOf = (room, pid) => room.claims.get(pid);
const aliveNames = (room) => [...room.alive].map((pid) => nameOf(room, pid)).filter((x) => x != null);
function impostorState(room, base) {
  const showResult = room.result && ['kicked', 'roundOver', 'end'].includes(room.phase);
  return {
    ...base,
    round: room.round,
    claimed: [...room.claims.values()],
    alive: aliveNames(room),
    impostorCount: room.roundImpostors || room.impostorCount,
    hints: room.hints,
    covered: [...room.covered].filter((pid) => room.alive.has(pid)).map((pid) => nameOf(room, pid)),
    voters: room.alive.size,
    words: room.words.length,
    kicked: ['kicked'].includes(room.phase) ? room.kicked : null,
    counts: room.phase === 'kicked' && room.kicked?.byVote ? tally(room, room.voteKey) : null,
    result: showResult ? room.result : null,
    scores: [...room.scores.entries()].map(([name, pts]) => ({ name, pts })).sort((a, b) => b.pts - a.pts),
    summary: room.phase === 'end' ? room.history : null,
  };
}
function startImpostorRound(room) {
  const pids = [...room.claims.keys()];
  if (pids.length < 3) return 'Für Impostor braucht ihr mindestens 3 Spieler mit Namen.';
  if (!room.words.length) return 'Es sind keine Wörter ausgewählt.';
  if (!room.wordQueue.length) room.wordQueue = shuffle(room.words.slice());
  room.word = room.wordQueue.pop();
  const n = Math.max(1, Math.min(room.impostorCount, Math.ceil(pids.length / 2) - 1));
  room.roundImpostors = n;
  room.impostors = new Set(shuffle(pids.slice()).slice(0, n));
  room.alive = new Set(pids);
  room.covered = new Set();
  room.kicked = null;
  room.result = null;
  room.round++;
  room.phase = 'roles';
  return null;
}
// Prüft, ob eine Seite gewonnen hat
function checkImpostorWin(room) {
  const aliveImp = [...room.alive].filter((pid) => room.impostors.has(pid)).length;
  const aliveCrew = room.alive.size - aliveImp;
  if (aliveImp === 0) return finishImpostorRound(room, 'crew', 'Alle Impostor wurden enttarnt.');
  if (aliveImp >= aliveCrew) return finishImpostorRound(room, 'impostor', 'Die Impostor sind in der Überzahl.');
  return false;
}
function finishImpostorRound(room, winner, reason) {
  const impNames = [...room.impostors].map((pid) => nameOf(room, pid));
  room.result = { winner, reason, word: room.word.w, deck: room.word.d, impostors: impNames };
  // Punkte: Crew-Sieg = +1 für jedes Crew-Mitglied, Impostor-Sieg = +2 für jeden Impostor
  if (winner) {
    for (const [pid, name] of room.claims) {
      const isImp = room.impostors.has(pid);
      if (!room.roundPlayers.has(pid)) continue; // nur wer in dieser Runde mitgespielt hat
      if (winner === 'crew' && !isImp) room.scores.set(name, (room.scores.get(name) || 0) + 1);
      if (winner === 'impostor' && isImp) room.scores.set(name, (room.scores.get(name) || 0) + 2);
    }
  }
  room.history.push({ round: room.round, word: room.word.w, deck: room.word.d, impostors: impNames, winner, reason });
  return true;
}

// Nur für den Host: komplette Fragenliste + eingereichte Fragen (ohne Absender)
// Bei "Wer hat's gesagt?" zusätzlich: wer welche Frage bekommen und schon beantwortet hat (ohne Antworttext)
const hostInfo = (room) => ({
  code: room.code,
  questions: room.questions,
  submissions: room.submissions,
  assignments: room.mode === 'said'
    ? [...room.claims].map(([pid, name]) => ({ name, prompt: room.assign.get(pid) ?? null, done: room.answers.has(pid) }))
    : [],
});
const canSubmit = (room) => room.mode === 'open' || (room.mode === 'said' && room.allowSubmit);

// Nur für den jeweiligen Spieler: sein Name, seine Frage, seine Antwort, seine Stimme
function privateInfo(room, pid) {
  const pick = room.picks[room.pickIdx];
  return {
    code: room.code,
    myName: room.claims.has(pid) ? room.claims.get(pid) : null,
    prompt: room.assign.get(pid) ?? null,
    myAnswer: room.answers.get(pid) ?? null,
    isMine: room.mode === 'said' && ['guess', 'reveal'].includes(room.phase) && pick?.pid === pid,
    voteKey: room.voteKey,
    myVote: currentVotes(room)?.get(pid) ?? null,
    ...(room.mode === 'impostor' ? impostorPrivate(room, pid) : {}),
  };
}
function impostorPrivate(room, pid) {
  const inRound = room.phase !== 'lobby' && room.word && room.alive && (room.alive.has(pid) || room.roundPlayers?.has(pid));
  if (!inRound || room.phase === 'end') return { role: null };
  const isImp = room.impostors.has(pid);
  return {
    role: isImp ? 'impostor' : 'crew',
    word: isImp ? null : room.word.w,
    deck: isImp && !room.hints ? null : room.word.d,
    hint: isImp && room.hints ? room.word.h : null,
    covered: room.covered.has(pid),
    alive: room.alive.has(pid),
  };
}

function broadcast(room) {
  room.touched = Date.now();
  io.to(room.code).emit('state', publicState(room));
  io.to(room.code + ':host').emit('hostinfo', hostInfo(room));
  for (const pid of room.players) io.to(`${room.code}:p:${pid}`).emit('private', privateInfo(room, pid));
}

function hostRoom(payload) {
  const room = rooms.get(String(payload?.code || '').toUpperCase());
  if (!room || room.hostToken !== payload?.token) return null;
  return room;
}

// ---------- "Wer hat's gesagt?" ----------
function nextPrompt(room, avoid) {
  if (!room.promptQueue.length) room.promptQueue = shuffle(room.questions.slice());
  // möglichst keine doppelte Frage in derselben Runde
  const i = room.promptQueue.findIndex((p) => !avoid.has(p));
  const [p] = room.promptQueue.splice(i >= 0 ? i : 0, 1);
  avoid.add(p);
  return p;
}
function assignPrompt(room, pid) {
  room.assign.set(pid, nextPrompt(room, new Set(room.assign.values())));
}
function startRound(room) {
  room.round++;
  room.assign = new Map();
  room.answers = new Map();
  room.picks = [];
  room.pickIdx = 0;
  for (const pid of room.claims.keys()) assignPrompt(room, pid);
  room.phase = 'writing';
}

io.on('connection', (socket) => {
  // ================= Host =================
  socket.on('host:create', (payload, ack) => {
    const title = String(payload?.title || '').trim().slice(0, 120) || 'Wer würde am ehesten …?';
    const mode = ['host', 'open', 'said', 'impostor'].includes(payload?.mode) ? payload.mode : 'host';
    const options = cleanList(payload?.options, 30, 40);
    const questions = cleanList(payload?.questions, MAX_QUESTIONS, 200);
    const perRound = Math.min(4, Math.max(1, Number(payload?.perRound) || 2));
    if (options.length < 2) return ack?.({ error: 'Bitte mindestens 2 Namen eintragen.' });
    const words = cleanWords(payload?.words);
    if ((mode === 'host' || mode === 'said') && questions.length < 1) return ack?.({ error: 'Bitte mindestens 1 Frage auswählen.' });
    if (mode === 'impostor' && !words.length) return ack?.({ error: 'Bitte mindestens ein Wort-Deck auswählen.' });

    const code = newCode();
    const room = {
      code,
      hostToken: newToken(),
      title,
      mode,
      allowSubmit: payload?.allowSubmit !== false,
      options,
      questions,
      submissions: [], // { id, text } – ohne Absender
      submitCount: new Map(), // pid -> Anzahl (nur gegen Spam)
      phase: 'lobby',
      players: new Set(),
      votes: new Map(), // voteKey -> Map(pid -> option)
      voteKey: 0,
      history: [],
      current: -1,
      // "Wer hat's gesagt?"
      perRound,
      round: 0,
      claims: new Map(), // pid -> Index des Namens
      assign: new Map(), // pid -> Frage
      answers: new Map(), // pid -> Aussage
      picks: [],
      pickIdx: 0,
      promptQueue: [],
      // Impostor
      words,
      wordQueue: [],
      word: null,
      impostorCount: Math.min(3, Math.max(1, Number(payload?.impostorCount) || 1)),
      roundImpostors: 0,
      hints: payload?.hints !== false,
      impostors: new Set(),
      alive: new Set(),
      roundPlayers: new Set(),
      covered: new Set(),
      kicked: null,
      result: null,
      scores: new Map(),
      touched: Date.now(),
    };
    rooms.set(code, room);
    socket.join([code, code + ':host']);
    ack?.({ code, token: room.hostToken, state: publicState(room), info: hostInfo(room) });
  });

  socket.on('host:resume', (payload, ack) => {
    const room = hostRoom(payload);
    if (!room) return ack?.({ error: 'Spiel nicht mehr vorhanden.' });
    socket.join([room.code, room.code + ':host']);
    ack?.({ state: publicState(room), info: hostInfo(room) });
  });

  // Fragenliste in der Lobby ändern
  socket.on('host:questions', (payload) => {
    const room = hostRoom(payload);
    if (!room || room.phase !== 'lobby') return;
    room.questions = cleanList(payload?.questions, MAX_QUESTIONS, 200);
    room.promptQueue = [];
    broadcast(room);
  });

  socket.on('host:next', (payload, ack) => {
    const room = hostRoom(payload);
    if (!room) return ack?.({ error: 'Spiel nicht gefunden.' });
    // Schutz vor Doppelklicks: nur weiterschalten, wenn wir noch in der erwarteten Phase sind
    if (payload?.from && payload.from !== room.phase) return ack?.({ ok: true });

    if (room.mode === 'impostor') {
      switch (room.phase) {
        case 'lobby':
        case 'roundOver': {
          const err = startImpostorRound(room);
          if (err) return ack?.({ error: err });
          room.roundPlayers = new Set(room.alive);
          break;
        }
        case 'roles':
          openVote(room);
          room.phase = 'voting';
          break;
        case 'voting':
          resolveImpostorVote(room);
          break;
        case 'kicked':
          if (room.result) {
            const err = startImpostorRound(room);
            if (err) return ack?.({ error: err });
            room.roundPlayers = new Set(room.alive);
          } else {
            room.phase = 'roles'; // weiterspielen mit demselben Wort
          }
          break;
        default:
          return ack?.({ error: 'Das Spiel ist vorbei.' });
      }
      ack?.({ ok: true });
      return broadcast(room);
    }

    if (room.mode !== 'said') {
      if (room.phase === 'lobby' && !room.questions.length) return ack?.({ error: 'Nimm erst mindestens 1 Frage ins Spiel.' });
      if (room.current + 1 >= room.questions.length) {
        room.phase = 'end';
      } else {
        room.current++;
        openVote(room);
        room.phase = 'voting';
      }
    } else {
      switch (room.phase) {
        case 'lobby':
        case 'roundEnd':
          if (!room.questions.length) return ack?.({ error: 'Es sind keine Fragen ausgewählt.' });
          if (!room.claims.size) return ack?.({ error: 'Noch hat kein Spieler seinen Namen gewählt.' });
          startRound(room);
          break;
        case 'writing': {
          if (!room.answers.size) return ack?.({ error: 'Noch hat niemand eine Aussage abgeschickt.' });
          const entries = shuffle([...room.answers.entries()]).slice(0, room.perRound);
          room.picks = entries.map(([pid, text]) => ({
            pid,
            text,
            prompt: room.assign.get(pid),
            author: room.claims.get(pid),
          }));
          room.pickIdx = 0;
          openVote(room);
          room.phase = 'guess';
          break;
        }
        case 'guess':
          revealSaid(room);
          break;
        case 'reveal':
          room.pickIdx++;
          if (room.pickIdx < room.picks.length) {
            openVote(room);
            room.phase = 'guess';
          } else {
            room.phase = 'roundEnd';
          }
          break;
        default:
          return ack?.({ error: 'Das Spiel ist vorbei.' });
      }
    }
    ack?.({ ok: true });
    broadcast(room);
  });

  function resolveImpostorVote(room) {
    const counts = tally(room, room.voteKey);
    const max = Math.max(...counts);
    const top = counts.map((c, i) => (c === max ? i : -1)).filter((i) => i >= 0);
    room.phase = 'kicked';
    if (max === 0 || top.length > 1) {
      room.kicked = { byVote: true, tie: true };
      return;
    }
    const pid = [...room.alive].find((p) => nameOf(room, p) === top[0]);
    if (!pid) { room.kicked = { byVote: true, tie: true }; return; }
    room.alive.delete(pid);
    room.kicked = { byVote: true, name: top[0], wasImpostor: room.impostors.has(pid) };
    checkImpostorWin(room);
  }

  // Ein Spieler hat laut ein Wort reingerufen – der Host entscheidet, ob es richtig war
  socket.on('host:guess', (payload, ack) => {
    const room = hostRoom(payload);
    if (!room || room.mode !== 'impostor' || !['roles', 'voting'].includes(room.phase)) return ack?.({ error: 'Gerade nicht möglich.' });
    const name = Number(payload?.option);
    const pid = [...room.alive].find((p) => nameOf(room, p) === name);
    if (!pid) return ack?.({ error: 'Dieser Spieler ist nicht (mehr) im Spiel.' });
    const isImp = room.impostors.has(pid);
    if (payload?.correct) {
      if (!isImp) return ack?.({ error: 'Das war gar kein Impostor – er kannte das Wort ja.' });
      room.phase = 'kicked';
      room.kicked = { guessed: true, name, wasImpostor: true, correct: true };
      finishImpostorRound(room, 'impostor', `${room.options[name]} hat das Wort erraten.`);
    } else {
      room.alive.delete(pid);
      room.phase = 'kicked';
      room.kicked = { guessed: true, name, wasImpostor: isImp, correct: false };
      checkImpostorWin(room);
    }
    ack?.({ ok: true });
    broadcast(room);
  });

  // Runde abbrechen und auflösen
  socket.on('host:endRound', (payload) => {
    const room = hostRoom(payload);
    if (!room || room.mode !== 'impostor' || !room.word || ['lobby', 'roundOver', 'end'].includes(room.phase)) return;
    if (!room.result) finishImpostorRound(room, null, 'Runde beendet.');
    room.phase = 'roundOver';
    broadcast(room);
  });

  // Wörter im laufenden Spiel ändern (gilt ab der nächsten Runde)
  socket.on('host:words', (payload) => {
    const room = hostRoom(payload);
    if (!room || room.mode !== 'impostor') return;
    const words = cleanWords(payload?.words);
    if (!words.length) return;
    room.words = words;
    room.wordQueue = [];
    if (payload?.impostorCount) room.impostorCount = Math.min(3, Math.max(1, Number(payload.impostorCount)));
    if (typeof payload?.hints === 'boolean') room.hints = payload.hints;
    broadcast(room);
  });

  function revealSaid(room) {
    const pick = room.picks[room.pickIdx];
    room.phase = 'reveal';
    room.history.push({
      round: room.round,
      prompt: pick.prompt,
      quote: pick.text,
      author: pick.author,
      counts: tally(room, room.voteKey),
    });
  }

  socket.on('host:reveal', (payload) => {
    const room = hostRoom(payload);
    if (!room) return;
    if (room.mode === 'impostor') {
      if (room.phase !== 'voting') return;
      resolveImpostorVote(room);
      return broadcast(room);
    }
    if (room.phase === 'voting') {
      room.phase = 'results';
      room.history.push({ question: room.questions[room.current], counts: tally(room, room.voteKey) });
    } else if (room.phase === 'guess') {
      revealSaid(room);
    } else return;
    broadcast(room);
  });

  socket.on('host:end', (payload) => {
    const room = hostRoom(payload);
    if (!room) return;
    if (room.mode === 'impostor' && room.word && !room.result && !['lobby', 'roundOver'].includes(room.phase)) finishImpostorRound(room, null, 'Spiel beendet.');
    if (room.mode !== 'impostor' && room.phase === 'voting') room.history.push({ question: room.questions[room.current], counts: tally(room, room.voteKey) });
    room.phase = 'end';
    broadcast(room);
  });

  // ================= Spieler =================
  socket.on('player:join', (payload, ack) => {
    const room = rooms.get(String(payload?.code || '').trim().toUpperCase());
    if (!room) return ack?.({ error: 'Diesen Spielcode gibt es nicht.' });
    const pid = String(payload?.pid || '').slice(0, 64);
    if (!pid) return ack?.({ error: 'Ungültiges Gerät.' });
    socket.data.code = room.code;
    socket.data.pid = pid;
    socket.join([room.code, `${room.code}:p:${pid}`]);
    room.players.add(pid);
    ack?.({ state: publicState(room), me: privateInfo(room, pid) });
    broadcast(room);
  });

  const playerRoom = () => {
    const room = rooms.get(socket.data.code);
    return room && socket.data.pid ? room : null;
  };

  // Namen wählen ("Wer hat's gesagt?")
  socket.on('player:claim', (payload, ack) => {
    const room = playerRoom();
    if (!room || !['said', 'impostor'].includes(room.mode)) return ack?.({ error: 'Nicht möglich.' });
    const pid = socket.data.pid;
    const opt = Number(payload?.option);
    if (room.mode === 'impostor' && room.alive.has(pid) && !['lobby', 'roundOver'].includes(room.phase)) {
      return ack?.({ error: 'Während einer Runde kannst du deinen Namen nicht ändern.' });
    }
    if (!Number.isInteger(opt) || opt < 0 || opt >= room.options.length) return ack?.({ error: 'Ungültiger Name.' });
    for (const [other, o] of room.claims) if (o === opt && other !== pid) return ack?.({ error: 'Der Name ist schon vergeben.' });
    // Wer schon eine Aussage abgeschickt hat, kann den Namen in dieser Runde nicht mehr wechseln
    if (room.answers.has(pid) && room.phase !== 'lobby' && room.phase !== 'roundEnd') {
      return ack?.({ error: 'Du hast diese Runde schon geschrieben.' });
    }
    room.claims.set(pid, opt);
    if (room.phase === 'writing' && !room.assign.has(pid)) assignPrompt(room, pid);
    ack?.({ ok: true });
    broadcast(room);
  });

  // Wort verdecken / wieder ansehen (Impostor)
  socket.on('player:cover', (payload) => {
    const room = playerRoom();
    if (!room || room.mode !== 'impostor' || !room.alive.has(socket.data.pid)) return;
    if (payload?.covered) room.covered.add(socket.data.pid);
    else room.covered.delete(socket.data.pid);
    broadcast(room);
  });

  // Aussage abschicken ("Wer hat's gesagt?")
  socket.on('player:answer', (payload, ack) => {
    const room = playerRoom();
    if (!room || room.mode !== 'said') return ack?.({ error: 'Nicht möglich.' });
    const pid = socket.data.pid;
    if (room.phase !== 'writing') return ack?.({ error: 'Gerade wird nicht geschrieben.' });
    if (!room.assign.has(pid)) return ack?.({ error: 'Wähle zuerst deinen Namen.' });
    const text = String(payload?.text || '').trim().slice(0, 300);
    if (!text) return ack?.({ error: 'Schreib erst deine Meinung.' });
    room.answers.set(pid, text);
    ack?.({ ok: true });
    broadcast(room);
  });

  // Eigene Fragen einreichen (Modus "open", in der Lobby)
  socket.on('player:submit', (payload, ack) => {
    const room = playerRoom();
    if (!room) return ack?.({ error: 'Nicht im Spiel.' });
    const pid = socket.data.pid;
    if (!canSubmit(room)) return ack?.({ error: 'In diesem Spiel stellt der Host die Fragen.' });
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
    const room = playerRoom();
    if (!room) return ack?.({ error: 'Nicht im Spiel.' });
    if (!['voting', 'guess'].includes(room.phase) || payload?.key !== room.voteKey) {
      return ack?.({ error: 'Abstimmung ist schon vorbei.' });
    }
    const opt = Number(payload?.option);
    if (!Number.isInteger(opt) || opt < 0 || opt >= room.options.length) return ack?.({ error: 'Ungültige Auswahl.' });
    if (room.mode === 'impostor') {
      if (!room.alive.has(socket.data.pid)) return ack?.({ error: 'Du bist raus und kannst nicht mehr abstimmen.' });
      if (!aliveNames(room).includes(opt)) return ack?.({ error: 'Dieser Spieler ist schon raus.' });
      if (nameOf(room, socket.data.pid) === opt) return ack?.({ error: 'Du kannst dich nicht selbst rauswerfen.' });
    }
    currentVotes(room).set(socket.data.pid, opt); // erneutes Abstimmen ändert die Stimme
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
  console.log(`Votum läuft auf http://localhost:${PORT}`);
});
