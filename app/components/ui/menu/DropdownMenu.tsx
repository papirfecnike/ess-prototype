import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { SelectableList } from "../list/SelectableList";
import type { SelectableListItem } from "../list/SelectableList";
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

    let top = anchorRect.bottom + 4;
    let left = anchorRect.left;

    const viewportWidth = window.innerWidth;
    if (left + menuRect.width > viewportWidth) {
      left = viewportWidth - menuRect.width - 8;
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

  const mappedItems = items.map((item) => ({
    id: item.id,
    label: item.label,
    disabled: item.disabled,
    "data-intent": item.intent,
  })) as unknown as SelectableListItem[];

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
        <SelectableList
          variant="default"
          items={mappedItems}
          onItemClick={(id) => {
            onSelect(id);
            onClose();
          }}
        />
      </div>
    </div>
  );
}
