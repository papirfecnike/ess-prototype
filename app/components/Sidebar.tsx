import { NavLink, useLocation } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { sidebarConfig } from "../navigation/sidebar.config";
import { Icon } from "@/components/ui/icon/Icon";
import type { SidebarItem } from "../navigation/sidebar.config";

const COLLAPSE_BREAKPOINT = 1080;

const PRODUCT_PAGES = [
  "/inbound/putaway-product",
  "/outbound/picking-product",
  "/inventory/inspection-product",
];

type SidebarItemNodeProps = {
  item: SidebarItem;
  basePath: string;
  collapsed: boolean;
  level?: number;
};

function SidebarItemNode({
  item,
  basePath,
  collapsed,
  level = 0,
}: SidebarItemNodeProps) {
  const hasChildren = !!item.children?.length;
  const [open, setOpen] = useState(false);

  const to = item.path
    ? `/${basePath}/${item.path}`
    : `/${basePath}`;

  const isChild = level > 0;

  return (
    <li
      className={`sidebar-item ${
        isChild ? "sidebar-item--child" : ""
      }`}
    >
      <div className="sidebar-item__content">
        {hasChildren ? (
          <button
            type="button"
            className="sidebar-link sidebar-link--parent"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {!isChild && (
              <span className="sidebar-icon">
                <Icon name={item.icon} size="sm" />
              </span>
            )}

            {!collapsed && (
              <span className="sidebar-label">
                {item.label}
              </span>
            )}

            {!collapsed && (
              <Icon
                name={
                  open
                    ? "chevronDownStroke"
                    : "chevronRightStroke"
                }
                size="md"
              />
            )}
          </button>
        ) : (
          <NavLink
            to={to}
            end={item.path === ""}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "is-active" : ""}`
            }
          >
            {!isChild && (
              <span className="sidebar-icon">
                <Icon name={item.icon} size="sm" />
              </span>
            )}

            {!collapsed && (
              <span className="sidebar-label">
                {item.label}
              </span>
            )}
          </NavLink>
        )}
      </div>

        {hasChildren && (
          <ul
            className={`sidebar-sublist ${
              open ? "is-open" : ""
            }`}
          >
          {item.children!.map((child) => (
            <SidebarItemNode
              key={`${basePath}/${item.path}/${child.path}`}
              item={child}
              basePath={`${basePath}/${item.path}`}
              collapsed={collapsed}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}


/* =========================
   SIDEBAR
   ========================= */

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
    return () =>
      window.removeEventListener("resize", handleResize);
  }, [isProductPage]);

  useEffect(() => {
    if (isProductPage) setCollapsed(true);
  }, [isProductPage]);

  if (!section) return null;

  return (
    <aside className={`sidebar ${collapsed ? "is-collapsed" : ""}`}>
      {/* TOGGLE */}
      <div className="sidebar-toggle">
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          aria-label="Toggle sidebar"
        >
          <Icon
            name={
              collapsed
                ? "chevronRightStroke"
                : "chevronLeftStroke"
            }
            size="sm"
          />
        </button>
      </div>

      {/* MAIN NAV */}
      <nav className="sidebar-nav">
        {section.groups ? (
          section.groups.map((group) => (
            <div key={group.title} className="sidebar-group">
              {!collapsed && (
                <div className="sidebar-group-title">
                  {group.title}
                </div>
              )}

              <ul className="sidebar-list">
                {group.items.map((item) => (
                  <SidebarItemNode
                    key={item.path}
                    item={item}
                    basePath={section.basePath}
                    collapsed={collapsed}
                  />
                ))}
              </ul>
            </div>
          ))
        ) : (
          <ul className="sidebar-list">
            {section.items?.map((item) => (
              <SidebarItemNode
                key={item.path}
                item={item}
                basePath={section.basePath}
                collapsed={collapsed}
              />
            ))}
          </ul>
        )}
      </nav>
    </aside>
  );
}
