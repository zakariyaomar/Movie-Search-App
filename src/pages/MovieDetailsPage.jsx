import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { useFavorites } from '../hooks/useFavorites';
import { buildDetailsUrl } from '../utils/omdb';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function MovieDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [copied, setCopied] = useState(false);

  const url = useMemo(() => buildDetailsUrl(id), [id]);
  const { data: movie, loading, error } = useFetch(url);

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  if (loading) return <LoadingSpinner label="Loading movie details..." />;

  if (error) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <ErrorMessage message={error} />
        <div className="mt-6 text-center">
          <Link to="/" className="text-blue-600 hover:underline dark:text-blue-400">
            ← Back to Search
          </Link>
        </div>
      </div>
    );
  }

  if (!movie) return null;

  const hasPoster = movie.Poster && movie.Poster !== 'N/A';
  const favorited = isFavorite(movie.imdbID);
  const imdbRating = movie.imdbRating && movie.imdbRating !== 'N/A' ? movie.imdbRating : 'N/A';

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 inline-block text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
      >
        ← Back to Search
      </button>

      <div className="flex flex-col gap-6 md:flex-row">
        {hasPoster ? (
          <img src={movie.Poster} alt={`${movie.Title} poster`} className="w-full rounded-lg shadow-md md:w-80" />
        ) : (
          <div className="flex h-96 w-full items-center justify-center rounded-lg bg-gray-200 text-gray-500 md:w-80 dark:bg-gray-800 dark:text-gray-400">
            No Poster Available
          </div>
        )}

        <div className="flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {movie.Title} <span className="font-normal text-gray-500">({movie.Year})</span>
            </h1>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => toggleFavorite(movie)}
                className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium dark:border-gray-700"
              >
                {favorited ? '❤️ Favorited' : '🤍 Add to Favorites'}
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium dark:border-gray-700"
              >
                {copied ? 'Link copied!' : '🔗 Share'}
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-800">{movie.Rated}</span>
            <span className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-800">{movie.Runtime}</span>
            <span className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-800">{movie.Genre}</span>
            <span className="rounded bg-yellow-100 px-2 py-1 font-semibold text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
              ⭐ {imdbRating}
            </span>
          </div>

          <p className="mt-4 leading-relaxed text-gray-700 dark:text-gray-300">{movie.Plot}</p>

          <dl className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-semibold text-gray-900 dark:text-gray-100">Director</dt>
              <dd className="text-gray-600 dark:text-gray-400">{movie.Director}</dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 dark:text-gray-100">Actors</dt>
              <dd className="text-gray-600 dark:text-gray-400">{movie.Actors}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
