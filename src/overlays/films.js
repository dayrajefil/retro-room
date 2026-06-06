import { movies, series } from '../data/index.js';
import { isFavorite, toggleFavorite } from '../core/state.js';

export function renderFilms(container) {
  // Tabs
  const tabs = document.createElement('div');
  tabs.className = 'tabs';
  tabs.innerHTML = `
    <button class="tab is-active" data-tab="movies">🎬 FILMES</button>
    <button class="tab"           data-tab="series">📺 SÉRIES</button>
  `;
  container.appendChild(tabs);

  const body = document.createElement('div');
  container.appendChild(body);

  function renderTab(type) {
    body.innerHTML = '';
    const data = type === 'movies' ? movies : series;
    const grid = document.createElement('div');
    grid.className = 'card-grid';

    data.forEach(item => {
      const fav = isFavorite(type, item.id);
      const card = document.createElement('div');
      card.className = 'card';
      const creator = item.director ?? item.creator ?? '';
      card.innerHTML = `
        <button class="card__fav ${fav ? 'is-fav' : ''}"
                aria-label="Favoritar ${item.title}">★</button>
        <span class="card__emoji">${item.emoji}</span>
        <div class="card__title">${item.title}</div>
        <div class="card__sub">${creator}</div>
        <span class="card__genre">${item.genre}</span>
      `;

      card.querySelector('.card__fav').addEventListener('click', e => {
        e.stopPropagation();
        toggleFavorite(type, item.id);
        e.currentTarget.classList.toggle('is-fav');
      });

      grid.appendChild(card);
    });

    body.appendChild(grid);
  }

  tabs.addEventListener('click', e => {
    const btn = e.target.closest('.tab');
    if (!btn) return;
    tabs.querySelectorAll('.tab').forEach(t => t.classList.remove('is-active'));
    btn.classList.add('is-active');
    renderTab(btn.dataset.tab);
  });

  renderTab('movies');
}
