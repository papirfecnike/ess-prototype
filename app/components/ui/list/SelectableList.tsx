import type { ReactNode } from "react";

export type SelectableListItem = {
  id: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
};

type Props = {
  items: SelectableListItem[];
  value: string[];
  onChange: (value: string[]) => void;
};

export function SelectableList({ items, value, onChange }: Props) {
  return (
    <ul className="selectable-list">
      {items.map((item) => (
        <li
          key={item.id}
          className={`list-item ${item.disabled ? "is-disabled" : ""}`}
          onClick={() =>
            !item.disabled &&
            onChange(
              value.includes(item.id)
                ? value.filter((v) => v !== item.id)
                : [...value, item.id]
            )
          }
        >
          <input
            type="checkbox"
            checked={value.includes(item.id)}
            disabled={item.disabled}
            readOnly
          />

          {item.icon && <span className="list-item__icon">{item.icon}</span>}
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
