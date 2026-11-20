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

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

// Kreisdiagramm als SVG
function pieSVG(counts, size = 260) {
  const total = counts.reduce((a, b) => a + b, 0);
  const r = size / 2;
  if (total === 0) {
    return `<svg viewBox="0 0 ${size} ${size}" class="pie"><circle cx="${r}" cy="${r}" r="${r - 2}" fill="#f1f1f4"/>
      <text x="${r}" y="${r}" text-anchor="middle" dominant-baseline="middle" fill="#888" font-size="16">Keine Stimmen</text></svg>`;
  }
  let angle = -Math.PI / 2;
  const parts = [];
  counts.forEach((c, i) => {
    if (!c) return;
    const frac = c / total;
    if (frac === 1) {
      parts.push(`<circle cx="${r}" cy="${r}" r="${r - 2}" fill="${colorFor(i)}"/>`);
      return;
    }
    const a2 = angle + frac * 2 * Math.PI;
    const x1 = r + (r - 2) * Math.cos(angle), y1 = r + (r - 2) * Math.sin(angle);
    const x2 = r + (r - 2) * Math.cos(a2), y2 = r + (r - 2) * Math.sin(a2);
    const large = frac > 0.5 ? 1 : 0;
    parts.push(`<path d="M${r},${r} L${x1},${y1} A${r - 2},${r - 2} 0 ${large} 1 ${x2},${y2} Z" fill="${colorFor(i)}" stroke="#fff" stroke-width="2"/>`);
    // Prozent-Beschriftung in größeren Stücken
    if (frac >= 0.07) {
      const mid = angle + frac * Math.PI;
      const tx = r + r * 0.62 * Math.cos(mid), ty = r + r * 0.62 * Math.sin(mid);
      parts.push(`<text x="${tx}" y="${ty}" text-anchor="middle" dominant-baseline="middle" fill="#fff" font-weight="700" font-size="${size / 16}">${Math.round(frac * 100)}%</text>`);
    }
    angle = a2;
  });
  return `<svg viewBox="0 0 ${size} ${size}" class="pie" role="img">${parts.join('')}</svg>`;
}

// Diagramm + Liste "wer wie oft gewählt wurde"
function resultsHTML(options, counts) {
  const total = counts.reduce((a, b) => a + b, 0);
  const order = options.map((_, i) => i).sort((a, b) => counts[b] - counts[a]);
  const max = Math.max(...counts);
  const rows = order
    .map((i) => {
      const c = counts[i];
      const pct = total ? Math.round((c / total) * 100) : 0;
      const winner = c > 0 && c === max ? ' winner' : '';
      return `<li class="res-row${winner}${c ? '' : ' zero'}">
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
