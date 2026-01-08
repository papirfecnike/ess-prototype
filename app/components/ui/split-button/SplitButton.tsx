import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/icon/Icon";

/* =========================
   TYPES
   ========================= */

type Item = {
  id: string;
  label: string;
};

type Props = {
  label: string;
  items: Item[];
  onChange?: (selectedIds: string[], active: boolean) => void;
};

/* =========================
   COMPONENT
   ========================= */

export function SplitButton({
  label,
  items,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  /* =========================
     DERIVED STATE
     ========================= */

  const allSelected = selectedIds.length === items.length;
  const partiallySelected =
    selectedIds.length > 0 && !allSelected;

  const primaryLabel = useMemo(() => {
    if (selectedIds.length === 0) return `${label}: none`;
    if (allSelected) return `${label}: all`;
    return `${label}: selected`;
  }, [label, selectedIds.length, allSelected]);

  /* =========================
     HANDLERS
     ========================= */

  function togglePrimary() {
    if (selectedIds.length === 0) return;

    const next = !active;
    setActive(next);
    onChange?.(selectedIds, next);
  }

  function toggleItem(id: string) {
    setSelectedIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((v) => v !== id)
        : [...prev, id];

      if (next.length === 0) {
        setActive(false);
        onChange?.([], false);
      } else {
        onChange?.(next, active);
      }

      return next;
    });
  }

  function toggleAll() {
    if (allSelected) {
      setSelectedIds([]);
      setActive(false);
      onChange?.([], false);
    } else {
      const all = items.map((i) => i.id);
      setSelectedIds(all);
      onChange?.(all, active);
    }
  }

  /* =========================
     RENDER
     ========================= */

  return (
    <div
      className={[
        "split-button",
        active ? "is-selected" : "",
      ].join(" ")}
    >
      {/* PRIMARY */}
      <button
        type="button"
        className={[
          "split-button__primary",
          active ? "is-selected" : "",
        ].join(" ")}
        onClick={togglePrimary}
      >
        {primaryLabel}
      </button>

      {/* TOGGLE */}
      <button
        type="button"
        className={[
          "split-button__toggle",
          active ? "is-selected" : "",
          open ? "is-open" : "",
        ].join(" ")}
        onClick={() => setOpen((v) => !v)}
        aria-label="Open options"
      >
        <Icon name="chevronDown" size="xs" />
      </button>

      {/* MENU */}
      {open && (
        <div className="split-button__menu">
          {/* ALL */}
          <label className="split-button__menu-item">
            <input
              type="checkbox"
              checked={allSelected}
              ref={(el) => {
                if (el) el.indeterminate = partiallySelected;
              }}
              onChange={toggleAll}
            />
            All
          </label>

          {/* ITEMS */}
          {items.map((item) => (
            <label
              key={item.id}
              className="split-button__menu-item"
            >
              <input
                type="checkbox"
                checked={selectedIds.includes(item.id)}
                onChange={() => toggleItem(item.id)}
              />
              {item.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
