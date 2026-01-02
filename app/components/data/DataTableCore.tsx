import "./data-table.css";
import { useState, useEffect } from "react";
import { DataTableHeader } from "./DataTableHeader";
import { DataTableFooter } from "./DataTableFooter";
import { Icon } from "../ui/icon/Icon";

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

type Pagination = {
  page: number;
  pageSize: number;
  total: number;
};

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
  /* =========================
     STATE
     ========================= */

  const [search, setSearch] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [sort, setSort] = useState<SortState>(null);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const visibleColumns = columns.filter((c) => !c.hidden);

  /* =========================
     SEARCH FILTER
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

  /* =========================
     RESET PAGE ON FILTER / SORT
     ========================= */

  useEffect(() => {
    setPage(1);
  }, [search, sort]);

  /* =========================
     SORTING
     ========================= */

  const sortedRows = sort
    ? [...filteredRows].sort((a, b) => {
        const av = a[sort.key];
        const bv = b[sort.key];
        if (av === bv) return 0;
        if (sort.direction === "asc") return av > bv ? 1 : -1;
        return av < bv ? 1 : -1;
      })
    : filteredRows;

  /* =========================
     PAGINATION
     ========================= */

  const total = sortedRows.length;

  const pagedRows = sortedRows.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const isPaginationDisabled = total <= pageSize;

  /* =========================
     SELECTION
     ========================= */

  const allRowIds = pagedRows.map((r) => String(r[rowIdKey]));
  const allSelected =
    selectable &&
    selectedRows.length > 0 &&
    selectedRows.length === allRowIds.length;

  const partiallySelected =
    selectable &&
    selectedRows.length > 0 &&
    !allSelected;

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

  const colSpan =
    visibleColumns.length +
    (selectable ? 1 : 0) +
    (expandable ? 1 : 0);

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
              {pagedRows.length === 0 && (
                <tr className="data-table__empty">
                  <td colSpan={colSpan}>
                    <div className="data-table__empty-content">
                      <Icon name="search" size="lg" color="muted" />
                      <div>No results found</div>
                    </div>
                  </td>
                </tr>
              )}

              {pagedRows.map((row) => {
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
                        <td key={col.key}>
                          {row[col.key]}
                        </td>
                      ))}
                    </tr>

                    {expandable && isExpanded && renderExpandedRow && (
                      <tr className="data-table__expanded-row">
                        <td colSpan={colSpan}>
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

        <DataTableFooter
          pagination={{
            page,
            pageSize,
            total,
          }}
          disabled={isPaginationDisabled}
          onPageChange={setPage}
          onExport={() => console.log("export")}
        />
      </div>
    </div>
  );
}
