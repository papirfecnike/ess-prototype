import { NavLink } from "react-router";
import { useEffect, useState } from "react";
import SearchInput from "app/search/SearchInput";
import SearchResultsPanel from "app/search/SearchResultsPanel";


function Header() {
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
      <nav className="main-nav">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/insights">Insights</NavLink>
        <NavLink to="/inbound">Inbound</NavLink>
        <NavLink to="/outbound">Outbound</NavLink>
        <NavLink to="/inventory">Inventory</NavLink>
        <NavLink to="/control-center">Control center</NavLink>
        <NavLink to="/configuration">Configuration</NavLink>
      </nav>

      <div className="header-actions">
        <div className="search-container">
          <SearchInput />
          <SearchResultsPanel />
        </div>

        {/* Theme switch */}
        <label className="theme-switch">
          <input
            type="checkbox"
            checked={isDark}
            onChange={() => setIsDark(v => !v)}
          />
          <span />
        </label>
      </div>
    </header>
  );
}

export default Header;
