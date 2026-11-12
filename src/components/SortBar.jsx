function SortBar({ sortBy, setSortBy }) {
  return (
    <select
      value={sortBy}
      onChange={(event) => setSortBy(event.target.value)}
      className="sort-filter"
    >
      <option value="default">Default Order</option>
      <option value="rating-high">Highest Rating</option>
      <option value="rating-low">Lowest Rating</option>
      <option value="year-new">Newest First</option>
      <option value="year-old">Oldest First</option>
      <option value="title">Alphabetical (A-Z)</option>
    </select>
  );
}

export default SortBar;