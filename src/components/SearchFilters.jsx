export default function SearchFilters({ type, year, onTypeChange, onYearChange }) {
  return (
    <div className="mx-auto mt-3 flex w-full max-w-2xl flex-wrap items-center justify-center gap-3">
      <select
        value={type}
        onChange={(e) => onTypeChange(e.target.value)}
        className="rounded-md border border-gray-300 px-3 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
      >
        <option value="">All Types</option>
        <option value="movie">Movies</option>
        <option value="series">Series</option>
        <option value="game">Games</option>
      </select>
      <input
        type="number"
        value={year}
        onChange={(e) => onYearChange(e.target.value)}
        placeholder="Year"
        className="w-28 rounded-md border border-gray-300 px-3 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
      />
    </div>
  );
}
