# Movie Explorer

A React movie finder with search, genre filters, sorting, and a wishlist saved in your browser. The wishlist and the `useMemo` comparison are included to support the React Hooks project brief.

## Run it

1. Unzip the project and open a terminal in the folder containing `package.json`.
2. Run `npm install`.
3. Run `npm run dev` and open the local address Vite prints.

If npm reports `ENOENT` for `package.json`, the terminal is in the wrong folder. Change into the extracted `useMemo` folder first.

## Wishlist

Use **Add to wishlist** on a movie card, then choose **My wishlist** to show saved movies. The app saves movie IDs in browser `localStorage` under `movie-explorer-wishlist`. Refreshing the page keeps the list. The saved list is local to that browser and device.

## How the `useMemo` demo works

The app filters movies by title, genre, and (optionally) wishlist membership, then sorts the result. The **Compare useMemo** button switches between two small result components:

- `MemoizedMovieList` uses `useMemo` to reuse the filtered and sorted array while its inputs are unchanged.
- `UnmemoizedMovieList` performs the same calculation on every render.

The displayed movies should be the same in both modes. Search, genre, sorting, and wishlist changes update the dependency values and recalculate the list. With only eight sample movies, either version is fast; the demo is for understanding the Hook. In a real app, measure first and use memoization only when it helps. React Strict Mode may call render calculations more than once in development, so the calculation stays pure.

## Code map

- `src/App.jsx` - app state, controls, and localStorage read/write
- `src/components/MovieList.jsx` - shared filter/sort calculation and memoized/plain versions
- `src/components/MovieCard.jsx` - movie details and wishlist button
- `src/components/SearchBar.jsx`, `FilterBar.jsx`, `SortBar.jsx` - existing controls
- `src/data/movies.js` - sample movies
- `src/index.css` - existing styles plus wishlist and demo controls

## Short presentation outline

1. Explain that `useMemo` caches a calculation result until one of its dependencies changes.
2. Demonstrate searching, filtering by genre, sorting, and saving movies.
3. Explain that wishlist IDs are read from and written to `localStorage` so they remain after refresh.
4. Toggle **Compare useMemo** and describe the same output with and without cached calculation results.
5. Explain the tradeoff: memoization can skip repeated expensive work, but adds complexity and is unnecessary for tiny, already-fast calculations.
