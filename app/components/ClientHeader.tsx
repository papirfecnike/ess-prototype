import { NavLink, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.svg";
import { Icon } from "@/components/ui/icon/Icon";

import { GlobalSearch } from "../search/GlobalSearch";
import { Dialog } from "../components/ui/dialog/Dialog";
import { Button } from "../components/ui/button/Button";

export default function ClientHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();
  const [isPrototypeOpen, setIsPrototypeOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
    <>
    <header className="app-header">
      <img
        src={logo}
        alt="Element Logic prototype"
        className="app-header__logo"
        onClick={() => setIsPrototypeOpen(true)}
        style={{ cursor: "pointer" }}
      />
      {/* LEFT: MAIN NAV */}
      <nav className="app-header__nav">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/insights">Insights</NavLink>
        <span className="app-header__separator">|</span>
        <NavLink to="/inbound">Inbound</NavLink>
        <NavLink to="/outbound">Outbound</NavLink>
        <NavLink to="/inventory">Inventory</NavLink>
        <span className="app-header__separator">|</span>
        <NavLink to="/control-center/warehouse-layout">Control center</NavLink>
        <NavLink to="/configuration">Configuration</NavLink>
      </nav>

      {/* RIGHT: ACTIONS */}
      <div className="app-header__actions">
        <button
            className="btn btn--secondary btn--md"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
          >
            <Icon name="search" size="md" />
            <span>Search</span>
          </button>

        <Button
          variant="icon"
          size="md"
          aria-label="Profile"
          onClick={() => navigate("/profile")}
        >
          <Icon name="profile" size="sm" />
        </Button>
      </div>
    </header>

    <GlobalSearch
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
    />

    {/* =========================
          PROTOTYPE DIALOG
          ========================= */}

      <Dialog
        isOpen={isPrototypeOpen}
        intent="warning"
        title="PROTOTYPE"
        footerRight={
          <Button
            variant="primary"
            onClick={() => setIsPrototypeOpen(false)}
          >
            OK
          </Button>
        }
      >
        <p>The purpose of this prototype is to demonstrate animations, component behavior and styling, minimal interactions and logical flows.</p>
        <p>Please note that some functions might not work, some features are not done yet. </p>
        <p>This prototype was not done by a professional developer, it might have some flaws. Handle this with care and love.</p>
      </Dialog>
      </>
    );
}
