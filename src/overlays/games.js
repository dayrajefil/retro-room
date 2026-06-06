import { games } from '../data/index.js';
import { isFavorite, toggleFavorite } from '../core/state.js';

export function renderGames(container) {
  const grid = document.createElement('div');
  grid.className = 'card-grid';

  games.forEach(game => {
    const fav = isFavorite('games', game.id);
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <button class="card__fav ${fav ? 'is-fav' : ''}"
              aria-label="Favoritar ${game.title}">★</button>
      <span class="card__emoji">${game.emoji}</span>
      <div class="card__title">${game.title}</div>
      <div class="card__sub">${game.developer} · ${game.platform}</div>
      <span class="card__genre">${game.genre}</span>
    `;

    card.querySelector('.card__fav').addEventListener('click', e => {
      e.stopPropagation();
      toggleFavorite('games', game.id);
      e.currentTarget.classList.toggle('is-fav');
    });

    grid.appendChild(card);
  });

  container.appendChild(grid);
}
