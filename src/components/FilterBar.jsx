function FilterBar({ selectedGenre, setSelectedGenre }) {
  const genres = ["All", "Action", "Sci-Fi", "Romance", "Horror", "Drama"];

  return (
    <select
      value={selectedGenre}
      onChange={(event) => setSelectedGenre(event.target.value)}
      className="genre-filter"
    >
      {genres.map((genre) => (
        <option key={genre} value={genre}>
          {genre}
        </option>
      ))}
    </select>
  );
}

export default FilterBar;