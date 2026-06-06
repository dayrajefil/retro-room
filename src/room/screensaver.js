const IDLE_MS = 300_000; // 5 min sem interação

let timer = null;
let frame = null;
let active = false;

let posX = 0, posY = 0;
let velX = 1.5, velY = 1.5;

const el  = () => document.getElementById('screensaver');
const logo = () => document.getElementById('ssLogo');

function animate() {
  if (!active) return;

  const ss = el();
  const lg = logo();
  if (!ss || !lg) return;

  const maxX = window.innerWidth  - lg.offsetWidth;
  const maxY = window.innerHeight - lg.offsetHeight;

  posX += velX;
  posY += velY;

  if (posX <= 0 || posX >= maxX) velX *= -1;
  if (posY <= 0 || posY >= maxY) velY *= -1;

  posX = Math.max(0, Math.min(posX, maxX));
  posY = Math.max(0, Math.min(posY, maxY));

  lg.style.left = `${posX}px`;
  lg.style.top  = `${posY}px`;

  frame = requestAnimationFrame(animate);
}

export function startCountdown() {
  clearTimeout(timer);
  if (active) wakeUp();

  timer = setTimeout(() => {
    active = true;
    posX = Math.random() * (window.innerWidth  - 200);
    posY = Math.random() * (window.innerHeight - 120);
    el()?.removeAttribute('hidden');
    animate();
  }, IDLE_MS);
}

export function wakeUp() {
  active = false;
  cancelAnimationFrame(frame);
  clearTimeout(timer);
  el()?.setAttribute('hidden', '');
}

export function resetOnActivity(restart = true) {
  wakeUp();
  if (restart) startCountdown();
}
