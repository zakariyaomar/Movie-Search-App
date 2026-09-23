const HISTORY_KEY = 'movieSearchApp.searchHistory';
const MAX_HISTORY = 10;

export function getSearchHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addSearchTerm(term) {
  const trimmed = term.trim();
  if (!trimmed) return getSearchHistory();
  const existing = getSearchHistory().filter((item) => item.toLowerCase() !== trimmed.toLowerCase());
  const updated = [trimmed, ...existing].slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  return updated;
}
