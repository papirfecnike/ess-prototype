import type { ReactNode, MouseEvent } from "react";
import { Icon } from "../icon/Icon";
import "./chip.css";

type Props = {
  children: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
};

export function Chip({
  children,
  isActive = false,
  onClick,
  onRemove,
}: Props) {
  function handleRemove(e: MouseEvent) {
    e.stopPropagation();
    onRemove?.();
  }

  return (
    <div
      className={[
        "chip",
        isActive ? "chip--active" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
      role="button"
    >
      <span className="chip__label">{children}</span>

      {onRemove && (
        <button
          type="button"
          className="chip__remove"
          onClick={handleRemove}
          aria-label="Remove"
        >
          <Icon name="close" size="xs" />
        </button>
      )}
    </div>
  );
}
