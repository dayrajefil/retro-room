import * as storage from './storage.js';

const DEFAULTS = {
  users: {},
  currentUser: null,
  guestbook: [],
  favorites: {},   // { type: [id, ...] }
};

let _state = { ...DEFAULTS, ...storage.get('state', {}) };

export const getState = () => _state;

export const setState = (partial) => {
  _state = { ..._state, ...partial };
  storage.set('state', _state);
};

export const toggleFavorite = (type, id) => {
  const favs = { ..._state.favorites };
  if (!favs[type]) favs[type] = [];

  const idx = favs[type].indexOf(id);
  if (idx > -1) favs[type].splice(idx, 1);
  else favs[type].push(id);

  setState({ favorites: favs });
};

export const isFavorite = (type, id) =>
  (_state.favorites[type] ?? []).includes(id);

export const countFavorites = () =>
  Object.values(_state.favorites).flat().length;

