import "./data-table.css";
import { useState, useEffect, useRef } from "react";
import { DataTableHeader } from "./DataTableHeader";
import { DataTableFooter } from "./DataTableFooter";
import { Icon } from "../ui/icon/Icon";
import { DropdownMenu } from "../ui/menu/DropdownMenu";
import type { SelectableListItem } from "../ui/list/SelectableList";

/* =========================
   TYPES
   ========================= */

export type DataTableColumn = {
  key: string;
  label?: string;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  width?: number | string;
  hidden?: boolean;
  renderCell?: (value: unknown, row: DataTableRow) => React.ReactNode;
};

export type DataTableRow = Record<string, string | number>;

type SortState = {
  key: string;
  direction: "asc" | "desc";
} | null;

type Props = {
  columns: DataTableColumn[];
  rows: DataTableRow[];
  rowIdKey: string;

  selectable?: boolean;
  expandable?: boolean;

  selectedRows?: string[];
  onSelectionChange?: (ids: string[]) => void;

  renderExpandedRow?: (row: DataTableRow) => React.ReactNode;
};

/* =========================
   COMPONENT
   ========================= */

export function DataTableCore({
  columns,
  rows,
  rowIdKey,
  selectable,
  expandable,
  selectedRows = [],
  onSelectionChange,
  renderExpandedRow,
}: Props) {
  const [search, setSearch] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [sort, setSort] = useState<SortState>(null);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const [page, setPage] = useState(1);
  const pageSize = 10;

  /* ===== CONTEXT MENU STATE ===== */

  const [openMenuRow, setOpenMenuRow] = useState<string | null>(null);
  const menuAnchorRef = useRef<HTMLElement | null>(null);

  const visibleColumns = columns.filter((c) => !c.hidden);

  /* =========================
     FILTER + SORT
     ========================= */

  const filteredRows = rows.filter((row) => {
    if (!search) return true;
    const q = search.toLowerCase();

    return visibleColumns.some((col) => {
      const value = row[col.key];
      return (
        value !== undefined &&
        String(value).toLowerCase().includes(q)
      );
    });
  });

  useEffect(() => {
    setPage(1);
  }, [search, sort]);

  const sortedRows = sort
    ? [...filteredRows].sort((a, b) => {
        const av = a[sort.key];
        const bv = b[sort.key];
        if (av === bv) return 0;
        if (sort.direction === "asc") return av > bv ? 1 : -1;
        return av < bv ? 1 : -1;
      })
    : filteredRows;

  const pagedRows = sortedRows.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  /* =========================
     MENU ITEMS
     ========================= */

  const rowMenuItems: SelectableListItem[] = [
    { id: "edit", label: "Edit", checkboxState: "unchecked" },
    { id: "duplicate", label: "Duplicate", checkboxState: "unchecked" },
    { id: "delete", label: "Delete", checkboxState: "unchecked" },
  ];

  const colSpan =
    visibleColumns.length +
    (selectable ? 1 : 0) +
    (expandable ? 1 : 0) +
    1;

  /* =========================
     RENDER
     ========================= */

  return (
    <div className="data-table-card">
      <div className="data-table">
        <DataTableHeader
          searchValue={search}
          onSearchChange={setSearch}
          showDetails={showDetails}
          onToggleDetails={setShowDetails}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters((v) => !v)}
        />

        {/* 🔹 HEADER WRAPPER VISSZAÁLLÍTVA */}
        <div className="data-table__header-row">
          <table>
            <thead>
              <tr>
                {selectable && <th />}
                {expandable && <th />}
                {visibleColumns.map((c) => (
                  <th key={c.key}>{c.label}</th>
                ))}
                <th />
              </tr>
            </thead>

            <tbody>
              {pagedRows.map((row) => {
                const id = String(row[rowIdKey]);
                const isMenuOpen = openMenuRow === id;

                return (
                  <tr key={id}>
                    {selectable && (
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(id)}
                          onChange={() =>
                            onSelectionChange?.(
                              selectedRows.includes(id)
                                ? selectedRows.filter((x) => x !== id)
                                : [...selectedRows, id]
                            )
                          }
                        />
                      </td>
                    )}

                    {expandable && (
                      <td>
                        <button
                          type="button"
                          className="btn--ghost"
                          onClick={() =>
                            setExpandedRows((prev) =>
                              prev.includes(id)
                                ? prev.filter((x) => x !== id)
                                : [...prev, id]
                            )
                          }
                        >
                          <Icon name="chevronDown" size="sm" />
                        </button>
                      </td>
                    )}

                    {visibleColumns.map((col) => (
                      <td key={col.key}>
                        {col.renderCell
                          ? col.renderCell(row[col.key], row)
                          : row[col.key]}
                      </td>
                    ))}

                    {/* CONTEXT MENU BUTTON */}
                    <td>
                      <button
                        type="button"
                        className="btn--ghost"
                        aria-label="More actions"
                        onClick={(e) => {
                          if (isMenuOpen) {
                            setOpenMenuRow(null);
                            menuAnchorRef.current = null;
                          } else {
                            setOpenMenuRow(id);
                            menuAnchorRef.current =
                              e.currentTarget;
                          }
                        }}
                      >
                        <Icon
                          name={isMenuOpen ? "closeStroke" : "moreVert"}
                          size="sm"
                        />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <DropdownMenu
          open={!!openMenuRow}
          anchorRef={menuAnchorRef}
          items={rowMenuItems}
          onClose={() => {
            setOpenMenuRow(null);
            menuAnchorRef.current = null;
          }}
          onSelect={(actionId) => {
            console.log(
              "row:",
              openMenuRow,
              "action:",
              actionId
            );
          }}
        />

        <DataTableFooter
          pagination={{ page, pageSize, total: sortedRows.length }}
          disabled={sortedRows.length <= pageSize}
          onPageChange={setPage}
          onExport={() => console.log("export")}
        />
      </div>
    </div>
  );
}
