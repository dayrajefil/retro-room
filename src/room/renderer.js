import { ROOM_W, ROOM_H, ROOM_OBJECTS } from './objects.js';

// Paleta interna
const P = {
  wall:        '#1a1025',
  wallStripe:  '#1c1228',
  floor:       '#261a0a',
  floorPlank:  '#2e2010',
  wood:        '#3d2910',
  woodLight:   '#4a3218',
  woodDark:    '#2a1808',
  gold:        '#e8c547',
  green:       '#00ff41',
  border:      '#6b2737',
  secret:      '#0d0a0d',
};

// Cores de livros por posição (ciclo)
const BOOK_COLORS = [
  '#5c1a1b', '#3b5249', '#e8c547', '#2d1b2e',
  '#4a3218', '#1a3a2a', '#5a1a2a', '#3b2860',
  '#1a535c', '#3b4c64', '#5c3a1b', '#2e4e42',
];

// ─── UTILITÁRIOS ─────────────────────────────────────

function px(ctx, x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

// ─── FUNDO / PAREDES / CHÃO ───────────────────────────

function drawBackground(ctx) {
  // Parede
  px(ctx, 0, 0, ROOM_W, 410, P.wall);

  // Listras sutis no papel de parede
  for (let x = 0; x < ROOM_W; x += 24) {
    px(ctx, x, 0, 1, 410, P.wallStripe);
  }

  // Rodapé
  px(ctx, 0, 405, ROOM_W, 8, P.woodDark);

  // Chão
  px(ctx, 0, 413, ROOM_W, ROOM_H - 413, P.floor);

  // Tábuas do chão
  for (let y = 413; y < ROOM_H; y += 20) {
    px(ctx, 0, y, ROOM_W, 1, P.floorPlank);
  }
  for (let x = 0; x < ROOM_W; x += 90) {
    px(ctx, x, 413, 1, ROOM_H - 413, P.floorPlank);
  }
}

// ─── JANELA ──────────────────────────────────────────

function drawWindow(ctx, time) {
  const wx = 195, wy = 22, ww = 210, wh = 248;
  const frameThick = 10;

  // Moldura
  px(ctx, wx, wy, ww, wh, P.wood);

  // Travessas
  px(ctx, wx + ww / 2 - 3, wy, 6, wh, P.wood);         // vertical
  px(ctx, wx, wy + wh / 2 - 3, ww, 6, P.wood);         // horizontal

  // Vidros (4 panos)
  const panes = [
    [wx + frameThick, wy + frameThick],
    [wx + ww / 2 + 3, wy + frameThick],
    [wx + frameThick, wy + wh / 2 + 3],
    [wx + ww / 2 + 3, wy + wh / 2 + 3],
  ];
  const pw = ww / 2 - frameThick - 3;
  const ph = wh / 2 - frameThick - 3;

  panes.forEach(([px_, py_]) => {
    // Céu noturno
    ctx.fillStyle = '#060a18';
    ctx.fillRect(px_, py_, pw, ph);

    // Estrelas (estáticas por pane)
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    const seed = px_ + py_;
    for (let s = 0; s < 4; s++) {
      const sx = px_ + ((seed * (s + 1) * 37) % pw);
      const sy = py_ + ((seed * (s + 1) * 13) % (ph * 0.6));
      ctx.fillRect(sx, sy, 1, 1);
    }

    // Chuva (animada)
    ctx.fillStyle = 'rgba(160,180,220,0.4)';
    for (let r = 0; r < 6; r++) {
      const rx = px_ + ((time * 2 + r * 19 + px_) % pw);
      const ry = py_ + ((time * 3 + r * 31) % ph);
      ctx.fillRect(rx, ry, 1, 6);
    }
  });

  // Reflexo/luz na parede abaixo da janela
  const grd = ctx.createRadialGradient(wx + ww / 2, wy + wh, 10, wx + ww / 2, wy + wh, 100);
  grd.addColorStop(0, 'rgba(100,120,200,0.06)');
  grd.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grd;
  ctx.fillRect(wx - 20, wy + wh - 30, ww + 40, 120);
}

// ─── ESTANTE ─────────────────────────────────────────

function drawBookshelf(ctx) {
  const sx = 15, sy = 58, sw = 148, sh = 355;

  // Corpo
  px(ctx, sx, sy, sw, sh, P.wood);
  px(ctx, sx + 7, sy + 7, sw - 14, sh - 14, P.woodDark);

  // Prateleiras
  const shelfYs = [sy + 75, sy + 155, sy + 235, sy + 315];
  shelfYs.forEach(y => {
    px(ctx, sx + 7, y, sw - 14, 8, P.woodLight);
    px(ctx, sx + 7, y + 7, sw - 14, 1, '#1a0a02');  // sombra
  });

  // Livros em cada prateleira
  const segments = [
    { bookY: sy + 14, bookH: 55 },
    { bookY: sy + 92, bookH: 55 },
    { bookY: sy + 172, bookH: 55 },
    { bookY: sy + 252, bookH: 55 },
  ];

  segments.forEach(({ bookY, bookH }, rowIdx) => {
    let bx = sx + 9;
    for (let i = 0; i < 9; i++) {
      const bw = 12 + (i % 3);
      const bh = bookH - (i % 4) * 4;
      const col = BOOK_COLORS[(rowIdx * 9 + i) % BOOK_COLORS.length];
      px(ctx, bx, bookY + (bookH - bh), bw, bh, col);
      px(ctx, bx, bookY + (bookH - bh), bw, 2, 'rgba(0,0,0,0.3)');
      bx += bw + 1;
      if (bx > sx + sw - 20) break;
    }
  });

  // Livro preto secreto (canto inferior direito da última prateleira)
  px(ctx, 130, 312, 24, 44, P.secret);
  px(ctx, 133, 316, 16, 36, '#1a0510');
  // Sinal sutil (linha vermelha fina)
  px(ctx, 141, 320, 2, 26, '#3b0a15');
}

// ─── PÔSTERES ────────────────────────────────────────

function drawPosters(ctx) {
  const posters = [
    { x: 450, y: 32, w: 72, h: 108, bg: '#1a0a2a', accent: '#e8c547' },
    { x: 535, y: 32, w: 72, h: 108, bg: '#0a1a1a', accent: '#6b2737' },
    { x: 620, y: 32, w: 72, h: 108, bg: '#1a1010', accent: '#3b5249' },
  ];

  posters.forEach(({ x, y, w, h, bg, accent }) => {
    // Moldura
    px(ctx, x - 3, y - 3, w + 6, h + 6, '#1a1a1a');
    px(ctx, x, y, w, h, bg);
    // Detalhes decorativos
    px(ctx, x + 8, y + 10, w - 16, 2, accent);
    px(ctx, x + 16, y + 20, w - 32, h - 40, `${accent}22`);
    px(ctx, x + 8, y + h - 20, w - 16, 2, accent);
    // Título simulado (linhas)
    px(ctx, x + 12, y + h - 30, w - 24, 3, `${accent}99`);
    px(ctx, x + 20, y + h - 24, w - 40, 2, `${accent}55`);
  });
}

// ─── RÁDIO ───────────────────────────────────────────

function drawRadio(ctx) {
  const rx = 710, ry = 60, rw = 112, rh = 80;

  // Corpo
  px(ctx, rx, ry, rw, rh, '#555');
  px(ctx, rx + 3, ry + 3, rw - 6, rh - 6, '#444');

  // Grade de speaker
  px(ctx, rx + 8, ry + 12, 42, 52, '#333');
  for (let gy = 0; gy < 5; gy++) {
    px(ctx, rx + 10, ry + 17 + gy * 9, 38, 2, '#222');
  }

  // Dial
  px(ctx, rx + 58, ry + 15, 44, 28, '#333');
  px(ctx, rx + 62, ry + 18, 36, 22, '#222');
  px(ctx, rx + 64, ry + 26, 24, 2, '#e8c547');
  px(ctx, rx + 80, ry + 22, 3, 10, '#888');

  // LED verde
  px(ctx, rx + 100, ry + 48, 8, 8, '#00ff41');

  // CDs empilhados
  for (let c = 3; c >= 0; c--) {
    px(ctx, rx + 20 + c * 3, ry + 85, 70, 3, `hsl(${c * 30}, 30%, ${30 + c * 5}%)`);
  }
}

// ─── MESA ────────────────────────────────────────────

function drawDesk(ctx) {
  const dx = 530, dy = 325, dw = 330, dh = 95;

  // Tampo
  px(ctx, dx, dy, dw, 12, P.woodLight);
  px(ctx, dx, dy + 12, dw, dh - 24, P.wood);
  px(ctx, dx, dy + dh - 12, dw, 12, P.woodDark);

  // Pernas
  px(ctx, dx + 10, dy + dh, 14, 80, P.woodDark);
  px(ctx, dx + dw - 24, dy + dh, 14, 80, P.woodDark);

  // Gavetas
  px(ctx, dx + 8, dy + 30, 60, 50, P.woodDark);
  px(ctx, dx + 14, dy + 35, 48, 18, '#302010');
  px(ctx, dx + 14, dy + 56, 48, 18, '#302010');
  px(ctx, dx + 36, dy + 43, 6, 6, P.woodLight);
  px(ctx, dx + 36, dy + 64, 6, 6, P.woodLight);
}

// ─── MONITOR CRT ─────────────────────────────────────

function drawComputer(ctx, time) {
  const mx = 600, my = 215, mw = 130, mh = 95;

  // Caixa
  px(ctx, mx, my, mw, mh, '#888');
  px(ctx, mx + 4, my + 4, mw - 8, mh - 8, '#555');

  // Tela
  px(ctx, mx + 8, my + 8, mw - 16, mh - 30, '#0a0f0a');

  // Conteúdo da tela (texto verde piscando)
  const blink = Math.floor(time / 30) % 2 === 0;
  if (blink) {
    ctx.fillStyle = '#00ff41';
    ctx.font = '7px monospace';
    ctx.fillText('> RETRO ROOM', mx + 12, my + 22);
    ctx.fillText('_', mx + 12, my + 34);
  } else {
    ctx.fillStyle = '#00ff41';
    ctx.font = '7px monospace';
    ctx.fillText('> RETRO ROOM', mx + 12, my + 22);
    ctx.fillText('> RUN GAME', mx + 12, my + 34);
  }

  // LED + botão
  px(ctx, mx + mw - 20, my + mh - 16, 8, 8, '#00ff41');
  px(ctx, mx + 12, my + mh - 14, 50, 4, '#666');

  // Base do monitor
  px(ctx, mx + mw / 2 - 20, my + mh, 40, 8, '#777');
  px(ctx, mx + mw / 2 - 30, my + mh + 8, 60, 5, '#666');
}

// ─── PAPÉIS ──────────────────────────────────────────

function drawPapers(ctx) {
  // Folhas sobrepostas
  const sheets = [
    { x: 550, y: 332, r: -4 },
    { x: 555, y: 330, r: 2 },
    { x: 553, y: 328, r: -1 },
  ];
  sheets.forEach(({ x, y }, i) => {
    ctx.save();
    ctx.translate(x + 50, y + 30);
    ctx.rotate(((i - 1) * 3) * Math.PI / 180);
    ctx.translate(-(x + 50), -(y + 30));
    ctx.fillStyle = `hsl(42, 40%, ${88 - i * 4}%)`;
    ctx.fillRect(x, y, 100, 65);
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    ctx.fillRect(x + 10, y + 12, 60, 2);
    ctx.fillRect(x + 10, y + 18, 50, 2);
    ctx.fillRect(x + 10, y + 24, 55, 2);
    ctx.restore();
  });
}

// ─── LUMINÁRIA ───────────────────────────────────────

function drawLamp(ctx, time) {
  // Haste
  px(ctx, 48, 380, 4, 70, '#555');

  // Cúpula
  ctx.fillStyle = '#4a3218';
  ctx.beginPath();
  ctx.ellipse(50, 382, 28, 12, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#6a5228';
  ctx.beginPath();
  ctx.ellipse(50, 382, 22, 8, 0, Math.PI, Math.PI * 2);
  ctx.fill();

  // Luz (gradiente pulsante suave)
  const pulse = 0.05 + Math.sin(time * 0.04) * 0.01;
  const grd = ctx.createRadialGradient(50, 395, 5, 50, 395, 150);
  grd.addColorStop(0, `rgba(232,197,71,${pulse + 0.06})`);
  grd.addColorStop(1, 'rgba(232,197,71,0)');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 350, 250, 230);
}

// ─── TAPETE ──────────────────────────────────────────

function drawRug(ctx) {
  // Sombra
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.fillRect(315, 445, 285, 98);

  // Tapete
  px(ctx, 320, 440, 275, 90, '#3b1a2a');
  px(ctx, 330, 450, 255, 70, '#4a2238');

  // Bordado (padrão simples)
  ctx.fillStyle = '#6b2737';
  ctx.fillRect(338, 458, 239, 2);
  ctx.fillRect(338, 500, 239, 2);
  ctx.fillRect(338, 458, 2, 44);
  ctx.fillRect(575, 458, 2, 44);

  // Motivo central
  ctx.fillStyle = '#e8c54730';
  ctx.fillRect(430, 467, 55, 26);
}

// ─── LABELS (tooltip ao hover) ───────────────────────

function drawLabels(ctx, hoveredId) {
  ROOM_OBJECTS.forEach(obj => {
    if (obj.id !== hoveredId) return;
    const { x, y, w, h } = obj.hitBox;
    const cx = x + w / 2;
    const by = y + h + 2;

    ctx.fillStyle = 'rgba(0,0,0,0.75)';
    ctx.fillRect(cx - 38, by, 76, 14);
    ctx.fillStyle = '#e8c547';
    ctx.font = 'bold 8px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(obj.label, cx, by + 10);
    ctx.textAlign = 'left';
  });
}

// ─── DESTAQUE do objeto ao hover ─────────────────────

function drawHoverHighlight(ctx, hoveredId) {
  if (!hoveredId) return;
  const obj = ROOM_OBJECTS.find(o => o.id === hoveredId);
  if (!obj) return;
  const { x, y, w, h } = obj.hitBox;
  ctx.strokeStyle = 'rgba(232,197,71,0.45)';
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, w, h);
}

// ─── DESENHO COMPLETO ─────────────────────────────────

export function drawRoom(ctx, hoveredId, time) {
  ctx.clearRect(0, 0, ROOM_W, ROOM_H);
  drawBackground(ctx);
  drawLamp(ctx, time);
  drawWindow(ctx, time);
  drawBookshelf(ctx);
  drawPosters(ctx);
  drawRadio(ctx);
  drawDesk(ctx);
  drawComputer(ctx, time);
  drawPapers(ctx);
  drawRug(ctx);
}

// ─── SETUP DO CANVAS ─────────────────────────────────

export function setupCanvas(canvas) {
  const scale = Math.min(
    window.innerWidth / ROOM_W,
    window.innerHeight / ROOM_H,
  );

  canvas.width  = ROOM_W;
  canvas.height = ROOM_H;
  canvas.style.width  = `${ROOM_W * scale}px`;
  canvas.style.height = `${ROOM_H * scale}px`;

  return scale;
}
