// Objetos clicáveis do quarto.
// hitBox é em coordenadas do canvas interno (900 x 580).

export const ROOM_W = 900;
export const ROOM_H = 580;

export const ROOM_OBJECTS = [
  {
    id: 'bookshelf',
    label: 'ESTANTE',
    overlay: 'bookshelf',
    hitBox: { x: 15, y: 58, w: 148, h: 355 },
  },
  {
    id: 'secret-book',
    label: '???',
    overlay: 'private',
    hitBox: { x: 130, y: 295, w: 32, h: 50 },
  },
  {
    id: 'posters',
    label: 'PÔSTERES',
    overlay: 'films',
    hitBox: { x: 445, y: 28, w: 270, h: 125 },
  },
  {
    id: 'radio',
    label: 'RÁDIO / CDs',
    overlay: 'music',
    hitBox: { x: 705, y: 55, w: 120, h: 115 },
  },
  {
    id: 'computer',
    label: 'COMPUTADOR',
    overlay: 'games',
    hitBox: { x: 590, y: 210, w: 140, h: 115 },
  },
  {
    id: 'papers',
    label: 'DESENHOS',
    overlay: 'drawings',
    hitBox: { x: 540, y: 325, w: 130, h: 70 },
  },
];

