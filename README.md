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
• 🔁 Switch useMemo ON and OFF and see whether the average is reused or recalculated.
• ⭐ Show the average rating of the currently visible movies.

🧠 HOW useMemo IS USED
The app first filters movies by title, genre, and (when selected) wishlist membership using getFilteredMovies() in src/components/MovieList.jsx. It sorts the filtered list separately with sortMovies().

When useMemo is ON, MemoizedMovieList uses separate useMemo calls for filtering, sorting, and calculating the average rating. Filtering depends on movies, search, selectedGenre, wishlist, and showWishlistOnly. Sorting depends on the filtered list and sortBy. The average depends on the filtered list, so changing only the sort order can reuse the same average.

The page shows the average rating of the movies currently visible, along with a status message. With useMemo ON, changing the sort order displays “Cached average reused — sorting changed only.” The status is based on whether React reused the memoized average result.

When useMemo is OFF, UnmemoizedMovieList filters, sorts, and calculates the average again whenever it renders. Both modes should display the same movies and average; useMemo changes whether React can reuse a calculation, not its answer.

To compare the rating calculation on the page:
1. Make sure at least one movie is visible, then turn useMemo ON.
2. Change the sort order. The cards reorder and the status should say “Cached average reused — sorting changed only.” The average stays the same because the movie set did not change.
3. Turn useMemo OFF and change the sort order again. The status should say “Average recalculated — useMemo is off.”
4. Change the search or genre. The movie set and possibly its average change in both modes.
5. Add movies to your wishlist, then choose “My wishlist.” The average now uses only the visible wishlisted movies.

With only eight sample movies, this project is not expected to show a noticeable speed improvement. The page status demonstrates when the memoized value is reused; useMemo is most useful when a calculation is costly enough for avoiding repeated work to matter.

💾 HOW THE WISHLIST WORKS
The wishlist is an array of movie IDs held in React state in src/App.jsx. Each movie card has a button to add or remove that movie. The “My wishlist” button filters the page to those saved movies, and the average rating follows the movies currently visible. When the app starts, it reads the saved IDs from localStorage using the key “movie-explorer-wishlist”. A React effect writes the updated list back to localStorage whenever the wishlist changes. This keeps saved movies in the same browser on the same device. If browser storage is unavailable or contains invalid data, the app falls back to an empty wishlist.

🗂️ PROJECT FILES
• src/App.jsx - app state, search/filter/sort controls, wishlist storage, and useMemo ON/OFF switch
• src/components/MovieList.jsx - filtering, sorting, average-rating calculation, and memoized/plain versions
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
