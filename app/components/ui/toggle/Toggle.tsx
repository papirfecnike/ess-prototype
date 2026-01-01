import type { InputHTMLAttributes } from "react";
import "./toggle.css";

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange">;

export function Toggle({
  checked,
  onChange,
  label,
  ...rest
}: Props) {
  return (
    <label className="ui-toggle">
      <input
        type="checkbox"
        className="ui-toggle__input"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        {...rest}
      />

      <span className="ui-toggle__track">
        <span className="ui-toggle__thumb" />
      </span>

      {label && (
        <span className="ui-toggle__label">
          {label}
        </span>
      )}
    </label>
  );
}
