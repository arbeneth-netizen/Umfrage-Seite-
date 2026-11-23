// Gemeinsame Helfer für Host- und Spieler-Seite

// Gut unterscheidbare Farben auf weißem Hintergrund – jede Antwort bekommt eine eigene
const COLORS = [
  '#E63946', '#1D7FE0', '#2A9D5C', '#F4A100', '#8E44AD',
  '#00A6A6', '#F26B1D', '#D6338A', '#4B5BD6', '#7CB518',
  '#8D5524', '#0F4C81', '#C0392B', '#16A085', '#B8860B',
  '#6C3483', '#FF5E78', '#2E86AB', '#5D6D7E', '#A3CB38',
  '#E17055', '#0984E3', '#6AB04C', '#BE2EDD', '#F9CA24',
  '#30336B', '#22A6B3', '#EB4D4B', '#95AFC0', '#535C68',
];
const colorFor = (i) => COLORS[i % COLORS.length];

const MODES = {
  host: { name: 'Klassisch', emoji: '🎤' },
  open: { name: 'Fragen-Mix', emoji: '✍️' },
  said: { name: 'Wer hat’s gesagt?', emoji: '🕵️' },
  impostor: { name: 'Impostor', emoji: '🎭' },
};

// Logo: kleines Kreisdiagramm
const LOGO_SVG = `<svg class="logo-mark" viewBox="0 0 512 512" aria-hidden="true">
  <rect width="512" height="512" rx="120" fill="#111114"/>
  <g fill="none" stroke-width="62" transform="rotate(-90 256 256)">
    <circle cx="256" cy="256" r="148" stroke="#E63946" stroke-dasharray="398 532"/>
    <circle cx="256" cy="256" r="148" stroke="#1D7FE0" stroke-dasharray="258 672" stroke-dashoffset="-420"/>
    <circle cx="256" cy="256" r="148" stroke="#F4A100" stroke-dasharray="208 722" stroke-dashoffset="-700"/>
  </g>
  <path d="M188 198 H228 L256 272 L284 198 H324 L276 318 H236 Z" fill="#fff"/>
</svg>`;

// Schlichte Linien-Icons
const ICON = (d) => `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICONS = {
  menu: ICON('<path d="M4 7h16M4 12h16M4 17h16"/>'),
  close: ICON('<path d="M6 6l12 12M18 6L6 18"/>'),
  home: ICON('<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>'),
  host: ICON('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),
  open: ICON('<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>'),
  said: ICON('<path d="M7 7h4v6H5V9a2 2 0 0 1 2-2zM17 7h4v6h-6V9a2 2 0 0 1 2-2z" transform="translate(-1 0)"/><path d="M6 13c0 2-1 4-3 4M16 13c0 2-1 4-3 4"/>'),
  archive: ICON('<rect x="3" y="4" width="18" height="4" rx="1"/><path d="M5 8v11h14V8M10 12h4"/>'),
  settings: ICON('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'),
  help: ICON('<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 4.9.8c0 1.7-2.4 2.2-2.4 3.7M12 17h.01"/>'),
  install: ICON('<path d="M12 3v12M7 10l5 5 5-5"/><path d="M5 21h14"/>'),
  play: ICON('<path d="M7 4l12 8-12 8z"/>'),
  user: ICON('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),
  impostor: ICON('<path d="M12 3c-4 0-7 3-7 7v9l2.5-2 2 2 2.5-2 2.5 2 2-2 2.5 2v-9c0-4-3-7-7-7z"/><path d="M9 10h.01M15 10h.01"/>'),
  cards: ICON('<rect x="3" y="6" width="13" height="15" rx="2"/><path d="M8 3h11a2 2 0 0 1 2 2v13"/>'),
  back: ICON('<path d="M15 18l-6-6 6-6"/>'),
  eye: ICON('<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
  eyeOff: ICON('<path d="M3 3l18 18M10.6 5.1A10 10 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4.2M6.6 6.6C3.7 8.4 2 12 2 12s3.5 7 10 7a9.7 9.7 0 0 0 5.4-1.6"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>'),
  leave: ICON('<path d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10"/>'),
};

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

function toast(msg) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2200);
}

// Kreisdiagramm als SVG
function pieSVG(counts, size = 260) {
  const total = counts.reduce((a, b) => a + b, 0);
  const r = size / 2, R = r - 2;
  if (total === 0) {
    return `<svg viewBox="0 0 ${size} ${size}" class="pie"><circle cx="${r}" cy="${r}" r="${R}" fill="#f1f1f4"/>
      <text x="${r}" y="${r}" text-anchor="middle" dominant-baseline="middle" fill="#888" font-size="16" font-family="Inter, sans-serif">Keine Stimmen</text></svg>`;
  }
  let angle = -Math.PI / 2;
  const parts = [], labels = [];
  counts.forEach((c, i) => {
    if (!c) return;
    const frac = c / total;
    if (frac === 1) {
      parts.push(`<circle cx="${r}" cy="${r}" r="${R}" fill="${colorFor(i)}"/>`);
      labels.push(`<text x="${r}" y="${r}" text-anchor="middle" dominant-baseline="middle" fill="#fff" font-weight="800" font-size="${size / 9}" font-family="Inter, sans-serif">100%</text>`);
      return;
    }
    const a2 = angle + frac * 2 * Math.PI;
    const x1 = r + R * Math.cos(angle), y1 = r + R * Math.sin(angle);
    const x2 = r + R * Math.cos(a2), y2 = r + R * Math.sin(a2);
    parts.push(`<path d="M${r},${r} L${x1},${y1} A${R},${R} 0 ${frac > 0.5 ? 1 : 0} 1 ${x2},${y2} Z" fill="${colorFor(i)}" stroke="#fff" stroke-width="3" stroke-linejoin="round"/>`);
    if (frac >= 0.07) {
      const mid = angle + frac * Math.PI;
      const tx = r + r * 0.62 * Math.cos(mid), ty = r + r * 0.62 * Math.sin(mid);
      labels.push(`<text x="${tx}" y="${ty}" text-anchor="middle" dominant-baseline="middle" fill="#fff" font-weight="800" font-size="${size / 15}" font-family="Inter, sans-serif">${Math.round(frac * 100)}%</text>`);
    }
    angle = a2;
  });
  return `<svg viewBox="0 0 ${size} ${size}" class="pie" role="img">${parts.join('')}${labels.join('')}</svg>`;
}

// Diagramm + Liste "wer wie oft gewählt wurde"
function resultsHTML(options, counts) {
  const total = counts.reduce((a, b) => a + b, 0);
  const order = options.map((_, i) => i).sort((a, b) => counts[b] - counts[a]);
  const max = Math.max(...counts);
  const rows = order
    .map((i, n) => {
      const c = counts[i];
      const pct = total ? Math.round((c / total) * 100) : 0;
      const winner = c > 0 && c === max ? ' winner' : '';
      return `<li class="res-row${winner}${c ? '' : ' zero'}">
        <span class="bar" style="width:${pct}%;background:${colorFor(i)};animation-delay:${n * 60}ms"></span>
        <span class="dot" style="background:${colorFor(i)}"></span>
        <span class="res-name">${esc(options[i])}${winner ? ' 👑' : ''}</span>
        <span class="res-count">${c} ${c === 1 ? 'Stimme' : 'Stimmen'}</span>
        <span class="res-pct">${pct}%</span>
      </li>`;
    })
    .join('');
  return `<div class="results">
    <div class="pie-wrap">${pieSVG(counts)}</div>
    <ul class="res-list">${rows}<li class="res-total">${total} ${total === 1 ? 'Stimme' : 'Stimmen'} insgesamt</li></ul>
  </div>`;
}

// Auflösung bei "Wer hat's gesagt?"
function revealHTML(options, author, counts) {
  const total = counts.reduce((a, b) => a + b, 0);
  const right = counts[author] || 0;
  const verdict = !total ? 'Niemand hat abgestimmt.'
    : right === total ? 'Alle lagen richtig! 🎯'
    : right === 0 ? 'Keiner hat’s erraten – Pokerface! 😎'
    : `${right} von ${total} lagen richtig.`;
  return `<div class="reveal" style="background:${colorFor(author)}">
    <div class="small">Gesagt hat es …</div>
    <div class="name">${esc(options[author])}</div>
    <div class="verdict">${verdict}</div>
  </div>`;
}

function quoteHTML(prompt, quote) {
  return `<div class="prompt-small">${esc(prompt)}</div><blockquote class="quote">${esc(quote)}</blockquote>`;
}

// ---------- Impostor ----------
function kickedHTML(options, k) {
  if (!k) return '';
  if (k.tie) return `<div class="verdict neutral"><div class="small">Abstimmung</div><div class="name">Unentschieden</div><div class="sub2">Niemand fliegt raus.</div></div>`;
  const who = esc(options[k.name]);
  if (k.guessed && k.correct) return `<div class="verdict bad"><div class="small">Wort erraten</div><div class="name">${who}</div><div class="sub2">war Impostor und kannte das Wort.</div></div>`;
  const title = k.guessed ? 'Falsches Wort – raus' : 'Rausgeworfen';
  return `<div class="verdict ${k.wasImpostor ? 'good' : 'bad'}" style="--c:${colorFor(k.name)}">
    <div class="small">${title}</div><div class="name">${who}</div>
    <div class="sub2">${k.wasImpostor ? 'war ein Impostor ✓' : 'war unschuldig ✗'}</div></div>`;
}
function impResultHTML(options, r) {
  if (!r) return '';
  const imps = r.impostors.map((i) => `<span class="p-chip in" style="background:${colorFor(i)}">${esc(options[i])}</span>`).join('');
  const head = r.winner === 'crew' ? 'Die Crew gewinnt' : r.winner === 'impostor' ? 'Die Impostor gewinnen' : 'Runde aufgelöst';
  return `<div class="result-box ${r.winner || 'none'}">
    <div class="result-head">${head}</div>
    <div class="muted">${esc(r.reason)}</div>
    <div class="result-grid">
      <div><div class="sec-label">Das Wort</div><div class="result-word">${esc(r.word)}</div><div class="muted" style="font-size:14px">${esc(r.deck)}</div></div>
      <div><div class="sec-label">${r.impostors.length === 1 ? 'Impostor' : 'Impostor'}</div><div class="players-row">${imps}</div></div>
    </div>
  </div>`;
}
function scoreboardHTML(options, scores) {
  if (!scores || !scores.length) return '';
  return `<div class="scoreboard"><div class="sec-label">Punktestand</div>${scores
    .map((x, n) => `<div class="score-row"><span class="rank">${n + 1}</span><span class="dot" style="background:${colorFor(x.name)}"></span><b>${esc(options[x.name])}</b><span class="pts">${x.pts}</span></div>`)
    .join('')}</div>`;
}

// Zusammenfassung am Spielende
function summaryHTML(s) {
  if (s.mode === 'impostor') {
    const rounds = (s.summary || [])
      .map((h) => `<div class="summary-item"><div class="q-head">Runde ${h.round}</div>${impResultHTML(s.options, h)}</div>`)
      .join('');
    return scoreboardHTML(s.options, s.scores) + (rounds || '<p class="muted">Es wurde keine Runde gespielt.</p>');
  }
  if (!s.summary || !s.summary.length) return '<p class="muted">Es wurde nichts gespielt.</p>';
  if (s.mode === 'said') {
    return s.summary
      .map((x, i) => `<div class="summary-item"><div class="q-head">Aussage ${i + 1} · Runde ${x.round}</div>
        ${quoteHTML(x.prompt, x.quote)}
        <div class="author-line" style="color:${colorFor(x.author)}">→ ${esc(s.options[x.author])}</div>
        ${resultsHTML(s.options, x.counts)}</div>`)
      .join('');
  }
  return s.summary
    .map((x, i) => `<div class="summary-item"><h3>${i + 1}. ${esc(x.question)}</h3>${resultsHTML(s.options, x.counts)}</div>`)
    .join('');
}

// App installierbar machen
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
}
