import { NavLink, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export default function ClientHeader() {
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();

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
        <div className="text-field">
          <input
            type="search"
            placeholder="Search"
            className="text-field__input"
          />
        </div>

        <button
          className="btn--primary btn--m"
          onClick={() => navigate("/profile")}
        >
          Profile
        </button>
      </div>
    </header>
  );
}
