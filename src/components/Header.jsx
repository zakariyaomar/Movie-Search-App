import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FAVORITES_EVENT, getFavorites } from '../utils/favorites';

export default function Header({ darkMode, onToggleDarkMode }) {
  const [count, setCount] = useState(() => getFavorites().length);

  useEffect(() => {
    const sync = () => setCount(getFavorites().length);
    window.addEventListener(FAVORITES_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(FAVORITES_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const linkClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
    }`;

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/90 backdrop-blur dark:border-gray-800 dark:bg-gray-950/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <NavLink to="/" className="text-lg font-bold text-blue-600 dark:text-blue-400">
          🎬 Movie Search
        </NavLink>
        <nav className="flex items-center gap-2">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          <NavLink to="/favorites" className={linkClass}>
            Favorites
            {count > 0 && (
              <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-semibold text-white">
                {count}
              </span>
            )}
          </NavLink>
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700"
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </nav>
      </div>
    </header>
  );
}
