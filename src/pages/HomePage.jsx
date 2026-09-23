import { useMemo, useState } from 'react';
import SearchBar from '../components/SearchBar';
import SearchFilters from '../components/SearchFilters';
import MovieGrid from '../components/MovieGrid';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import useFetch from '../hooks/useFetch';
import { buildSearchUrl } from '../utils/omdb';
import { addSearchTerm, getSearchHistory } from '../utils/searchHistory';

function formatError(error, query) {
  if (error === 'Movie not found!') {
    return `No movies found for '${query}'. Try a different title.`;
  }
  return error;
}

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const [year, setYear] = useState('');
  const [page, setPage] = useState(1);
  const [history, setHistory] = useState(() => getSearchHistory());

  const url = useMemo(() => {
    if (!query) return null;
    return buildSearchUrl({ query, page, type, year });
  }, [query, page, type, year]);

  const { data, loading, error } = useFetch(url);

  const movies = data?.Search ?? [];
  const totalResults = data ? Number(data.totalResults) || 0 : 0;
  const totalPages = totalResults ? Math.min(Math.ceil(totalResults / 10), 100) : 0;

  function handleSearch(term) {
    setQuery(term);
    setPage(1);
    setHistory(addSearchTerm(term));
  }

  function handleTypeChange(value) {
    setType(value);
    setPage(1);
  }

  function handleYearChange(value) {
    setYear(value);
    setPage(1);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-900 dark:text-gray-100">
        Find your next favorite movie
      </h1>
      <SearchBar initialValue={query} history={history} onSearch={handleSearch} />
      <SearchFilters type={type} year={year} onTypeChange={handleTypeChange} onYearChange={handleYearChange} />

      <div className="mt-8">
        {loading && <LoadingSpinner label="Searching movies..." />}
        {!loading && error && <ErrorMessage message={formatError(error, query)} />}
        {!loading && !error && query && movies.length === 0 && (
          <ErrorMessage message={`No movies found for '${query}'. Try a different title.`} />
        )}
        {!loading && !error && movies.length > 0 && (
          <>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">{totalResults} results found</p>
            <MovieGrid movies={movies} />
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </>
        )}
        {!query && !loading && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Start typing a movie title above to search the OMDB database.
          </p>
        )}
      </div>
    </div>
  );
}
