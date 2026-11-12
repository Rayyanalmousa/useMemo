
function MovieCard({ movie }) {
  return (
    <div className="movie-card">

      <h3>{movie.title}</h3>

      <p>Genre: {movie.genre}</p>

      <p>Release Year: {movie.year}</p>

      <p>Rating: ⭐ {movie.rating}</p>

      <p>Duration: {movie.duration} minutes</p>

    </div>
  );
}

export default MovieCard;
