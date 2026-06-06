import { getState } from '../core/state.js';

export function updateGuestbook() {
  const { guestbook } = getState();
  const list = document.getElementById('guestbookList');
  if (!list) return;

  const recent = [...guestbook].reverse().slice(0, 8);
  list.innerHTML = recent.map(e => `
    <li class="guestbook__entry">
      <span class="guestbook__user">${e.user}</span>
      ${e.date} ${e.time}
      <span style="opacity:.45">(${e.accessCount})</span>
    </li>
  `).join('');
}
