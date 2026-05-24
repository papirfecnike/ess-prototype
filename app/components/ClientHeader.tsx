import { NavLink, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.svg";
import { Icon } from "@/components/ui/icon/Icon";
import { GlobalSearch } from "../search/GlobalSearch";
import { Dialog } from "../components/ui/dialog/Dialog";
import { Button } from "../components/ui/button/Button";
import { RadioButton } from "../components/ui/radiobutton/RadioButton";
import { Tag } from "../components/ui/tag/Tag";




export default function ClientHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isPrototypeOpen, setIsPrototypeOpen] = useState(false);
  const [currentPort, setCurrentPort] = useState("Port 01");
  const [selectedPort, setSelectedPort] = useState("Port 01");
  const [showPortDialog, setShowPortDialog] = useState(false);
  const [showSwitchDialog, setShowSwitchDialog] = useState(false);
  const isOperationalRoute =
    location.pathname.startsWith("/inbound/putaway") ||
    location.pathname.startsWith("/outbound/picking");
  const navClass = (section: string) => ({ isActive }: { isActive: boolean }) =>
    isActive || location.pathname.startsWith(`/${section}`) ? "is-active" : "";
  const dashboardClass = ({ isActive }: { isActive: boolean }) =>
    isActive || location.pathname === "/" ? "is-active" : "";
  const ports = [
    { id: "Port 01", status: "Available" },
    { id: "Port 02", status: "Available" },
    { id: "Port 03", status: "Occupied" },
    { id: "Port 04", status: "Available" },
    { id: "Port 05", status: "Occupied" },
  ];

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
        <NavLink to="/dashboard" className={dashboardClass}>Dashboard</NavLink>
        <NavLink to="/insights" className={navClass("insights")}>Insights</NavLink>
        <span className="app-header__separator">|</span>
        <NavLink to="/inbound" className={navClass("inbound")}>Inbound</NavLink>
        <NavLink to="/outbound" className={navClass("outbound")}>Outbound</NavLink>
        <NavLink to="/inventory/inspection-table" className={navClass("inventory")}>Inventory</NavLink>
        <span className="app-header__separator">|</span>
        <NavLink to="/control-center/integration-logs" className={navClass("control-center")}>Control center</NavLink>
        <NavLink to="/configuration/prioritization" className={navClass("configuration")}>Configuration</NavLink>
      </nav>

      {/* RIGHT: ACTIONS */}
      <div className="app-header__actions">
        {isOperationalRoute && (
          <button
            className="btn btn--secondary btn--md app-header__port"
            onClick={() => {
              setSelectedPort(currentPort);
              setShowPortDialog(true);
            }}
          >
            <span>{currentPort}</span>
          </button>
        )}

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

    <Dialog
      isOpen={showPortDialog}
      intent="default"
      icon="sensorDoor"
      title="Select a port"
      footerLeft={<Button variant="ghost" onClick={() => setShowPortDialog(false)}>Cancel</Button>}
      footerRight={
        <Button
          variant="primary"
          disabled={selectedPort === currentPort || ports.find(port => port.id === selectedPort)?.status === "Occupied"}
          onClick={() => {
            setShowPortDialog(false);
            setShowSwitchDialog(true);
          }}
        >
          Select port
        </Button>
      }
    >
      <div className="port-dialog">
        <p>Choose the operational port for this session.</p>
        <div className="port-dialog__list">
          {ports.map(port => {
            const occupied = port.status === "Occupied";
            return (
              <button
                key={port.id}
                type="button"
                disabled={occupied}
                className="port-dialog__row"
                onClick={() => setSelectedPort(port.id)}
              >
                <RadioButton checked={selectedPort === port.id} disabled={occupied} />
                <strong>{port.id}</strong>
                <Tag label={port.status} variant={occupied ? "outlined" : "success"} />
              </button>
            );
          })}
        </div>
      </div>
    </Dialog>

    <Dialog
      isOpen={showSwitchDialog}
      intent="error"
      title="Switch port"
      footerLeft={<Button variant="ghost" onClick={() => setShowSwitchDialog(false)}>Cancel</Button>}
      footerRight={
        <Button
          variant="primary"
          onClick={() => {
            setCurrentPort(selectedPort);
            setShowSwitchDialog(false);
          }}
        >
          Confirm port switch
        </Button>
      }
    >
      <div className="port-dialog">
        <strong>Are you sure you want to switch to {selectedPort}?</strong>
        <span>Active operations might be affected.</span>
      </div>
    </Dialog>
      </>
    );
}
