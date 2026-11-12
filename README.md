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
• 🔁 Switch between useMemo ON and OFF to compare the same movie calculation.
• 🧪 Use the “Re-render demo” button to trigger an unrelated render for the console demonstration.

🧠 HOW useMemo IS USED
The app filters movies by title, genre, and (when selected) wishlist membership, then sorts the matching movies. This calculation lives in getVisibleMovies() in src/components/MovieList.jsx.

When useMemo is ON, MemoizedMovieList wraps that calculation in useMemo. React can reuse the previous filtered and sorted movie array while its dependencies stay the same: movies, search, selectedGenre, sortBy, wishlist, and showWishlistOnly.

When useMemo is OFF, UnmemoizedMovieList runs getVisibleMovies() again each time that component renders. Both modes should display the same movies; the difference is whether React can reuse the calculation result.

The “Re-render demo” button changes demoCount in src/App.jsx. That causes the app and results component to render again without changing the movie filters. With useMemo ON, the component can render while the calculation is reused. With useMemo OFF, the calculation runs again.

To show this in class:
1. Open the browser developer tools and select the Console tab.
2. Turn useMemo ON and clear the console.
3. Click “Re-render demo” a few times. Look for “Calculation ran: useMemo ON”.
4. Turn useMemo OFF, clear the console, and click the demo button again. Look for “Calculation ran: useMemo OFF” each time.
5. Explain that typing in search changes a dependency, so both modes must recalculate the list for the new search text.

The console.log messages are demonstrations. The app still needs to calculate the list when a relevant input changes. With only eight sample movies, this project is not expected to show a noticeable speed improvement. useMemo is most useful when a calculation is costly enough for avoiding repeated work to matter.

💾 HOW THE WISHLIST WORKS
The wishlist is an array of movie IDs held in React state in src/App.jsx. When the app starts, it reads the saved IDs from localStorage using the key “movie-explorer-wishlist”. A React effect writes the updated list back to localStorage whenever the wishlist changes. This keeps saved movies in the same browser on the same device. If browser storage is unavailable or contains invalid data, the app falls back to an empty wishlist.

🗂️ PROJECT FILES
• src/App.jsx - app state, search/filter/sort controls, wishlist storage, and demo buttons
• src/components/MovieList.jsx - shared filter/sort calculation and memoized/plain versions
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
“Movie Explorer lets users search, filter, sort, and save movies. useMemo caches the filtered and sorted movie list until one of its dependencies changes. The on/off switch compares that with recalculating on each render. The wishlist uses localStorage so saved movie IDs remain after a page refresh.”
