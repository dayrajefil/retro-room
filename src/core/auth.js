import { getState, setState } from './state.js';

const VALID = /^[a-z0-9]+$/;

export const isLoggedIn  = () => !!getState().currentUser;
export const getCurrentUser = () => getState().currentUser;

export const login = async (username, password) => {
  if (!username || !password)
    return { ok: false, error: 'Preencha todos os campos.' };
  if (!VALID.test(username))
    return { ok: false, error: 'Usuário inválido. Apenas letras minúsculas e números.' };
  if (!VALID.test(password))
    return { ok: false, error: 'Senha inválida. Apenas letras minúsculas e números.' };

  const pwHash = await sha256(password);
  const { users } = getState();

  // Hash local bate → ok direto
  if (users[username] === pwHash)
    return saveSession(username, pwHash);

  // Hash local não bate (ou não existe) → tenta servidor
  try {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, now: new Date().toISOString() }),
    });
    const data = await res.json();
    if (!data.ok) return { ok: false, error: data.error };
    // Servidor aprovou → salva hash local atualizado
    return saveSession(username, pwHash);
  } catch {
    // Servidor indisponível: só rejeita se havia hash conflitante
    if (username in users)
      return { ok: false, error: 'Senha incorreta.' };
    // Novo usuário sem servidor → cria localmente
    return saveSession(username, pwHash);
  }
};

export const logout = () => setState({ currentUser: null });

function saveSession(username, pwHash) {
  const now   = new Date();
  const state = getState();
  setState({
    users: { ...state.users, [username]: pwHash },
    currentUser: username,
    guestbook: [
      ...state.guestbook,
      {
        user: username,
        date: now.toLocaleDateString('pt-BR'),
        time: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      },
    ],
  });
  return { ok: true };
}

async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}
