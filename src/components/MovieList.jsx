
import { useEffect, useMemo, useRef, useState } from "react";
import MovieCard from "./MovieCard";

function getFilteredMovies({ movies, search, selectedGenre, wishlist, showWishlistOnly }) {
  const normalizedSearch = search.toLowerCase();
  return movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(normalizedSearch);
    const matchesGenre = selectedGenre === "All" || movie.genre === selectedGenre;
    const matchesWishlist = !showWishlistOnly || wishlist.includes(movie.id);
    return matchesSearch && matchesGenre && matchesWishlist;
  });
}

function sortMovies(movies, sortBy) {
  return [...movies].sort((a, b) => {
    switch (sortBy) {
      case "rating-high": return b.rating - a.rating;
      case "rating-low": return a.rating - b.rating;
      case "year-new": return b.year - a.year;
      case "year-old": return a.year - b.year;
      case "title": return a.title.localeCompare(b.title);
      default: return 0;
    }
  });
}

function getAverageRating(movies) {
  if (movies.length === 0) return 0;

  const totalRating = movies.reduce((total, movie) => total + movie.rating, 0);
  return totalRating / movies.length;
}

function useAverageRatingStatus(averageRatingResult, sortBy) {
  const previousResult = useRef(null);
  const [status, setStatus] = useState("calculated");

  useEffect(() => {
    const wasReused = previousResult.current === averageRatingResult;
    setStatus(wasReused ? "reused" : "calculated");
    previousResult.current = averageRatingResult;
  }, [averageRatingResult, sortBy]);

  return status;
}

function MovieList({ movies, wishlist, onToggleWishlist, averageRating, ratingStatus }) {
  if (movies.length === 0) {
    return <p className="no-results">No movies found. Try changing your search or filters.</p>;
  }

  return (
    <>
      <p className="rating-summary">
        Average rating of {movies.length} visible {movies.length === 1 ? "movie" : "movies"}: ⭐ {averageRating.toFixed(1)}
      </p>
      <p className={`rating-calculation-status ${ratingStatus}`} aria-live="polite">
        {ratingStatus === "reused"
          ? "✓ Cached average reused — sorting changed only"
          : ratingStatus === "calculated"
            ? "↻ Average calculated for the current movie set"
            : "↻ Average recalculated — useMemo is off"}
      </p>

      <div className="movie-list">

        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isWishlisted={wishlist.includes(movie.id)}
            onToggleWishlist={onToggleWishlist}
          />
        ))}

      </div>
    </>
  );
}

function MemoizedMovieList(props) {
  const {
    movies,
    search,
    selectedGenre,
    sortBy,
    wishlist,
    showWishlistOnly,
    onToggleWishlist,
  } = props;

  const filteredMovies = useMemo(() => {
    return getFilteredMovies({
      movies,
      search,
      selectedGenre,
      wishlist,
      showWishlistOnly,
    });
  }, [movies, search, selectedGenre, wishlist, showWishlistOnly]);

  const visibleMovies = useMemo(() => {
    return sortMovies(filteredMovies, sortBy);
  }, [filteredMovies, sortBy]);

  const averageRatingResult = useMemo(() => {
    return { value: getAverageRating(filteredMovies) };
  }, [filteredMovies]);
  const ratingStatus = useAverageRatingStatus(averageRatingResult, sortBy);

  return (
    <MovieList
      movies={visibleMovies}
      wishlist={wishlist}
      onToggleWishlist={onToggleWishlist}
      averageRating={averageRatingResult.value}
      ratingStatus={ratingStatus}
    />
  );
}

function UnmemoizedMovieList(props) {
  const { wishlist, onToggleWishlist } = props;

  const filteredMovies = getFilteredMovies(props);
  const visibleMovies = sortMovies(filteredMovies, props.sortBy);
  const averageRating = getAverageRating(filteredMovies);

  return (
    <MovieList
      movies={visibleMovies}
      wishlist={wishlist}
      onToggleWishlist={onToggleWishlist}
      averageRating={averageRating}
      ratingStatus="recalculated"
    />
  );
}

export default MovieList;
export { MemoizedMovieList, UnmemoizedMovieList };
