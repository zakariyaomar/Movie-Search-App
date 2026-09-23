const BASE_URL = 'https://www.omdbapi.com/';
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export function buildSearchUrl({ query, page = 1, type = '', year = '' }) {
  const params = new URLSearchParams({ apikey: API_KEY, s: query, page: String(page) });
  if (type) params.set('type', type);
  if (year) params.set('y', year);
  return `${BASE_URL}?${params.toString()}`;
}

export function buildDetailsUrl(imdbID) {
  const params = new URLSearchParams({ apikey: API_KEY, i: imdbID, plot: 'full' });
  return `${BASE_URL}?${params.toString()}`;
}
