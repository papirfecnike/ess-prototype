import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSearch } from "../search/SearchContext";

export default function SearchResultsPanel() {
  const { results, clear, query } = useSearch();
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState<number>(-1);

  // Reset selection when query or results change
  useEffect(() => {
    setActiveIndex(-1);
  }, [query, results]);

  // Keyboard handling
  useEffect(() => {
    if (!query || results.length === 0) return;

    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((i) =>
            i < results.length - 1 ? i + 1 : 0
          );
          break;

        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((i) =>
            i > 0 ? i - 1 : results.length - 1
          );
          break;

        case "Enter":
          if (activeIndex >= 0) {
            e.preventDefault();
            navigate(results[activeIndex].route);
            clear();
          }
          break;

        case "Escape":
          clear();
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [query, results, activeIndex, navigate, clear]);

  if (!query) return null;

  return (
    <div className="search-results">
      {results.length === 0 && (
        <div className="search-empty">No results</div>
      )}

      {results.map((result, index) => (
        <button
          key={result.id}
          className={`search-result ${
            index === activeIndex ? "active" : ""
          }`}
          onMouseEnter={() => setActiveIndex(index)}
          onClick={() => {
            navigate(result.route);
            clear();
          }}
        >
          <strong>{result.title}</strong>
          {result.description && <span>{result.description}</span>}
        </button>
      ))}
    </div>
  );
}
