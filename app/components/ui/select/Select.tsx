import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  searchable?: boolean;
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
type DropdownPlacement = "down" | "up";

export function Select({
  label,
  options,
  size = "md",
  variant = "single",
  searchable = true,
  value,
  onChange,
}: Props) {
  const isMulti = variant === "multi";

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
  const [dropdownPlacement, setDropdownPlacement] = useState<DropdownPlacement>("down");

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(e: PointerEvent) {
      const target = e.target as Node;
      const inContainer = containerRef.current?.contains(target);
      const inDropdown = dropdownRef.current?.contains(target);
      if (!inContainer && !inDropdown) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  useEffect(() => {
    if (!open || !containerRef.current) return;

    function updateDropdownPosition() {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const estimatedDropdownHeight = 288;
      const gap = 4;
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const placement: DropdownPlacement =
        spaceBelow < estimatedDropdownHeight && spaceAbove > spaceBelow
          ? "up"
          : "down";

      setDropdownPlacement(placement);
      setDropdownPos({
        top:
          placement === "up"
            ? rect.top + window.scrollY - gap
            : rect.bottom + window.scrollY + gap,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }

    updateDropdownPosition();
    window.addEventListener("resize", updateDropdownPosition);
    window.addEventListener("scroll", updateDropdownPosition, true);

    return () => {
      window.removeEventListener("resize", updateDropdownPosition);
      window.removeEventListener("scroll", updateDropdownPosition, true);
    };
  }, [open]);

  const selectedValues: string[] = isMulti
    ? (value as string[])
    : value ? [value as string] : [];

  const selectedCount = selectedValues.length;

  const selectableOptions = isMulti ? options.filter(o => o.value !== "all") : [];
  const allCount = selectableOptions.length;

  const allState: CheckboxState =
    selectedCount === 0 ? "unchecked"
    : selectedCount === allCount ? "checked"
    : "indeterminate";

  function handleItemClick(id: string) {
    if (isMulti) {
      if (id === "all") {
        (onChange as MultiSelectProps["onChange"])(
          selectedCount === allCount ? [] : selectableOptions.map(o => o.value)
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

  const visibleOptions = searchable
    ? options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  const listItems = visibleOptions.map(option => {
    const isAll = option.value === "all";
    const checkboxState: CheckboxState = isMulti
      ? isAll ? allState : selectedValues.includes(option.value) ? "checked" : "unchecked"
      : "unchecked";
    return { id: option.value, label: option.label, checkboxState };
  });

  const firstSelected = options.find(o => o.value === selectedValues[0]);
  const hasLabel = Boolean(label);

  return (
    <>
      <div
        ref={containerRef}
        className={[
          "select",
          size === "sm" ? "select--sm" : "",
          variant === "single" ? "select--single" : "",
          hasLabel ? "select--has-label" : "",
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
                        selectedValues.filter(v => v !== firstSelected.value)
                      )
                    }
                  >
                    {firstSelected.label}
                  </Chip>
                )}
                {selectedCount > 1 && <span>+{selectedCount - 1} more</span>}
              </div>
            ) : (
              firstSelected?.label ?? ""
            )}
          </span>

          <Icon
            name="chevronDownStroke"
            size="sm"
            className={["select__chevron", open ? "is-open" : ""].join(" ")}
          />
        </button>
      </div>

      {open &&
        createPortal(
          <div
            ref={dropdownRef}
            className={[
              "select__dropdown",
              dropdownPlacement === "up" ? "select__dropdown--up" : "",
            ].join(" ")}
            style={{
              position: "absolute",
              top: dropdownPos.top,
              left: dropdownPos.left,
              width: dropdownPos.width,
              zIndex: 9999,
            }}
          >
            {searchable && (
              <input
                type="search"
                className="select__search"
                placeholder="Search…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            )}

            <div className="select__list-wrapper">
              {isMulti ? (
                <SelectableList items={listItems} onItemClick={handleItemClick} />
              ) : (
                <ul className="select__single-list">
                  {visibleOptions.map(option => (
                    <li key={option.value}>
                      <button
                        type="button"
                        className="select__single-item"
                        onClick={() => handleItemClick(option.value)}
                      >
                        {option.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
