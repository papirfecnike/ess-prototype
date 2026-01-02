import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { Icon } from "../icon/Icon";

export type SelectOption = {
  value: string;
  label: string;
};

type SelectSize = "md" | "sm";

type Props = {
  label: string;
  size: SelectSize;
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
    function handleClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick as any);
    return () =>
      document.removeEventListener("mousedown", handleClick as any);
  }, []);

  /* =========================
     HELPERS – ALL LOGIC
     ========================= */

  const hasAllOption = options.some(o => o.value === "all");
  const selectableOptions = options.filter(o => o.value !== "all");

  const isAllSelected =
    hasAllOption &&
    value.length === selectableOptions.length &&
    selectableOptions.length > 0;

  const isIndeterminate =
    hasAllOption &&
    value.length > 0 &&
    value.length < selectableOptions.length;

  function toggleOption(option: SelectOption) {
    if (option.value === "all") {
      if (isAllSelected || value.length > 0) {
        onChange([]);
      } else {
        onChange(selectableOptions.map(o => o.value));
      }
      return;
    }

    if (value.includes(option.value)) {
      onChange(value.filter(v => v !== option.value));
    } else {
      onChange([...value, option.value]);
    }
  }

  /* =========================
     SEARCH
     ========================= */

  const visibleOptions = options.filter(o =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  const hasResults = visibleOptions.length > 0;
  const hasValue = value.length > 0;

  /* =========================
     VALUE LABEL
     ========================= */

  function getValueLabel() {
    if (!hasValue) return "";

    if (isAllSelected) return "All";

    if (value.length === 1) {
      return options.find(o => o.value === value[0])?.label;
    }

    return `${value.length} selected`;
  }

  /* =========================
     RENDER
     ========================= */

  return (
    <div
      ref={containerRef}
      className={[
        "select",
        size === "sm" ? "select--sm" : "",
      ].join(" ")}
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
            hasValue ? "is-floating" : "",
          ].join(" ")}
        >
          {label}
        </span>

        <span className="select__value">
          {getValueLabel()}
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
          {/* SEARCH */}
          <input
            type="search"
            className="select__search"
            placeholder="Search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* OPTIONS */}
          <ul className="select__list">
            {/* EMPTY STATE */}
            {!hasResults && (
              <li className="select__empty">
                <Icon name="search" size="sm" color="muted" />
                <span>No results found</span>
              </li>
            )}

            {visibleOptions.map((option) => {
              const checked =
                option.value === "all"
                  ? isAllSelected
                  : value.includes(option.value);

              return (
                <li
                  key={option.value}
                  className="select__option"
                  onClick={() => toggleOption(option)}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    readOnly
                    ref={(el) => {
                      if (
                        el &&
                        option.value === "all" &&
                        isIndeterminate
                      ) {
                        el.indeterminate = true;
                      }
                    }}
                  />
                  <span>{option.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
