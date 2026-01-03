import { useEffect, useRef, useState } from "react";
import { Icon } from "../icon/Icon";
import { Chip } from "../chip/Chip";
import { SelectableList } from "../list/SelectableList";
import type { CheckboxState } from "../list/SelectableList";

export type SelectOption = {
  value: string;
  label: string;
};

type SelectSize = "md" | "sm";

type Props = {
  label: string;
  size?: SelectSize;
  options: SelectOption[];
  value: string[];
  multiple?: boolean;
  onChange: (value: string[]) => void;
};

export function Select({
  label,
  options,
  value,
  multiple = false,
  size = "md",
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  /* =========================
     CLICK OUTSIDE
     ========================= */

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () =>
      document.removeEventListener("click", handleClickOutside);
  }, []);

  /* =========================
     ALL / STATE LOGIC
     ========================= */

  const selectableOptions = options.filter(o => o.value !== "all");
  const selectedValues = value.filter(v => v !== "all");

  const allCount = selectableOptions.length;
  const selectedCount = selectedValues.length;

  const allState: CheckboxState =
    selectedCount === 0
      ? "unchecked"
      : selectedCount === allCount
      ? "checked"
      : "indeterminate";

  function handleItemClick(id: string) {
    if (id === "all") {
      onChange(
        selectedCount === allCount
          ? []
          : selectableOptions.map(o => o.value)
      );
      return;
    }

    onChange(
      selectedValues.includes(id)
        ? selectedValues.filter(v => v !== id)
        : [...selectedValues, id]
    );
  }

  /* =========================
     SEARCH + LIST ITEMS
     ========================= */

  const visibleOptions = options.filter(o =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  const listItems = visibleOptions.map(option => {
    const isAll = option.value === "all";

    const checkboxState: CheckboxState = isAll
      ? allState
      : selectedValues.includes(option.value)
      ? "checked"
      : "unchecked";

    return {
      id: option.value,
      label: option.label,
      checkboxState,
    };
  });

  /* =========================
     TRIGGER VALUE
     ========================= */

  const firstSelected = options.find(
    o => o.value === selectedValues[0]
  );

  /* =========================
     RENDER
     ========================= */

  return (
    <div
      ref={containerRef}
      className={["select", size === "sm" ? "select--sm" : ""].join(" ")}
    >
      {/* TRIGGER */}
      <button
        type="button"
        className="select__trigger"
        onClick={() => setOpen(v => !v)}
      >
        <span
          className={[
            "select__label",
            selectedCount > 0 ? "is-floating" : "",
          ].join(" ")}
        >
          {label}
        </span>

        <span className="select__value">
          {multiple && selectedCount > 0 ? (
            <div className="select__chips">
              {firstSelected && (
                <Chip
                  onRemove={() =>
                    onChange(
                      selectedValues.filter(
                        v => v !== firstSelected.value
                      )
                    )
                  }
                >
                  {firstSelected.label}
                </Chip>
              )}

              {selectedCount > 1 && (
                <span className="select__more">
                  +{selectedCount - 1} more
                </span>
              )}
            </div>
          ) : (
            firstSelected?.label ?? ""
          )}
        </span>

        <Icon
          name="chevronDown"
          size="xs"
          className={[
            "select__chevron",
            open ? "is-open" : "",
          ].join(" ")}
        />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="select__dropdown">
          <input
            type="search"
            className="select__search"
            placeholder="Search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="select__list-wrapper">
            <SelectableList
              items={listItems}
              onItemClick={handleItemClick}
            />
          </div>
        </div>
      )}
    </div>
  );
}
