// DataTableCore.tsx
import "./data-table.css";
import { useState } from "react";
import { DataTableHeader } from "./DataTableHeader";
import { DataTableFooter } from "./DataTableFooter";
import { Icon } from "../ui/icon/Icon";

/* =========================
   TYPES
   ========================= */

export type DataTableColumn = {
  key: string;
  label?: string;
  type?: "default" | "selection" | "expander";
  sortable?: boolean;
  align?: "left" | "center" | "right";
  width?: number | string;
  hidden?: boolean;
  renderCell?: (value: unknown, row: DataTableRow) => React.ReactNode;
};

export type DataTableRow = Record<string, string | number>;

type Pagination = {
  page: number;
  pageSize: number;
  total: number;
};

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

  pagination?: Pagination;
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
  pagination,
}: Props) {
  const [sort, setSort] = useState<SortState>(null);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const visibleColumns = columns.filter((c) => !c.hidden);

  /* =========================
     SORTING
     ========================= */

  const sortedRows = sort
    ? [...rows].sort((a, b) => {
        const av = a[sort.key];
        const bv = b[sort.key];
        if (av === bv) return 0;
        if (sort.direction === "asc") return av > bv ? 1 : -1;
        return av < bv ? 1 : -1;
      })
    : rows;

  /* =========================
     SELECTION
     ========================= */

  const allRowIds = rows.map((r) => String(r[rowIdKey]));
  const allSelected = selectedRows.length === allRowIds.length;
  const partiallySelected =
    selectedRows.length > 0 && !allSelected;

  function toggleAll() {
    if (!onSelectionChange) return;
    onSelectionChange(allSelected ? [] : allRowIds);
  }

  function toggleRow(id: string) {
    if (!onSelectionChange) return;
    onSelectionChange(
      selectedRows.includes(id)
        ? selectedRows.filter((x) => x !== id)
        : [...selectedRows, id]
    );
  }

  function toggleExpand(id: string) {
    setExpandedRows((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  }

  /* =========================
     RENDER
     ========================= */

  return (
    <div className="data-table-card">
      <div className="data-table">
        <DataTableHeader />

        <div className="data-table__header-row">
          <table>
            <thead>
              <tr>
                {selectable && (
                  <th style={{ width: 48 }}>
                    <input
                      type="checkbox"
                      checked={allSelected}
                      ref={(el) => {
                        if (el)
                          el.indeterminate = partiallySelected;
                      }}
                      onChange={toggleAll}
                    />
                  </th>
                )}

                {expandable && <th style={{ width: 48 }} />}

                {visibleColumns.map((col) => (
                  <th
                    key={col.key}
                    style={{ textAlign: col.align, width: col.width }}
                    onClick={() => {
                      if (!col.sortable) return;
                      setSort((prev) =>
                        !prev || prev.key !== col.key
                          ? { key: col.key, direction: "asc" }
                          : prev.direction === "asc"
                          ? { key: col.key, direction: "desc" }
                          : null
                      );
                    }}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {sortedRows.map((row) => {
                const id = String(row[rowIdKey]);
                const isExpanded = expandedRows.includes(id);

                return (
                  <>
                    <tr key={id}>
                      {selectable && (
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(id)}
                            onChange={() => toggleRow(id)}
                          />
                        </td>
                      )}

                      {expandable && (
                        <td>
                          <button
                            type="button"
                            className="btn--ghost"
                            onClick={() => toggleExpand(id)}
                          >
                            <Icon
                              name="chevronDown"
                              size="sm"
                              className={[
                                "data-table__chevron",
                                isExpanded ? "is-open" : "",
                              ].join(" ")}
                            />
                          </button>
                        </td>
                      )}

                      {visibleColumns.map((col) => (
                        <td
                          key={col.key}
                          style={{ textAlign: col.align }}
                        >
                          {col.renderCell
                            ? col.renderCell(row[col.key], row)
                            : row[col.key]}
                        </td>
                      ))}
                    </tr>

                    {expandable && isExpanded && renderExpandedRow && (
                      <tr className="data-table__expanded-row">
                        <td
                          colSpan={
                            visibleColumns.length +
                            (selectable ? 1 : 0) +
                            1
                          }
                        >
                          {renderExpandedRow(row)}
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>

        {pagination && (
          <DataTableFooter pagination={pagination} />
        )}
      </div>
    </div>
  );
}
