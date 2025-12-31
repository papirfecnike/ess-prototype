import { createContext, useContext, useState, useEffect } from "react";
import type { SearchResult } from "./search.types";
import { mockSearchData } from "./search.mock";
import { useLocation } from "react-router";

type SearchContextType = {
  query: string;
  setQuery: (q: string) => void;
  results: SearchResult[];
  clear: () => void;
};

const SearchContext = createContext<SearchContextType | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const location = useLocation();

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const section = location.pathname.split("/")[1];

    const filtered = mockSearchData.filter(
      (item) =>
        item.section === section &&
        item.title.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered);
  }, [query, location.pathname]);

  const clear = () => {
    setQuery("");
    setResults([]);
  };

  return (
    <SearchContext.Provider
      value={{ query, setQuery, results, clear }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) {
    throw new Error("useSearch must be used within SearchProvider");
  }
  return ctx;
}
