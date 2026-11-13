import { useMemo } from "react";

function MovieInsights({ movies }) {

  const insights = useMemo(() => {
    console.log("Calculating movie insights...");

    const totalMovies = movies.length;

    const averageRating = totalMovies === 0
      ? 0
      : movies.reduce((sum, movie) => sum + movie.rating, 0) / totalMovies;

    const topRatedMovie = totalMovies === 0
      ? "N/A"
      : movies.reduce((highest, movie) =>
          movie.rating > highest.rating ? movie : highest
        );

    const genreCounts = movies.reduce((counts, movie) => {
      counts[movie.genre] = (counts[movie.genre] || 0) + 1;
      return counts;
    }, {});

    const popularGenre = Object.keys(genreCounts).length === 0
      ? "N/A"
      : Object.keys(genreCounts).reduce((a, b) =>
          genreCounts[a] > genreCounts[b] ? a : b
        );

    return {
      totalMovies,
      averageRating: averageRating.toFixed(1),
      topRatedMovie: topRatedMovie.title || "N/A",
      popularGenre
    };

  }, [movies]);

  return (
    <section className="movie-insights">

      <h2>Movie Insights</h2>

      <div className="insights-grid">

        <div className="insight-card">
          <h3>Total Movies</h3>
          <p>{insights.totalMovies}</p>
        </div>

        <div className="insight-card">
          <h3>Average Rating</h3>
          <p>⭐ {insights.averageRating}</p>
        </div>

        <div className="insight-card">
          <h3>Top-Rated Movie</h3>
          <p>{insights.topRatedMovie}</p>
        </div>

        <div className="insight-card">
          <h3>Popular Genre</h3>
          <p>{insights.popularGenre}</p>
        </div>

      </div>

    </section>
  );
}

export default MovieInsights;