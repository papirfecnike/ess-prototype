import type { InputHTMLAttributes, ReactNode } from "react";
import { useId } from "react";
import "./text-field.css";

type Props = {
  label?: string;
  error?: string;
  leadingIcon?: ReactNode;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "placeholder">;

export function TextField({
  label,
  value,
  disabled,
  error,
  id,
  leadingIcon,
  ...rest
}: Props) {
  const inputId = id ?? useId();
  const hasValue = Boolean(value && String(value).length > 0);
  const hasIcon = Boolean(leadingIcon);

  return (
    <div
      className={[
        "text-field-wrapper",
        label ? "is-floating" : "is-legacy",
        hasValue ? "has-value" : "",
        disabled ? "is-disabled" : "",
        error ? "has-error" : "",
        hasIcon ? "has-leading-icon" : "",
      ].join(" ")}
    >
      <div className="text-field">
        {hasIcon && (
          <span className="text-field__icon">
            {leadingIcon}
          </span>
        )}

        <input
          id={inputId}
          className="text-field__input"
          value={value}
          disabled={disabled}
          {...rest}
        />

        {label && (
          <label
            htmlFor={inputId}
            className="text-field__floating-label"
          >
            {label}
          </label>
        )}
      </div>

      {error && (
        <div className="text-field__error">
          {error}
        </div>
      )}
    </div>
  );
}
