import { useEffect, useRef, useState } from 'react';

export default function SearchBar({ initialValue = '', history = [], onSearch }) {
  const [term, setTerm] = useState(initialValue);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function submitSearch(value) {
    const trimmed = value.trim();
    if (!trimmed) return;
    setTerm(trimmed);
    setShowSuggestions(false);
    onSearch(trimmed);
  }

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-2xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitSearch(term);
        }}
        className="flex w-full gap-2"
      >
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search for a movie title..."
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-base focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        />
        <button
          type="submit"
          className="shrink-0 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          Search
        </button>
      </form>
      {showSuggestions && history.length > 0 && (
        <ul className="absolute z-20 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
          {history.map((item) => (
            <li key={item}>
              <button
                type="button"
                onClick={() => submitSearch(item)}
                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
