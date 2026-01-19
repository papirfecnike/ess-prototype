import { useMemo, useState, useEffect } from "react";
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

  /** NEW – controlled support */
  selectedIds?: string[];
};

/* =========================
   COMPONENT
   ========================= */

export function SplitButton({
  label,
  items,
  onChange,
  selectedIds: controlledSelectedIds,
}: Props) {
  const isControlled = controlledSelectedIds !== undefined;

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [internalSelectedIds, setInternalSelectedIds] = useState<string[]>([]);

  const selectedIds = isControlled
    ? controlledSelectedIds
    : internalSelectedIds;

  /* =========================
     SYNC ACTIVE STATE
     ========================= */

  useEffect(() => {
    if (selectedIds.length === 0) {
      setActive(false);
    }
  }, [selectedIds]);

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

  function update(next: string[]) {
    if (!isControlled) {
      setInternalSelectedIds(next);
    }

    const nextActive = next.length > 0;
    setActive(nextActive);
    onChange?.(next, nextActive);
  }

  function togglePrimary() {
    if (selectedIds.length === 0) return;

    const next = !active;
    setActive(next);
    onChange?.(selectedIds, next);
  }

  function toggleItem(id: string) {
    const next = selectedIds.includes(id)
      ? selectedIds.filter((v) => v !== id)
      : [...selectedIds, id];

    update(next);
  }

  function toggleAll() {
    if (allSelected) {
      update([]);
    } else {
      update(items.map((i) => i.id));
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
