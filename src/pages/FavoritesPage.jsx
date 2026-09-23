import { useFavorites } from '../hooks/useFavorites';
import MovieGrid from '../components/MovieGrid';

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">Your Favorites</h1>
      {favorites.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          You have not saved any favorites yet. Search for movies and click the heart icon to save them.
        </p>
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </div>
  );
}
