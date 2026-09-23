const STORAGE_KEY = 'movieSearchApp.favorites';
export const FAVORITES_EVENT = 'favoritesChanged';

function readFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeFavorites(favorites) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  // notify listeners in the same tab (the native "storage" event only fires cross-tab)
  window.dispatchEvent(new Event(FAVORITES_EVENT));
}

export function getFavorites() {
  return readFavorites();
}

export function isFavorite(imdbID) {
  return readFavorites().some((movie) => movie.imdbID === imdbID);
}

export function saveFavorite(movie) {
  const favorites = readFavorites();
  if (favorites.some((m) => m.imdbID === movie.imdbID)) return favorites;
  const updated = [...favorites, movie];
  writeFavorites(updated);
  return updated;
}

export function removeFavorite(imdbID) {
  const updated = readFavorites().filter((m) => m.imdbID !== imdbID);
  writeFavorites(updated);
  return updated;
}
