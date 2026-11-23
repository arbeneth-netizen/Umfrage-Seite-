// Modus "Wer fliegt?" – Quiz mit Moderator
//
// Ablauf: lobby → round (Moderator stellt Fragen reihum) → vote (alle stimmen, wer ein
// Leben verliert) → tie (bei Gleichstand entscheidet der Moderator) → loss → nächste Runde …
// Wenn nur noch zwei übrig sind: final (beide beantworten 10 Fragen am Handy) → review
// (Moderator vergibt Punkte) → end.

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function cleanQuestions(list) {
  if (!Array.isArray(list)) return [];
  const out = [];
  const seen = new Set();
  for (const x of list.slice(0, 5000)) {
    const q = String(x?.q ?? '').trim().slice(0, 300);
    const a = String(x?.a ?? '').trim().slice(0, 200);
    if (!q || !a || seen.has(q)) continue;
    seen.add(q);
    out.push({ q, a, d: String(x?.d ?? '').slice(0, 20) });
  }
  return out;
}

function initQuiz(payload, optionsCount) {
  const n = (v, min, max, def) => Math.min(max, Math.max(min, Number(v) || def));
  return {
    lives: n(payload?.lives, 1, 9, 3),
    roundType: payload?.roundType === 'count' ? 'count' : 'time',
    roundTime: n(payload?.roundTime, 10, 1800, 120),
    perPlayer: n(payload?.perPlayer, 1, 10, 2),
    pool: cleanQuestions(payload?.quiz),
    queue: [],
    order: Array.from({ length: optionsCount }, (_, i) => i),
    livesMap: new Map(),
    players: [],
    round: 0,
    ptr: -1,
    current: null,
    timer: { running: false, remaining: 0, endsAt: 0 },
    timeout: null,
    stats: new Map(),
    avail: new Map(),
    roundDone: false,
    timeUp: false,
    candidates: [],
    tie: [],
    loss: null,
    outOrder: [],
    finalists: [],
    finalQs: [],
    finalAns: [[], []],
    points: [],
    reviewIdx: 0,
  };
}

const isAlive = (z, name) => (z.livesMap.get(name) || 0) > 0;
const aliveList = (z) => z.players.filter((n) => isAlive(z, n));
const drawQ = (z) => {
  if (!z.queue.length) z.queue = shuffle(z.pool.slice());
  return z.queue.pop();
};
const available = (z, name) => (z.avail.has(name) ? z.avail.get(name) : (z.stats.get(name)?.wrong.length || 0) > 0);

function nextPlayer(z) {
  const len = z.order.length;
  for (let k = 1; k <= len; k++) {
    const name = z.order[(z.ptr + k + len) % len];
    if (!z.players.includes(name) || !isAlive(z, name)) continue;
    if (z.roundType === 'count' && (z.stats.get(name)?.asked || 0) >= z.perPlayer) continue;
    return name;
  }
  return null;
}
function assignNext(z) {
  const to = nextPlayer(z);
  if (to == null) { z.current = null; z.roundDone = true; return; }
  z.current = { ...drawQ(z), to };
  z.ptr = z.order.indexOf(to);
}
function stopTimer(z) {
  if (z.timeout) clearTimeout(z.timeout);
  z.timeout = null;
  if (z.timer.running) {
    z.timer.remaining = Math.max(0, (z.timer.endsAt - Date.now()) / 1000);
    z.timer.running = false;
  }
}
function startRound(room) {
  const z = room.qz;
  stopTimer(z);
  z.round++;
  z.stats = new Map(aliveList(z).map((n) => [n, { right: 0, wrong: [], asked: 0 }]));
  z.avail = new Map();
  z.roundDone = false;
  z.timeUp = false;
  z.timer = { running: false, remaining: z.roundTime, endsAt: 0 };
  z.loss = null;
  z.candidates = [];
  z.tie = [];
  assignNext(z);
  room.phase = 'round';
}
function startFinal(room) {
  const z = room.qz;
  stopTimer(z);
  z.finalists = aliveList(z).slice(0, 2);
  z.finalQs = Array.from({ length: 10 }, () => drawQ(z));
  z.finalAns = [[], []];
  z.points = Array(10).fill(null);
  z.reviewIdx = 0;
  room.phase = 'final';
}
function applyLoss(room, name, byVote) {
  const z = room.qz;
  const lives = Math.max(0, (z.livesMap.get(name) || 0) - 1);
  z.livesMap.set(name, lives);
  if (lives === 0) z.outOrder.push(name);
  z.loss = { name, lives, out: lives === 0, byVote };
  room.phase = 'loss';
}
function afterLoss(room) {
  const z = room.qz;
  const alive = aliveList(z).length;
  if (alive > 2) startRound(room);
  else if (alive === 2) startFinal(room);
  else room.phase = 'end';
}
function finalScore(z) {
  const s = [0, 0];
  for (const p of z.points) {
    if (p === 0 || p === 'both') s[0]++;
    if (p === 1 || p === 'both') s[1]++;
  }
  return s;
}

// ---------- Zustand ----------
function quizState(room, base, tally) {
  const z = room.qz;
  const st = {
    ...base,
    claimed: [...room.claims.values()],
    round: z.round,
    roundType: z.roundType,
    roundTime: z.roundTime,
    perPlayer: z.perPlayer,
    maxLives: z.lives,
    order: z.order,
    qPlayers: z.players,
    lives: z.players.map((n) => z.livesMap.get(n) || 0),
    alive: aliveList(z),
    turn: room.phase === 'round' ? z.current?.to ?? null : null,
    timer: { running: z.timer.running, remaining: z.timer.remaining, endsAt: z.timer.endsAt },
    now: Date.now(),
    roundDone: z.roundDone,
    timeUp: z.timeUp,
    asked: [...z.stats.values()].reduce((a, s) => a + s.asked, 0),
    askTotal: z.stats.size * z.perPlayer,
    candidates: ['vote', 'tie'].includes(room.phase) ? z.candidates : [],
    tie: room.phase === 'tie' ? z.tie : [],
    voters: aliveList(z).length,
    loss: room.phase === 'loss' ? z.loss : null,
    counts: (room.phase === 'loss' && z.loss?.byVote) || room.phase === 'tie' ? tally(room, room.voteKey) : null,
    finalists: z.finalists,
    finalProgress: z.finalAns.map((a) => a.length),
    outOrder: z.outOrder,
  };
  if (room.phase === 'review') {
    const i = z.reviewIdx;
    st.review = { idx: i, q: z.finalQs[i].q, a: z.finalQs[i].a, answers: [z.finalAns[0][i] ?? '', z.finalAns[1][i] ?? ''], point: z.points[i] };
    st.finalScore = finalScore(z);
  }
  if (room.phase === 'end' && z.finalists.length === 2 && z.finalAns[0].length) {
    st.finalRows = z.finalQs.map((x, i) => ({ q: x.q, a: x.a, ans: [z.finalAns[0][i] ?? '', z.finalAns[1][i] ?? ''], pt: z.points[i] }));
    st.finalScore = finalScore(z);
  }
  if (room.phase === 'end') {
    const al = aliveList(z);
    if (st.finalScore) {
      const [a, b] = st.finalScore;
      st.winner = a === b ? null : z.finalists[a > b ? 0 : 1];
    } else st.winner = al.length === 1 ? al[0] : null;
  }
  return st;
}

function quizHostInfo(room) {
  const z = room.qz;
  return {
    current: room.phase === 'round' ? z.current : null,
    stats: z.players.map((n) => {
      const s = z.stats.get(n) || { right: 0, wrong: [], asked: 0 };
      return { name: n, right: s.right, wrong: s.wrong, asked: s.asked, avail: isAlive(z, n) && available(z, n), alive: isAlive(z, n) };
    }),
  };
}

function quizPrivate(room, pid) {
  const z = room.qz;
  const name = room.claims.has(pid) ? room.claims.get(pid) : null;
  const fi = name == null ? -1 : z.finalists.indexOf(name);
  const mine = fi >= 0 ? z.finalAns[fi] : null;
  return {
    inGame: name != null && z.players.includes(name),
    alive: name != null && isAlive(z, name),
    lives: name != null ? z.livesMap.get(name) ?? null : null,
    isTurn: room.phase === 'round' && z.current?.to === name && name != null,
    finalist: fi,
    finalNext: room.phase === 'final' && mine && mine.length < 10 ? { idx: mine.length, q: z.finalQs[mine.length].q } : null,
    finalDone: mine ? mine.length : 0,
  };
}

// ---------- Host-Aktionen ----------
function quizNext(room, ack) {
  const z = room.qz;
  switch (room.phase) {
    case 'lobby': {
      const claimed = [...room.claims.values()];
      if (claimed.length < 2) return ack?.({ error: 'Mindestens 2 Spieler müssen ihren Namen wählen.' });
      if (!z.pool.length) return ack?.({ error: 'Keine Fragen ausgewählt.' });
      z.players = z.order.filter((n) => claimed.includes(n));
      z.livesMap = new Map(z.players.map((n) => [n, z.lives]));
      if (z.players.length === 2) startFinal(room);
      else startRound(room);
      break;
    }
    case 'round':
      return quizToVote(room, ack);
    case 'loss':
      afterLoss(room);
      break;
    case 'final':
      room.phase = 'review';
      z.reviewIdx = 0;
      break;
    case 'review':
      if (z.reviewIdx < 9) z.reviewIdx++;
      else room.phase = 'end';
      break;
    default:
      return ack?.({ error: 'Gerade nicht möglich.' });
  }
  ack?.({ ok: true });
  return true;
}

function quizToVote(room, ack, openVote) {
  const z = room.qz;
  stopTimer(z);
  z.current = null;
  z.roundDone = true;
  const cands = aliveList(z).filter((n) => available(z, n));
  if (!cands.length) {
    ack?.({ error: 'Niemand steht zur Wahl – alle hatten alles richtig. Gib jemanden frei.' });
    return 'blocked';
  }
  z.candidates = cands;
  if (cands.length === 1) applyLoss(room, cands[0], false);
  else { room._openVote(); room.phase = 'vote'; }
  ack?.({ ok: true });
  return true;
}

function quizReveal(room, tally) {
  const z = room.qz;
  if (room.phase !== 'vote') return false;
  const counts = tally(room, room.voteKey);
  const max = Math.max(...z.candidates.map((n) => counts[n]));
  const top = z.candidates.filter((n) => counts[n] === max);
  if (top.length > 1) { z.tie = top; room.phase = 'tie'; }
  else applyLoss(room, top[0], true);
  return true;
}

// Socket-Handler, die nur dieser Modus braucht
function registerQuiz(socket, { hostRoom, playerRoom, broadcast }) {
  const host = (ev, fn) => socket.on(ev, (payload, ack) => {
    const room = hostRoom(payload);
    if (!room || room.mode !== 'quiz') return ack?.({ error: 'Nicht möglich.' });
    const res = fn(room, payload, ack);
    if (res !== false) broadcast(room);
  });

  // Antwort richtig/falsch
  host('host:mark', (room, p, ack) => {
    const z = room.qz;
    if (room.phase !== 'round' || !z.current) return false;
    const s = z.stats.get(z.current.to);
    if (s) {
      s.asked++;
      if (p?.correct) s.right++;
      else s.wrong.push({ q: z.current.q, a: z.current.a });
    }
    if (z.roundType === 'time' && z.timeUp) { z.current = null; z.roundDone = true; }
    else assignNext(z);
    ack?.({ ok: true });
  });
  // Andere Frage für denselben Spieler
  host('host:skipq', (room, p, ack) => {
    const z = room.qz;
    if (room.phase !== 'round' || !z.current) return false;
    z.current = { ...drawQ(z), to: z.current.to };
    ack?.({ ok: true });
  });
  // Timer starten / pausieren / Zeit ändern
  host('host:timer', (room, p, ack) => {
    const z = room.qz;
    if (room.phase !== 'round' || z.roundType !== 'time') return false;
    if (p?.action === 'start' && !z.timer.running && !z.timeUp) {
      z.timer.endsAt = Date.now() + z.timer.remaining * 1000;
      z.timer.running = true;
      z.timeout = setTimeout(() => {
        z.timer.running = false;
        z.timer.remaining = 0;
        z.timeUp = true;
        z.timeout = null;
        broadcast(room);
      }, z.timer.remaining * 1000);
    } else if (p?.action === 'pause') {
      stopTimer(z);
    } else if (p?.action === 'add') {
      const add = Number(p?.seconds) || 30;
      if (z.timer.running) {
        z.timer.endsAt += add * 1000;
        clearTimeout(z.timeout);
        z.timeout = setTimeout(() => { z.timer.running = false; z.timer.remaining = 0; z.timeUp = true; z.timeout = null; broadcast(room); }, z.timer.endsAt - Date.now());
      } else {
        z.timer.remaining = Math.max(0, z.timer.remaining + add);
        if (z.timer.remaining > 0) z.timeUp = false;
      }
    }
    ack?.({ ok: true });
  });
  // Runde manuell beenden
  host('host:quizEndRound', (room, p, ack) => {
    const z = room.qz;
    if (room.phase !== 'round') return false;
    stopTimer(z);
    z.current = null;
    z.roundDone = true;
    ack?.({ ok: true });
  });
  // Spieler für das Voting freigeben / sperren
  host('host:avail', (room, p, ack) => {
    const z = room.qz;
    const name = Number(p?.name);
    if (!z.players.includes(name)) return false;
    z.avail.set(name, !!p?.on);
    ack?.({ ok: true });
  });
  // Reihenfolge (im Uhrzeigersinn)
  host('host:order', (room, p, ack) => {
    const z = room.qz;
    const order = Array.isArray(p?.order) ? p.order.map(Number) : [];
    const ok = order.length === room.options.length && new Set(order).size === order.length && order.every((n) => n >= 0 && n < room.options.length);
    if (!ok) return false;
    z.order = order;
    if (z.players.length) z.players = order.filter((n) => z.players.includes(n));
    ack?.({ ok: true });
  });
  // Gleichstand: Moderator entscheidet
  host('host:pickLoser', (room, p, ack) => {
    const z = room.qz;
    const name = Number(p?.name);
    if (room.phase !== 'tie' || !z.tie.includes(name)) return false;
    applyLoss(room, name, true);
    ack?.({ ok: true });
  });
  // Finale: Punkt vergeben (0, 1, 'both', 'none')
  host('host:award', (room, p, ack) => {
    const z = room.qz;
    if (room.phase !== 'review') return false;
    const who = [0, 1, 'both', 'none'].includes(p?.who) ? p.who : null;
    z.points[z.reviewIdx] = who;
    ack?.({ ok: true });
  });
  host('host:reviewGo', (room, p, ack) => {
    const z = room.qz;
    if (room.phase !== 'review') return false;
    z.reviewIdx = Math.min(9, Math.max(0, Number(p?.idx) || 0));
    ack?.({ ok: true });
  });

  // Finale: Antwort eines Finalisten
  socket.on('player:finalAnswer', (payload, ack) => {
    const room = playerRoom();
    if (!room || room.mode !== 'quiz' || room.phase !== 'final') return ack?.({ error: 'Gerade nicht möglich.' });
    const z = room.qz;
    const name = room.claims.get(socket.data.pid);
    const fi = z.finalists.indexOf(name);
    if (fi < 0) return ack?.({ error: 'Du bist nicht im Finale.' });
    const arr = z.finalAns[fi];
    if (Number(payload?.idx) !== arr.length || arr.length >= 10) return ack?.({ ok: true });
    arr.push(String(payload?.text ?? '').trim().slice(0, 200) || '–');
    ack?.({ ok: true });
    broadcast(room);
  });
}

module.exports = { initQuiz, quizState, quizHostInfo, quizPrivate, quizNext, quizToVote, quizReveal, registerQuiz, isAlive, aliveList };
