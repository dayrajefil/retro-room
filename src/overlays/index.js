import { renderBookshelf } from './bookshelf.js';
import { renderMusic }     from './music.js';
import { renderFilms }     from './films.js';
import { renderGames }     from './games.js';
import { renderDrawings }  from './drawings.js';
import { renderPrivate }   from './private.js';

const RENDERERS = {
  bookshelf: renderBookshelf,
  music:     renderMusic,
  films:     renderFilms,
  games:     renderGames,
  drawings:  renderDrawings,
  private:   renderPrivate,
};

const $ = id => document.getElementById(id);

export function showZoom(type, label) {
  const view  = $('zoomView');
  const scene = $('zoomScene');

  scene.innerHTML = '';
  view.dataset.type = type;
  $('zoomTitle').textContent = label;
  RENDERERS[type]?.(scene);

  view.removeAttribute('hidden');
  view.offsetHeight; // força reflow para a transição funcionar
  view.classList.add('is-visible');
}

export function closeZoom() {
  const view = $('zoomView');
  view.classList.remove('is-visible');
  setTimeout(() => {
    view.setAttribute('hidden', '');
    $('zoomScene').innerHTML = '';
  }, 250);
}

$('zoomBack').addEventListener('click', closeZoom);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !$('zoomView').hidden) closeZoom();
});
