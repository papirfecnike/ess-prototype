import { NavLink, useLocation } from "react-router";
import { sidebarConfig } from "../navigation/sidebar.config";

export default function Sidebar() {
  const location = useLocation();

  const mainSection = location.pathname.split("/")[1];

  const section = sidebarConfig.find(
    (s) => s.basePath === mainSection
  );

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
