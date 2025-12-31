import { NavLink, useLocation } from "react-router";
import { sidebarConfig } from "../navigation/sidebar.config";

export default function Sidebar() {
  const location = useLocation();

  // /insights/productivity → ["", "insights", "productivity"]
  const mainSection = location.pathname.split("/")[1];

  const section = sidebarConfig.find(
    (s) => s.basePath === mainSection
  );

  // Dashboard vagy ismeretlen route → nincs sidebar
  if (!section) {
    return null;
  }

  return (
    <aside className="sidebar">
      <ul>
        {section.items.map((item) => {
          const to = item.path
            ? `/${section.basePath}/${item.path}`
            : `/${section.basePath}`;

          return (
            <li key={to}>
              <NavLink to={to}>
                {item.label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
