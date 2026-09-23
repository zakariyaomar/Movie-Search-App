# Movie Search App

A multi-page React application for searching movies, viewing details, and saving favorites, built with React, React Router, Tailwind CSS, and the OMDB API.

## Features

- Search movies by title via the OMDB API
- Responsive results grid (4 columns desktop, 2 tablet, 1 mobile)
- Movie details page with full plot, cast, ratings, etc.
- Favorite/unfavorite movies, persisted in `localStorage`
- Dedicated Favorites page with a live count badge in the header
- Loading and error states for all API requests
- Bonus: pagination, type/year filters, search history suggestions, share-link button, dark mode toggle

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Get a free API key from [omdbapi.com](https://www.omdbapi.com/apikey.aspx) and add it to a `.env` file in the project root:

   ```
   VITE_OMDB_API_KEY=your_api_key_here
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

## Build

```bash
npm run build
npm run preview
```

## Deployment (Vercel)

1. Push this repository to GitHub.
2. Import the repo into Vercel.
3. Add `VITE_OMDB_API_KEY` under Settings → Environment Variables.
4. Deploy. The included `vercel.json` handles client-side routing so refreshing on `/movie/:id` or `/favorites` works correctly.

## Project Structure

```
src/
├── components/   # Reusable UI pieces (Header, SearchBar, MovieCard, MovieGrid, LoadingSpinner, ErrorMessage, Pagination, SearchFilters)
├── pages/        # Route-level pages (HomePage, MovieDetailsPage, FavoritesPage)
├── hooks/        # useFetch, useFavorites
├── utils/        # favorites.js, searchHistory.js, omdb.js
├── App.jsx
└── main.jsx
```
