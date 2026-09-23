import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';

export default function MovieCard({ movie }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const hasPoster = movie.Poster && movie.Poster !== 'N/A';
  const favorited = isFavorite(movie.imdbID);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg dark:bg-gray-900">
      <Link to={`/movie/${movie.imdbID}`} className="block">
        {hasPoster ? (
          <img
            src={movie.Poster}
            alt={`${movie.Title} poster`}
            className="h-72 w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-72 w-full items-center justify-center bg-gray-200 text-center text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-400">
            No Poster Available
          </div>
        )}
      </Link>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(movie);
        }}
        aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
        className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg shadow dark:bg-gray-900/90"
      >
        {favorited ? '❤️' : '🤍'}
      </button>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <Link
          to={`/movie/${movie.imdbID}`}
          className="line-clamp-2 font-semibold text-gray-900 hover:text-blue-600 dark:text-gray-100"
        >
          {movie.Title}
        </Link>
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>{movie.Year}</span>
          <span className="rounded bg-gray-100 px-2 py-0.5 capitalize dark:bg-gray-800">{movie.Type}</span>
        </div>
      </div>
    </div>
  );
}
