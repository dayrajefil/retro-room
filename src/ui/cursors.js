function makeCursor(svg, x, y) {
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") ${x} ${y}, auto`;
}

const arrowSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="20">
  <path d="M0,0 L0,17 L3,14 L5,20 L8,19 L6,12 L10,12 Z"
    fill="#e8c547" stroke="#0a0a0f" stroke-width="1.5"
    stroke-linejoin="round" paint-order="stroke fill"/>
</svg>`;

const crosshairSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21">
  <line x1="10" y1="0"  x2="10" y2="8"  stroke="#0a0a0f" stroke-width="3"/>
  <line x1="10" y1="13" x2="10" y2="21" stroke="#0a0a0f" stroke-width="3"/>
  <line x1="0"  y1="10" x2="8"  y2="10" stroke="#0a0a0f" stroke-width="3"/>
  <line x1="13" y1="10" x2="21" y2="10" stroke="#0a0a0f" stroke-width="3"/>
  <line x1="10" y1="0"  x2="10" y2="8"  stroke="#e8c547" stroke-width="1.5"/>
  <line x1="10" y1="13" x2="10" y2="21" stroke="#e8c547" stroke-width="1.5"/>
  <line x1="0"  y1="10" x2="8"  y2="10" stroke="#e8c547" stroke-width="1.5"/>
  <line x1="13" y1="10" x2="21" y2="10" stroke="#e8c547" stroke-width="1.5"/>
  <rect x="9" y="9" width="3" height="3" fill="#e8c547"/>
</svg>`;

export const CURSOR_DEFAULT = makeCursor(arrowSVG, 0, 0);
export const CURSOR_POINTER = makeCursor(crosshairSVG, 10, 10);

export function initCursors() {
  document.documentElement.style.cursor = CURSOR_DEFAULT;
  document.querySelectorAll('button, .btn').forEach(el => {
    el.style.cursor = CURSOR_POINTER;
  });
}
