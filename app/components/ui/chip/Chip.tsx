import type { ReactNode, MouseEvent } from "react";
import { Icon } from "../icon/Icon";
import "./chip.css";

type Props = {
  children: ReactNode;
  onRemove?: () => void;
};

export function Chip({ children, onRemove }: Props) {
  function handleRemove(e: MouseEvent) {
    e.stopPropagation();
    onRemove?.();
  }

  return (
    <div className="chip">
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
