import "./toggle.css";
import type { HTMLAttributes } from "react";

type Props = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  title: string;
  description?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "onChange">;

export function Toggle({
  checked,
  onCheckedChange,
  title,
  description,
  ...rest
}: Props) {
  return (
    <div className="toggle" {...rest}>
      <div className="toggle__content">
        <div className="toggle__title">{title}</div>
        {description && (
          <div className="toggle__description">
            {description}
          </div>
        )}
      </div>

      <button
        type="button"
        className={[
          "toggle__switch",
          checked ? "is-checked" : "",
        ].join(" ")}
        onClick={() => onCheckedChange(!checked)}
      />
    </div>
  );
}
