import type { InputHTMLAttributes } from "react";
import "./toggle.css";

type Props = {
  label?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export function Toggle({
  label,
  checked,
  disabled,
  onChange,
  ...rest
}: Props) {
  return (
    <label
      className={[
        "ui-toggle",
        checked ? "is-checked" : "",
        disabled ? "is-disabled" : "",
      ].join(" ")}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
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
