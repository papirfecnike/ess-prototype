import { NavLink } from "react-router";
import { useEffect, useState } from "react";
import SearchInput from "@/search/SearchInput";
import SearchResultsPanel from "@/search/SearchResultsPanel";

export default function ClientHeader() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDark(true);
      document.body.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <header className="app-header">
      {/* LEFT: MAIN NAV */}
      <nav className="app-header__nav">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/insights">Insights</NavLink>
        <NavLink to="/inbound">Inbound</NavLink>
        <NavLink to="/outbound">Outbound</NavLink>
        <NavLink to="/inventory">Inventory</NavLink>
        <NavLink to="/control-center">Control center</NavLink>
        <NavLink to="/configuration">Configuration</NavLink>
      </nav>

      {/* RIGHT: ACTIONS */}
      <div className="app-header__actions">
        <div className="search-container">
          <SearchInput />
          <SearchResultsPanel />
        </div>

        <button className="ui-button ui-button--secondary ui-button--sm">
          Profile
        </button>
      </div>
    </header>
  );
}
