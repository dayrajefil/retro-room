import { drawRoom, setupCanvas } from './renderer.js';
import { ROOM_OBJECTS, ROOM_W, ROOM_H } from './objects.js';
import { startCountdown, resetOnActivity } from './screensaver.js';
import { showZoom } from '../overlays/index.js';
import { CURSOR_DEFAULT, CURSOR_POINTER } from '../ui/cursors.js';

let animFrame = null;
let time      = 0;
let scale     = 1;
let hoveredId = null;

const canvas = () => document.getElementById('roomCanvas');

// Converte coordenadas do mouse → canvas interno
function toCanvas(clientX, clientY) {
  const rect = canvas().getBoundingClientRect();
  return {
    x: (clientX - rect.left) * (ROOM_W / rect.width),
    y: (clientY - rect.top)  * (ROOM_H / rect.height),
  };
}

function hitTest(cx, cy) {
  for (const obj of ROOM_OBJECTS) {
    const { x, y, w, h } = obj.hitBox;
    if (cx >= x && cx <= x + w && cy >= y && cy <= y + h) return obj;
  }
  return null;
}

// ─── HANDLERS ────────────────────────────────────────

function onMouseMove(e) {
  resetOnActivity();
  const { x, y } = toCanvas(e.clientX, e.clientY);
  const obj = hitTest(x, y);
  const newHovered = obj?.id ?? null;
  if (newHovered !== hoveredId) {
    hoveredId = newHovered;
    canvas().style.cursor = newHovered ? CURSOR_POINTER : CURSOR_DEFAULT;
  }
}

function onClick(e) {
  // Ignora cliques quando o zoom view está aberto
  if (!document.getElementById('zoomView').hidden) return;

  resetOnActivity();
  const { x, y } = toCanvas(e.clientX, e.clientY);
  const obj = hitTest(x, y);
  if (obj) showZoom(obj.overlay, obj.label);
}

// ─── LOOP ────────────────────────────────────────────

function loop() {
  animFrame = requestAnimationFrame(loop);
  time++;

  const ctx = canvas().getContext('2d');
  drawRoom(ctx, hoveredId, time);
}

// ─── INIT / CLEANUP ──────────────────────────────────

function playZoomIn() {
  const viewport = document.getElementById('roomViewport');
  const c = canvas();
  const rect = c.getBoundingClientRect();

  const k  = rect.width / ROOM_W;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Centro do monitor CRT desenhado no canvas (mx=600 mw=130 my=215 mh=95)
  const monCx = rect.left + 665 * k;
  const monCy = rect.top  + 262 * k;
  const txPct = (-(monCx - vw / 2) / vw * 100).toFixed(2);
  const tyPct = (-(monCy - vh / 2) / vh * 100).toFixed(2);

  const DURATION = 1800;

  c.style.pointerEvents     = 'none';
  viewport.style.transition = 'none';
  viewport.style.transform  = `scale(5) translate(${txPct}%, ${tyPct}%)`;
  viewport.getBoundingClientRect();

  requestAnimationFrame(() => {
    viewport.style.transition = `transform ${DURATION}ms cubic-bezier(0.16, 1, 0.3, 1)`;
    viewport.style.transform  = 'scale(1) translate(0%, 0%)';
    setTimeout(() => {
      c.style.pointerEvents     = '';
      viewport.style.transition = '';
    }, DURATION);
  });
}

export function initRoom(freshLogin = false) {
  const c = canvas();
  scale = setupCanvas(c);

  if (freshLogin) playZoomIn();

  c.addEventListener('mousemove', onMouseMove);
  c.addEventListener('click', onClick);

  // Screensaver
  document.getElementById('screensaver').addEventListener('click', () => resetOnActivity());
  document.addEventListener('keydown', () => resetOnActivity());
  startCountdown();

  loop();
}

export function destroyRoom() {
  cancelAnimationFrame(animFrame);
  const c = canvas();
  if (c) {
    c.removeEventListener('mousemove', onMouseMove);
    c.removeEventListener('click', onClick);
  }
  const viewport = document.getElementById('roomViewport');
  if (viewport) viewport.style.transform = '';
}
