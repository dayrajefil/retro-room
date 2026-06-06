// Placeholder — adicionar os seus desenhos aqui futuramente
const DRAWINGS = [
  { title: 'Esboço gótico #1',    note: 'Carvão em papel. A primeira que fiz.' },
  { title: 'Criatura da floresta', note: 'Nanquim. Inspirada em Fauno.' },
  { title: 'Retrato melancólico',  note: 'Grafite. Ela olha pela janela.' },
  { title: 'Castelo à meia-noite', note: 'Aquarela. O céu ficou bom.' },
  { title: 'Gato de lua cheia',    note: 'Caneta 0.2. Meu favorito até agora.' },
];

let current = 0;

export function renderDrawings(container) {
  current = 0;

  const wrap = document.createElement('div');
  wrap.className = 'paper-stack';
  wrap.style.cssText = 'align-items: center;';

  const paper = document.createElement('div');
  paper.className = 'paper';
  render(paper);

  const nav = document.createElement('div');
  nav.style.cssText = 'display:flex;gap:12px;margin-top:8px;';

  const prev = btn('◄ anterior');
  const next = btn('próximo ►');

  prev.addEventListener('click', () => {
    if (current > 0) { current--; render(paper); }
  });
  next.addEventListener('click', () => {
    if (current < DRAWINGS.length - 1) { current++; render(paper); }
  });

  nav.append(prev, next);
  wrap.append(paper, nav);
  container.appendChild(wrap);
}

function render(paper) {
  const d = DRAWINGS[current];
  paper.innerHTML = `
    <div class="paper__title">${d.title}</div>
    <p>${d.note}</p>
    <p style="margin-top:12px;font-size:0.75em;opacity:0.5;">${current + 1} / ${DRAWINGS.length}</p>
  `;
}

function btn(label) {
  const b = document.createElement('button');
  b.className = 'btn';
  b.textContent = label;
  b.style.fontSize = '0.8em';
  return b;
}
