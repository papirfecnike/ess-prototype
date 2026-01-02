import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, MouseEvent } from "react";
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
    return () => document.removeEventListener("mousedown", handleClick as any);
  }, []);

  /* =========================
     HELPERS
     ========================= */

  const isAllSelected =
    value.length === options.length - 1 &&
    options.some((o) => o.value === "all");

  const isIndeterminate =
    value.length > 0 &&
    value.length < options.length - 1 &&
    options.some((o) => o.value === "all");

  function toggleOption(option: SelectOption) {
    if (option.value === "all") {
      if (isAllSelected || value.length > 0) {
        onChange([]);
      } else {
        onChange(options.filter(o => o.value !== "all").map(o => o.value));
      }
      return;
    }

    if (value.includes(option.value)) {
      onChange(value.filter(v => v !== option.value));
    } else {
      onChange([...value, option.value]);
    }
  }

  const visibleOptions = options.filter(o =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  const hasValue = value.length > 0;

  /* =========================
     RENDER
     ========================= */

  return (
      <div
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
          {hasValue
            ? isAllSelected
              ? "All"
              : value.length === 1
              ? options.find(o => o.value === value[0])?.label
              : `${value.length} selected`
            : ""}
        </span>

        <Icon
          name="chevron"
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
