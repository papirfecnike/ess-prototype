import type { SelectableListItem } from "../list/SelectableList";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./dropdown-menu.css";

type MenuItemIntent = "default" | "danger";

type MenuItem = Omit<SelectableListItem, "label"> & {
  label: string;
  intent?: MenuItemIntent;
};

type Props = {
  open: boolean;
  anchorRef: React.RefObject<HTMLElement>;
  items: MenuItem[];
  onClose: () => void;
  onSelect: (id: string) => void;
};

type Position = {
  top: number;
  left: number;
};

export function DropdownMenu({
  open,
  anchorRef,
  items,
  onClose,
  onSelect,
}: Props) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position | null>(null);

  /* =========================
     POSITION CALCULATION
     ========================= */

  useLayoutEffect(() => {
    if (!open || !anchorRef.current || !menuRef.current) return;

    const anchorRect = anchorRef.current.getBoundingClientRect();
    const menuRect = menuRef.current.getBoundingClientRect();

    let top = anchorRect.top;
    let left = anchorRect.right - menuRect.width;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (left + menuRect.width > viewportWidth) {
      left = viewportWidth - menuRect.width - 8;
    }
    if (left < 8) {
      left = 8;
    }
    if (top + menuRect.height > viewportHeight - 8) {
      top = Math.max(8, viewportHeight - menuRect.height - 8);
    }

    setPosition({ top, left });
  }, [open, anchorRef]);

  /* =========================
     CLICK OUTSIDE / ESC
     ========================= */

  useEffect(() => {
    if (!open) return;

    function handleClick(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose, anchorRef]);

  if (!open) return null;

  return (
    <div
      ref={menuRef}
      className="dropdown-menu"
      style={{
        position: "fixed",
        top: position?.top,
        left: position?.left,
      }}
      role="menu"
    >
      <div className="dropdown-menu__surface">
        {items.map((item, index) => {
          const hasDivider = item.intent === "danger" && items[index - 1]?.intent !== "danger";

          return (
            <button
              key={item.id}
              type="button"
              className={[
                "dropdown-menu__item",
                item.intent === "danger" ? "dropdown-menu__item--danger" : "",
              ].join(" ")}
              disabled={item.disabled}
              role="menuitem"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => {
                if (item.disabled) return;
                onSelect(item.id);
                onClose();
              }}
            >
              {hasDivider && <span className="dropdown-menu__divider" />}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
