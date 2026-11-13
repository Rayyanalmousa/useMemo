
import { useMemo } from "react";
import MovieCard from "./MovieCard";
import MovieInsights from "./MovieInsights";

function getVisibleMovies({
  movies,
  search,
  selectedGenre,
  sortBy,
  wishlist,
  showWishlistOnly
}) {
  const normalizedSearch = search.toLowerCase();

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(normalizedSearch);

    const matchesGenre =
      selectedGenre === "All" || movie.genre === selectedGenre;

    const matchesWishlist =
      !showWishlistOnly || wishlist.includes(movie.id);

    return matchesSearch && matchesGenre && matchesWishlist;
  });

  return [...filteredMovies].sort((a, b) => {
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
}

function MovieList({ movies, wishlist, onToggleWishlist }) {
  return (
    <>
      <MovieInsights movies={movies} />

      {movies.length === 0 ? (
        <p className="no-results">
          No movies found. Try changing your search or filters.
        </p>
      ) : (
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
      )}
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
    onToggleWishlist
  } = props;

  const visibleMovies = useMemo(() => {
    console.log("Calculation ran: useMemo ON");

    return getVisibleMovies({
      movies,
      search,
      selectedGenre,
      sortBy,
      wishlist,
      showWishlistOnly
    });
  }, [
    movies,
    search,
    selectedGenre,
    sortBy,
    wishlist,
    showWishlistOnly
  ]);

  return (
    <MovieList
      movies={visibleMovies}
      wishlist={wishlist}
      onToggleWishlist={onToggleWishlist}
    />
  );
}

function UnmemoizedMovieList(props) {
  const { wishlist, onToggleWishlist } = props;

  console.log("Calculation ran: useMemo OFF");

  const visibleMovies = getVisibleMovies(props);

  return (
    <MovieList
      movies={visibleMovies}
      wishlist={wishlist}
      onToggleWishlist={onToggleWishlist}
    />
  );
}

export default MovieList;
export { MemoizedMovieList, UnmemoizedMovieList };
