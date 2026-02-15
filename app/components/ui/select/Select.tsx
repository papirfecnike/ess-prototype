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
type SelectVariant = "single" | "multi";

type BaseProps = {
  label?: string;
  size?: SelectSize;
  options: SelectOption[];
  variant?: SelectVariant;
};

type SingleSelectProps = BaseProps & {
  variant?: "single";
  value: string | null;
  onChange: (value: string | null) => void;
};

type MultiSelectProps = BaseProps & {
  variant: "multi";
  value: string[];
  onChange: (value: string[]) => void;
};

type Props = SingleSelectProps | MultiSelectProps;

export function Select({
  label,
  options,
  size = "md",
  variant = "single",
  value,
  onChange,
}: Props) {
  const isMulti = variant === "multi";

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  /* CLICK OUTSIDE — FIXED */
  useEffect(() => {
    function handlePointerDown(e: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () =>
      document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const selectedValues: string[] = isMulti
    ? (value as string[])
    : value
    ? [value as string]
    : [];

  const selectedCount = selectedValues.length;

  const selectableOptions = isMulti
    ? options.filter(o => o.value !== "all")
    : [];

  const allCount = selectableOptions.length;

  const allState: CheckboxState =
    selectedCount === 0
      ? "unchecked"
      : selectedCount === allCount
      ? "checked"
      : "indeterminate";

  function handleItemClick(id: string) {
    if (isMulti) {
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

  const visibleOptions = options.filter(o =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  const listItems = visibleOptions.map(option => {
    const isAll = option.value === "all";

    const checkboxState: CheckboxState = isMulti
      ? isAll
        ? allState
        : selectedValues.includes(option.value)
        ? "checked"
        : "unchecked"
      : "unchecked";

    return {
      id: option.value,
      label: option.label,
      checkboxState,
    };
  });

  const firstSelected = options.find(
    o => o.value === selectedValues[0]
  );

  return (
    <div
      ref={containerRef}
      className={[
        "select",
        size === "sm" ? "select--sm" : "",
        variant === "single" ? "select--single" : "",
      ].join(" ")}
    >
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
          {isMulti && selectedCount > 0 ? (
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
                <span>
                  +{selectedCount - 1} more
                </span>
              )}
            </div>
          ) : (
            firstSelected?.label ?? ""
          )}
        </span>

        <Icon
          name="chevronDownStroke"
          size="sm"
          className={[
            "select__chevron",
            open ? "is-open" : "",
          ].join(" ")}
        />
      </button>

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
            {isMulti ? (
              <SelectableList
                items={listItems}
                onItemClick={handleItemClick}
              />
            ) : (
              <ul className="select__single-list">
                {visibleOptions.map(option => (
                  <li key={option.value}>
                    <button
                      type="button"
                      className="select__single-item"
                      onClick={() =>
                        handleItemClick(option.value)
                      }
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
