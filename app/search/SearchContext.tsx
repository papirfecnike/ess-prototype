import { createContext, useContext, useState, useEffect } from "react";
import type { SearchResult } from "./search.types";
import { searchIndex } from "./search.index";

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

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const filtered = searchIndex.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered);
  }, [query]);

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
