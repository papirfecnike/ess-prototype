import type { InputHTMLAttributes, ReactNode } from "react";

type Props = {
  label?: string;
  icon?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export function TextField({
  label,
  id,
  icon,
  ...rest
}: Props) {
  const inputId = id ?? (label ? label.replace(/\s+/g, "-").toLowerCase() : undefined);

  return (
    <div className="text-field-wrapper">
      {label && (
        <label htmlFor={inputId} className="text-field__label">
          {label}
        </label>
      )}

      <div className="text-field">
        {icon && <span className="text-field__icon">{icon}</span>}
        <input
          id={inputId}
          className="text-field__input"
          {...rest}
        />
      </div>
    </div>
  );
}
