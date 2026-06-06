import { books } from '../data/index.js';
import { isFavorite, toggleFavorite } from '../core/state.js';

const BOOKS_PER_ROW = 9;

export function renderBookshelf(container) {
  const wrap = document.createElement('div');
  wrap.className = 'bookshelf-wrap';

  for (let r = 0; r < Math.ceil(books.length / BOOKS_PER_ROW); r++) {
    const row = document.createElement('div');
    row.className = 'bookshelf-row';
    books.slice(r * BOOKS_PER_ROW, (r + 1) * BOOKS_PER_ROW).forEach(book => {
      row.appendChild(buildBook(book));
    });
    wrap.appendChild(row);
  }

  container.appendChild(wrap);
}

function buildBook(book) {
  const el = document.createElement('div');
  el.className = `book book--${book.color ?? 'dark'} book--${book.size ?? 'md'}`;
  if (isFavorite('books', book.id)) el.classList.add('is-fav');

  el.setAttribute('tabindex', '0');
  el.setAttribute('role', 'button');
  el.setAttribute('aria-label', `${book.title} — ${book.author}`);
  el.title = `${book.title}\n${book.author} (${book.year})`;

  el.innerHTML = `
    <div class="book__spine">
      <span class="book__spine-title">${book.title}</span>
      <span class="book__spine-author">${book.author}</span>
    </div>
    <div class="book__cover">
      <div class="book__cover-overlay"></div>
      <div class="book__cover-title">${book.title}</div>
      <div class="book__cover-author">${book.author}</div>
    </div>
  `;

  el.addEventListener('click', () => {
    toggleFavorite('books', book.id);
    el.classList.toggle('is-fav', isFavorite('books', book.id));
  });

  return el;
}
