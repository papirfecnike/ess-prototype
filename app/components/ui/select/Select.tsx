import {
  useEffect,
  useRef,
  useState,
} from "react";
import type { KeyboardEvent } from "react";

import { Icon } from "../icon/Icon";
import "./select.css";

/* =========================
   TYPES
   ========================= */

export type SelectOption = {
  value: string;
  label: string;
};

type Props = {
  label: string;
  options: SelectOption[];

  multiple?: boolean;

  value: string[];                 // ⬅️ KÖTELEZŐ
  onChange: (values: string[]) => void;

  helperText?: string;
  error?: string;
};

/* =========================
   COMPONENT
   ========================= */

export function Select({
  label,
  options,
  multiple = false,
  value,
  onChange,
  helperText,
  error,
}: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const rootRef = useRef<HTMLDivElement>(null);

  const selectedOptions = options.filter(o =>
    value.includes(o.value)
  );

  /* =========================
     OUTSIDE CLICK
     ========================= */

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        rootRef.current &&
        !rootRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setSearch("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggleValue(val: string) {
    if (multiple) {
      onChange(
        value.includes(val)
          ? value.filter(v => v !== val)
          : [...value, val]
      );
    } else {
      onChange([val]);
      setOpen(false);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") {
      setOpen(false);
      setSearch("");
    }
  }

  const filteredOptions = options.filter(o =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      ref={rootRef}
      className={[
        "select",
        open ? "is-open" : "",
        value.length ? "has-value" : "",
        error ? "has-error" : "",
      ].join(" ")}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* TRIGGER */}
      <div
        className="select__trigger"
        role="button"
        onClick={() => setOpen(o => !o)}
      >
        <span className="select__label">{label}</span>

        {/* MULTI CHIPS */}
        {multiple && selectedOptions.length > 0 && (
          <div className="select__chips">
            {selectedOptions.map(opt => (
              <span
                key={opt.value}
                className="select__chip"
                onClick={e => e.stopPropagation()}
              >
                {opt.label}
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    toggleValue(opt.value);
                  }}
                >
                  <Icon name="close" size="xs" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* SINGLE VALUE */}
        {!multiple && selectedOptions[0] && (
          <span className="select__value">
            {selectedOptions[0].label}
          </span>
        )}

        <span className="select__chevron">
          <Icon name="chevronDown" size="sm" />
        </span>
      </div>

      {/* DROPDOWN */}
      {open && (
        <div
          className="select__menu"
          onClick={e => e.stopPropagation()}
        >
          <div className="select__search">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search…"
            />
          </div>

          <ul className="select__options">
            {filteredOptions.map(opt => {
              const checked = value.includes(opt.value);
              return (
                <li
                  key={opt.value}
                  className={[
                    "select__option",
                    checked ? "is-selected" : "",
                  ].join(" ")}
                  onClick={() => toggleValue(opt.value)}
                >
                  {multiple && (
                    <input
                      type="checkbox"
                      checked={checked}
                      readOnly
                    />
                  )}
                  <span>{opt.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {error ? (
        <div className="select__error">{error}</div>
      ) : (
        helperText && (
          <div className="select__helper">{helperText}</div>
        )
      )}
    </div>
  );
}
