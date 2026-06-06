import { albums } from '../data/index.js';
import { isFavorite, toggleFavorite } from '../core/state.js';

export function renderMusic(container) {
  const grid = document.createElement('div');
  grid.className = 'card-grid';

  albums.forEach(album => {
    const fav = isFavorite('albums', album.id);
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <button class="card__fav ${fav ? 'is-fav' : ''}"
              aria-label="Favoritar ${album.title}"
              title="Favoritar">★</button>
      <span class="card__emoji">${album.emoji}</span>
      <div class="card__title">${album.title}</div>
      <div class="card__sub">${album.artist}</div>
      <span class="card__genre">${album.genre}</span>
    `;

    card.querySelector('.card__fav').addEventListener('click', e => {
      e.stopPropagation();
      toggleFavorite('albums', album.id);
      e.currentTarget.classList.toggle('is-fav');
    });

    grid.appendChild(card);
  });

  container.appendChild(grid);
}
