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
};

// Logo: kleines Kreisdiagramm
const LOGO_SVG = `<svg class="logo-mark" viewBox="0 0 32 32" aria-hidden="true">
  <rect width="32" height="32" rx="9" fill="#111114"/>
  <path d="M16 16 L16 6 A10 10 0 0 1 25.5 19.1 Z" fill="#E63946"/>
  <path d="M16 16 L25.5 19.1 A10 10 0 0 1 9 23.1 Z" fill="#1D7FE0"/>
  <path d="M16 16 L9 23.1 A10 10 0 0 1 16 6 Z" fill="#F4A100"/>
</svg>`;

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

// Zusammenfassung am Spielende
function summaryHTML(s) {
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
