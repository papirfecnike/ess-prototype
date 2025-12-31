import { useNavigate } from "react-router";
import { useSearch } from "../search/SearchContext";

export default function SearchResultsPanel() {
  const { results, clear, query } = useSearch();
  const navigate = useNavigate();

  if (!query) return null;

  return (
    <div className="search-results">
      {results.length === 0 && (
        <div className="search-empty">
          No results
        </div>
      )}

      {results.map((result) => (
        <button
          key={result.id}
          className="search-result"
          onClick={() => {
            navigate(result.route);
            clear();
          }}
        >
          <strong>{result.title}</strong>
          {result.description && (
            <span>{result.description}</span>
          )}
        </button>
      ))}
    </div>
  );
}
