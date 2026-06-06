const NS = 'retro-room:';

export const get = (key, fallback = null) => {
  try {
    const raw = localStorage.getItem(NS + key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const set = (key, value) => {
  localStorage.setItem(NS + key, JSON.stringify(value));
};
