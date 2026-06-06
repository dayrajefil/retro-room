import { getState } from '../core/state.js';
import { CURSOR_POINTER } from './cursors.js';

export function updateGuestbook() {
  const { guestbook } = getState();
  const list = document.getElementById('guestbookList');
  const tab  = document.getElementById('guestbookTab');
  if (!list || !tab) return;

  // Agrupa por usuário, mais recente primeiro
  const reversed = [...guestbook].reverse();
  const userOrder = [];
  const grouped   = {};

  for (const entry of reversed) {
    if (!grouped[entry.user]) {
      grouped[entry.user] = [];
      userOrder.push(entry.user);
    }
    grouped[entry.user].push(entry);
  }

  list.innerHTML = userOrder.map(user => {
    const visits = grouped[user];
    const label  = visits.length === 1 ? '1 visita' : `${visits.length} visitas`;
    const shown  = visits.slice(0, 10);
    const rest   = visits.length - shown.length;
    const items  = shown.map(v =>
      `<li class="gb-user__visit">${v.date} ${v.time}</li>`
    ).join('') + (rest > 0 ? `<li class="gb-user__visit gb-user__rest">e outras ${rest} vez${rest === 1 ? '' : 'es'}</li>` : '');

    return `
      <li class="gb-user">
        <button class="gb-user__header">
          <span class="gb-user__name">${user}</span>
          <span class="gb-user__count">${label}</span>
        </button>
        <ul class="gb-user__visits" hidden>${items}</ul>
      </li>`;
  }).join('');

  // Expande/colapsa visitas — só um por vez
  const allVisits = () => list.querySelectorAll('.gb-user__visits');

  list.querySelectorAll('.gb-user__header').forEach(btn => {
    btn.style.cursor = CURSOR_POINTER;
    btn.addEventListener('click', () => {
      const visits = btn.nextElementSibling;
      const isOpen = !visits.hidden;
      allVisits().forEach(v => { v.hidden = true; });
      visits.hidden = isOpen;
    });
  });

  // Abre/fecha gaveta
  tab.style.cursor = CURSOR_POINTER;
  tab.onclick = () => document.getElementById('guestbook').classList.toggle('is-open');
}
