import { useCallback, useEffect, useState } from 'react';
import { FAVORITES_EVENT, getFavorites, isFavorite, removeFavorite, saveFavorite } from '../utils/favorites';

// Keeps a component in sync with the localStorage-backed favorites list.
export function useFavorites() {
  const [favorites, setFavorites] = useState(() => getFavorites());

  useEffect(() => {
    const syncFavorites = () => setFavorites(getFavorites());
    window.addEventListener(FAVORITES_EVENT, syncFavorites);
    window.addEventListener('storage', syncFavorites);
    return () => {
      window.removeEventListener(FAVORITES_EVENT, syncFavorites);
      window.removeEventListener('storage', syncFavorites);
    };
  }, []);

  const toggleFavorite = useCallback((movie) => {
    if (isFavorite(movie.imdbID)) {
      removeFavorite(movie.imdbID);
    } else {
      saveFavorite(movie);
    }
  }, []);

  return { favorites, toggleFavorite, isFavorite };
}
