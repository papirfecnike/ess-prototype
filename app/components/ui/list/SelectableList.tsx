import type { ReactNode } from "react";
import { Checkbox } from "../checkbox/Checkbox";
import { RadioButton } from "../radiobutton/Radiobutton";


export type CheckboxState = "checked" | "unchecked" | "indeterminate";

export type SelectableListItem = {
  id: string;
  label: string;
  checkboxState?: CheckboxState;
  icon?: ReactNode;
  disabled?: boolean;
};

type Variant = "checkbox" | "radio" | "default";

type Props = {
  items: SelectableListItem[];
  onItemClick: (id: string) => void;
  variant?: Variant;
};

export function SelectableList({
  items,
  onItemClick,
  variant = "checkbox",
}: Props) {
  return (
    <ul className="selectable-list" role="listbox">
      {items.map((item) => {
        const isChecked =
          item.checkboxState === "checked";

        return (
          <li
            key={item.id}
            className={`list-item ${item.disabled ? "is-disabled" : ""}`}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => !item.disabled && onItemClick(item.id)}
            role="option"
            aria-selected={isChecked}
          >
            {/* LEADING CONTROL */}
            {variant === "checkbox" && (
              <Checkbox
                state={item.checkboxState ?? "unchecked"}
                disabled={item.disabled}
              />
            )}

            {variant === "radio" && (
              <RadioButton
                checked={isChecked}
                disabled={item.disabled}
              />
            )}

            {/* OPTIONAL ICON */}
            {item.icon && (
              <span className="list-item__icon">
                {item.icon}
              </span>
            )}

            <span className="list-item__label">
              {item.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
