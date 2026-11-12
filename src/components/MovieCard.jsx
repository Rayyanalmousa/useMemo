
function MovieCard({ movie, isWishlisted, onToggleWishlist }) {
  return (
    <div className="movie-card">

      <button
        type="button"
        className={`wishlist-button ${isWishlisted ? "saved" : ""}`}
        onClick={() => onToggleWishlist(movie.id)}
        aria-pressed={isWishlisted}
        aria-label={`${isWishlisted ? "Remove" : "Add"} ${movie.title} ${isWishlisted ? "from" : "to"} wishlist`}
      >
        {isWishlisted ? "♥ Saved" : "♡ Add to wishlist"}
      </button>


      <img
        className="movie-poster"
        src={movie.poster}
        alt={`${movie.title} poster`}
        loading="lazy"
      />



      <h3>{movie.title}</h3>

      <p>Genre: {movie.genre}</p>

      <p>Release Year: {movie.year}</p>

      <p>Rating: ⭐ {movie.rating}</p>

      <p>Duration: {movie.duration} minutes</p>

    </div>
  );
}

export default MovieCard;
