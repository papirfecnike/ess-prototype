import type { InputHTMLAttributes } from "react";
import "./toggle.css";

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  title: string;
  description?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange">;

export function Toggle({
  checked,
  onChange,
  title,
  description,
  ...rest
}: Props) {
  return (
    <label className="ui-toggle">
      <div className="ui-toggle__content">
        <div className="ui-toggle__text">
          <div className="ui-toggle__title">
            {title}
          </div>

          {description && (
            <div className="ui-toggle__description">
              {description}
            </div>
          )}
        </div>

        <div className="ui-toggle__control">
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
        </div>
      </div>
    </label>
  );
}
