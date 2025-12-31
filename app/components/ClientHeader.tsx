import { NavLink } from "react-router";

export default function ClientHeader() {
  return (
    <header>
      <nav>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/insights">Insights</NavLink>
        <NavLink to="/inbound">Inbound</NavLink>
        <NavLink to="/outbound">Outbound</NavLink>
        <NavLink to="/inventory">Inventory</NavLink>
        <NavLink to="/control-center">Control center</NavLink>
        <NavLink to="/configuration">Configuration</NavLink>
      </nav>

      <div style={{ display: "flex", gap: 12 }}>
        <input
          type="search"
          placeholder="Search"
          style={{
            padding: "6px 10px",
            borderRadius: 6,
            border: "1px solid var(--color-border)",
          }}
        />
        <button>Profile</button>
      </div>
    </header>
  );
}
