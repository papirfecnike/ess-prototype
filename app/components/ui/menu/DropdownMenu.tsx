import type { ReactNode } from "react";

type MenuItem = {
  id: string;
  label: string;
  icon?: ReactNode;
};

type Props = {
  items?: MenuItem[];   // ← opcionális
};

export function DropdownMenu({ items = [] }: Props) {
  if (items.length === 0) return null;

  return (
    <ul className="dropdown-menu">
      {items.map((item) => (
        <li key={item.id} className="dropdown-item">
          {item.icon && (
            <span className="dropdown-item__icon">
              {item.icon}
            </span>
          )}
          {item.label}
        </li>
      ))}
    </ul>
  );
}
