import { useSearch } from "../search/SearchContext";

export default function SearchInput() {
  const { query, setQuery } = useSearch();

  return (
    <input
      type="search"
      placeholder="Search…"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="search-input"
    />
  );
}
