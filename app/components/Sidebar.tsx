import { NavLink, useLocation } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { sidebarConfig } from "../navigation/sidebar.config";
import { Icon } from "@/components/ui/icon/Icon";

const COLLAPSE_BREAKPOINT = 1080;

const PRODUCT_PAGES = [
  "/inbound/putaway-product",
  "/outbound/picking-product",
  "/inventory/inspection-product",
];

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const mainSection = location.pathname.split("/")[1];

  const section = sidebarConfig.find(
    (s) => s.basePath === mainSection
  );

  const isProductPage = useMemo(
    () => PRODUCT_PAGES.some((p) => location.pathname.startsWith(p)),
    [location.pathname]
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < COLLAPSE_BREAKPOINT) {
        setCollapsed(true);
      } else if (!isProductPage) {
        setCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isProductPage]);

  useEffect(() => {
    if (isProductPage) {
      setCollapsed(true);
    }
  }, [isProductPage]);

  if (!section) return null;

  return (
    <aside className={`sidebar ${collapsed ? "is-collapsed" : ""}`}>
      <div className="sidebar-toggle">
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          aria-label="Toggle sidebar"
        >
          <Icon
            name={collapsed ? "chevronRightStroke" : "chevronLeftStroke"}
            size="sm"
          />
        </button>
      </div>

      <ul className="sidebar-list">
        {section.items.map((item) => {
          const to = item.path
            ? `/${section.basePath}/${item.path}`
            : `/${section.basePath}`;

          return (
            <li key={to} className="sidebar-item">
              <NavLink
                to={to}
                end={!item.path}   // ✅ CSAK az Overview-nál exact match
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "is-active" : ""}`
                }
              >
                <span className="sidebar-icon">
                  <Icon
                    name={item.icon ?? "placeholder"}
                    size="sm"
                  />
                </span>

                {!collapsed && (
                  <span className="sidebar-label">
                    {item.label}
                  </span>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
