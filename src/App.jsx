import { useEffect, useState } from "react";

import movies from "./data/movies";
import MovieList, {
  MemoizedMovieList,
  UnmemoizedMovieList,
} from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import SortBar from "./components/SortBar";

function App() {
  const [demoCount, setDemoCount] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = window.localStorage.getItem("movie-explorer-wishlist");
      const parsedWishlist = savedWishlist ? JSON.parse(savedWishlist) : [];
      return Array.isArray(parsedWishlist) ? parsedWishlist : [];
    } catch {
      return [];
    }
  });
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);
  const [useMemoEnabled, setUseMemoEnabled] = useState(true);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        "movie-explorer-wishlist",
        JSON.stringify(wishlist),
      );
    } catch {
      // The wishlist still works for this visit if browser storage is unavailable.
    }
  }, [wishlist]);

  function toggleWishlist(movieId) {
    setWishlist((currentWishlist) => currentWishlist.includes(movieId)
      ? currentWishlist.filter((id) => id !== movieId)
      : [...currentWishlist, movieId]);
  }

  const resultsProps = {
    movies,
    search,
    selectedGenre,
    sortBy,
    wishlist,
    showWishlistOnly,
    onToggleWishlist: toggleWishlist,
  };

  return (
    <div className="app">

      <header className="navbar">
        <h1>Movie Explorer</h1>
        <p>Discover your next favorite movie.</p>
      </header>

      <main className="container">

        <h2>Explore Movies</h2>

        <p>Discover movies from different genres.</p>

        <div className="search-filter">

          <SearchBar
            search={search}
            setSearch={setSearch}
          />

          <FilterBar
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
          />

          <SortBar
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

        </div>

        <div className="movie-options">
          <button
            type="button"
            className={`wishlist-filter ${showWishlistOnly ? "selected" : ""}`}
            onClick={() => setShowWishlistOnly((showing) => !showing)}
            aria-pressed={showWishlistOnly}
          >
            {showWishlistOnly ? "Show all movies" : "My wishlist"}
            <span>{wishlist.length}</span>
          </button>

          <div className="memo-demo">
            <span>Compare useMemo</span>
            <button
              type="button"
              className={`memo-toggle ${useMemoEnabled ? "enabled" : ""}`}
              onClick={() => setUseMemoEnabled((enabled) => !enabled)}
              aria-pressed={useMemoEnabled}
              aria-label={`useMemo ${useMemoEnabled ? "on" : "off"}; click to switch`}
            >
              useMemo {useMemoEnabled ? "on" : "off"}
            </button>
            <button
              type="button"
              className="rerender-button"
              onClick={() => setDemoCount((count) => count + 1)}
            >
              Re-render demo ({demoCount})
            </button>
          </div>
        </div>

        <p className="memo-explanation" aria-live="polite">
          {useMemoEnabled
            ? "On: React can reuse the filtered and sorted list while its inputs stay the same."
            : "Off: the same filtering and sorting runs again on every render."}
        </p>

        {useMemoEnabled
          ? <MemoizedMovieList {...resultsProps} />
          : <UnmemoizedMovieList {...resultsProps} />}

      </main>

    </div>
  );
}

export default App;
