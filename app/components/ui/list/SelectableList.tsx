import type { ReactNode } from "react";
import { Checkbox } from "../checkbox/Checkbox";

export type CheckboxState = "checked" | "unchecked" | "indeterminate";

export type SelectableListItem = {
  id: string;
  label: string;
  checkboxState: CheckboxState;
  icon?: ReactNode;
  disabled?: boolean;
};

type Props = {
  items: SelectableListItem[];
  onItemClick: (id: string) => void;
};

export function SelectableList({ items, onItemClick }: Props) {
  return (
    <ul className="selectable-list" role="listbox">
      {items.map(item => (
        <li
          key={item.id}
          className={`list-item ${item.disabled ? "is-disabled" : ""}`}
          onMouseDown={e => e.preventDefault()}
          onClick={() => !item.disabled && onItemClick(item.id)}
          role="option"
          aria-selected={item.checkboxState === "checked"}
        >
          <Checkbox
            state={item.checkboxState}
            disabled={item.disabled}
          />

          {item.icon && (
            <span className="list-item__icon">{item.icon}</span>
          )}

          <span className="list-item__label">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
