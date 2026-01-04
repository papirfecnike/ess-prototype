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

/* =========================
   PROPS
   ========================= */

type BaseProps = {
  label?: string;
  size?: SelectSize;
  options: SelectOption[];
};

type MultiSelectProps = BaseProps & {
  multiple: true;
  value: string[];
  onChange: (value: string[]) => void;
};

type SingleSelectProps = BaseProps & {
  multiple?: false;
  value: string | null;
  onChange: (value: string | null) => void;
};

type Props = MultiSelectProps | SingleSelectProps;

export function Select({
  label,
  options,
  size = "md",
  multiple = false,
  value,
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
     NORMALIZED STATE
     ========================= */

    let selectedValues: string[];

        if (multiple) {
          selectedValues = value as string[];
        } else {
          selectedValues = value ? [value as string] : [];
        }


  /* =========================
     ALL / STATE LOGIC (MULTI)
     ========================= */

  const selectableOptions = options.filter(o => o.value !== "all");
  const allCount = selectableOptions.length;
  const selectedCount = selectedValues.length;

  const allState: CheckboxState =
    selectedCount === 0
      ? "unchecked"
      : selectedCount === allCount
      ? "checked"
      : "indeterminate";

  function handleItemClick(id: string) {
    if (multiple) {
      if (id === "all") {
        (onChange as MultiSelectProps["onChange"])(
          selectedCount === allCount
            ? []
            : selectableOptions.map(o => o.value)
        );
        return;
      }

      (onChange as MultiSelectProps["onChange"])(
        selectedValues.includes(id)
          ? selectedValues.filter(v => v !== id)
          : [...selectedValues, id]
      );
    } else {
      (onChange as SingleSelectProps["onChange"])(id);
      setOpen(false);
    }
  }

  /* =========================
     SEARCH + LIST ITEMS
     ========================= */

  const visibleOptions = options.filter(o =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  const listItems = visibleOptions.map(option => {
    const isAll = option.value === "all";

    const checkboxState: CheckboxState = !multiple
      ? selectedValues[0] === option.value
        ? "checked"
        : "unchecked"
      : isAll
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
        {label && (
          <span
            className={[
              "select__label",
              selectedCount > 0 ? "is-floating" : "",
            ].join(" ")}
          >
            {label}
          </span>
        )}

        <span className="select__value">
          {multiple && selectedCount > 0 ? (
            <div className="select__chips">
              {firstSelected && (
                <Chip
                  onRemove={() =>
                    (onChange as MultiSelectProps["onChange"])(
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
