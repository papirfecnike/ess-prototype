import { NavLink } from "react-router";

export default function ClientHeader() {
  return (
    <header className="app-header">
      <nav className="app-header__nav">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/insights">Insights</NavLink>
        <NavLink to="/inbound">Inbound</NavLink>
        <NavLink to="/outbound">Outbound</NavLink>
        <NavLink to="/inventory">Inventory</NavLink>
        <NavLink to="/control-center">Control center</NavLink>
        <NavLink to="/configuration">Configuration</NavLink>
      </nav>

      <div className="app-header__actions">
        <div className="text-field">
          <input
            type="search"
            placeholder="Search"
            className="text-field__input"
          />
        </div>

        <button>Profile</button>
      </div>
    </header>
  );
}
