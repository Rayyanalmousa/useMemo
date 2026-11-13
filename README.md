🎬 MOVIE EXPLORER
=================

🌟 ABOUT THIS PROJECT
Movie Explorer is a beginner React app for browsing a small movie collection. It demonstrates React state, reusable components, browser local storage, and the assigned Hook: useMemo.

✨ FEATURES
• 🔎 Search movies by title.
• 🎭 Filter movies by genre.
• ↕️ Sort by rating, release year, or title.
• ❤️ Add and remove movies from a personal wishlist.
• 💾 Keep wishlist choices after a refresh with browser localStorage.
• 🖼️ Show movie posters using image links in the movie data.
• 🔁 Switch between useMemo ON and OFF to compare the calculations.
• ⭐ Show the average rating of the currently visible movies.

🧠 HOW useMemo IS USED
The app first filters movies by title, genre, and (when selected) wishlist membership using getFilteredMovies() in src/components/MovieList.jsx. It sorts that filtered list separately with sortMovies().

When useMemo is ON, MemoizedMovieList uses one useMemo for filtering and another for sorting. Filtering depends on movies, search, selectedGenre, wishlist, and showWishlistOnly. Sorting depends on the filtered list and sortBy.

The app also calculates the average rating of the filtered movies with getAverageRating(). A separate useMemo caches this average using filteredMovies as its dependency. Changing sort order only rearranges those movies, so it does not change their average.

When useMemo is OFF, UnmemoizedMovieList runs both calculations again whenever the component renders. Both modes should display the same visible movies and average; the difference is whether React can reuse the calculation results.

To compare the rating calculation on the page:
1. Turn useMemo ON. The rating summary shows the current average and a status message.
2. Change the sort order. The cards reorder, but the message says “Cached average reused — sorting changed only.” Sorting changes order, not which ratings are included.
3. Turn useMemo OFF and change the sort order again. The message says “Average recalculated — useMemo is off.”
4. Change the search or genre. The filtered movie set changes, so the average is recalculated in both modes.

With only eight sample movies, this project is not expected to show a noticeable speed improvement. The page status demonstrates when the memoized value is reused; useMemo is most useful when a calculation is costly enough for avoiding repeated work to matter.

💾 HOW THE WISHLIST WORKS
The wishlist is an array of movie IDs held in React state in src/App.jsx. When the app starts, it reads the saved IDs from localStorage using the key “movie-explorer-wishlist”. A React effect writes the updated list back to localStorage whenever the wishlist changes. This keeps saved movies in the same browser on the same device. If browser storage is unavailable or contains invalid data, the app falls back to an empty wishlist.

🗂️ PROJECT FILES
• src/App.jsx - app state, search/filter/sort controls, wishlist storage, and useMemo comparison toggle
• src/components/MovieList.jsx - filter/sort calculation, average-rating calculation, and memoized/plain versions
• src/components/MovieCard.jsx - movie details, poster, and wishlist button
• src/components/SearchBar.jsx - title search input
• src/components/FilterBar.jsx - genre selector
• src/components/SortBar.jsx - sort selector
• src/data/movies.js - sample movie data and poster URLs
• src/index.css - page and component styling
• src/main.jsx - React entry point

▶️ HOW TO RUN THE PROJECT
1. Install Node.js and npm.
2. Unzip the project.
3. Open a terminal in the folder that contains package.json.
4. Run: npm install
5. Run: npm run dev
6. Open the local address shown in the terminal.

If npm reports ENOENT for package.json, the terminal is in the wrong folder. Change to the extracted project folder first. Stop the development server with Ctrl+C.

🌐 IMAGE NOTE
Movie poster links load from the internet, so the browser must be online to display them. Poster artwork is from TMDB. This product uses the TMDB API but is not endorsed or certified by TMDB.

🎤 PRESENTATION SUMMARY
"Movie Explorer lets users search, filter, sort, and save movies. It also shows the average rating of the movies currently visible. With useMemo on, React can reuse the filtered list and its average rating until their inputs change. The wishlist uses localStorage so saved movie IDs remain after a page refresh."
