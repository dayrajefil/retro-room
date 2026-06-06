import { login, logout, isLoggedIn, getCurrentUser } from './core/auth.js';
import { initRoom, destroyRoom } from './room/index.js';
import { updateGuestbook } from './ui/guestbook.js';
import { playCRTTransition } from './ui/transition.js';
import { initCursors } from './ui/cursors.js';

initCursors();

// ─── TELAS ──────────────────────────────────────────

const screens = {
  login:  document.getElementById('screen-login'),
  room:   document.getElementById('screen-room'),
};

function showScreen(name) {
  Object.entries(screens).forEach(([key, el]) => {
    el.classList.toggle('is-active', key === name);
  });
}

// ─── LOGIN ──────────────────────────────────────────

document.getElementById('loginForm').addEventListener('submit', async e => {
  e.preventDefault();

  const username = document.getElementById('loginUser').value.trim().toLowerCase();
  const password = document.getElementById('loginPass').value.trim().toLowerCase();
  const errorEl  = document.getElementById('loginError');
  const btn      = document.getElementById('loginForm').querySelector('button');

  btn.disabled = true;
  errorEl.textContent = '';

  try {
    const result = await login(username, password);

    if (!result.ok) {
      errorEl.textContent = result.error;
      return;
    }

    await playCRTTransition(username);
    enterRoom(true);
  } catch (err) {
    errorEl.textContent = 'Erro inesperado. Veja o console.';
    console.error('[login]', err);
  } finally {
    btn.disabled = false;
  }
});

// ─── QUARTO ─────────────────────────────────────────

function enterRoom(freshLogin = false) {
  showScreen('room');
  updateGuestbook();
  initRoom(freshLogin);
}

document.getElementById('btnExit').addEventListener('click', () => {
  destroyRoom();
  logout();
  document.getElementById('loginUser').value = '';
  document.getElementById('loginPass').value = '';
  showScreen('login');
});

// ─── INIT ────────────────────────────────────────────

// Restaura sessão se usuário ainda está logado
if (isLoggedIn()) {
  enterRoom();
} else {
  showScreen('login');
}
