
import movies from "./data/movies";
import MovieList from "./components/MovieList";

function App() {
  return (
    <div className="app">

      <header className="navbar">
        <h1>Movie Explorer</h1>
        <p>Discover your next favorite movie.</p>
      </header>

      <main className="container">

        <h2>Explore Movies</h2>

        <p>Discover movies from different genres.</p>

        <MovieList movies={movies} />

      </main>

    </div>
  );
}

export default App;
