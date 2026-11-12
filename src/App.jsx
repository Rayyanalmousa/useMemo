import { useState } from "react";

import movies from "./data/movies";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import SortBar from "./components/SortBar";

function App() {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesGenre =
      selectedGenre === "All" || movie.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  const sortedMovies = [...filteredMovies].sort((a, b) => {
    switch (sortBy) {
      case "rating-high":
        return b.rating - a.rating;

      case "rating-low":
        return a.rating - b.rating;

      case "year-new":
        return b.year - a.year;

      case "year-old":
        return a.year - b.year;

      case "title":
        return a.title.localeCompare(b.title);

      default:
        return 0;
    }
  });

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

        <MovieList movies={sortedMovies} />

        {sortedMovies.length === 0 && (
          <p className="no-results">
            No movies found.
          </p>
        )}

      </main>

    </div>
  );
}

export default App;