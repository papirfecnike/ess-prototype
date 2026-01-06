import "./data-table.css";
import { useState, useEffect, useRef, Fragment } from "react";
import { DataTableHeader } from "./DataTableHeader";
import { DataTableFooter } from "./DataTableFooter";
import { Icon } from "../ui/icon/Icon";
import { DropdownMenu } from "../ui/menu/DropdownMenu";
import { Checkbox } from "../ui/checkbox/Checkbox";
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
  selectable = false,
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

  const colSpan =
    visibleColumns.length +
    (selectable ? 1 : 0) +
    (expandable ? 1 : 0);

  const headerCheckboxState =
    selectedRows.length === 0
      ? "unchecked"
      : selectedRows.length === pagedRows.length
      ? "checked"
      : "indeterminate";

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

        <div className="data-table__header-row">
          <table>
            <thead>
              <tr>
                {selectable && (
                  <th style={{ width: 40 }}>
                    <Checkbox state={headerCheckboxState} />
                  </th>
                )}

                {expandable && <th style={{ width: 40 }} />}

                {visibleColumns.map((c) => (
                  <th key={c.key}>{c.label}</th>
                ))}
              </tr>
            </thead>

            <tbody>
  {pagedRows.map((row) => {
    const id = String(row[rowIdKey]);
    const isExpanded = expandedRows.includes(id);
    const isSelected = selectedRows.includes(id);

    return (
      <Fragment key={id}>
        {/* =========================
            MAIN ROW
            ========================= */}
        <tr
          className={
            isExpanded ? "data-table__row--expanded" : undefined
          }
        >
          {/* SELECTABLE */}
          {selectable && (
            <td style={{ width: 40 }}>
              <Checkbox
                state={isSelected ? "checked" : "unchecked"}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!onSelectionChange) return;

                  onSelectionChange(
                    isSelected
                      ? selectedRows.filter((x) => x !== id)
                      : [...selectedRows, id]
                  );
                }}
              />
            </td>
          )}

          {/* EXPANDABLE */}
          {expandable && (
            <td style={{ width: 40 }}>
              <button
                type="button"
                className="btn--ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedRows((prev) =>
                    prev.includes(id)
                      ? prev.filter((x) => x !== id)
                      : [...prev, id]
                  );
                }}
              >
                <Icon
                  name="chevronDownStroke"
                  size="sm"
                  className={`data-table__chevron ${
                    isExpanded ? "is-open" : ""
                  }`}
                />
              </button>
            </td>
          )}

          {/* DATA CELLS */}
          {visibleColumns.map((col) => (
            <td key={col.key}>
              {col.renderCell
                ? col.renderCell(row[col.key], row)
                : row[col.key]}
            </td>
          ))}
        </tr>

        {/* =========================
            EXPANDED ROW
            ========================= */}
        {expandable && isExpanded && renderExpandedRow && (
          <tr className="data-table__expanded-row">
            <td colSpan={colSpan}>
              <div className="data-table__expanded-inner">
                {renderExpandedRow(row)}
              </div>
            </td>
          </tr>
        )}
      </Fragment>
    );
  })}
</tbody>

          </table>
        </div>

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
