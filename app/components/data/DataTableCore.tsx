import "./data-table.css";
import { useState, useEffect, useRef, Fragment, useMemo } from "react";
import { DataTableHeader } from "./DataTableHeader";
import { DataTableFooter } from "./DataTableFooter";
import { Icon } from "../ui/icon/Icon";
import { Checkbox } from "../ui/checkbox/Checkbox";
import { CustomizeColumnsModal } from "@/components/data/CustomizeColumnsModal";
import type { ColumnConfig } from "./CustomizeColumnsModal";
import type { HeaderVariant } from "./DataTableHeader";

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

  headerVariant?: HeaderVariant;
};

/* =========================
   STATUS MAP
   ========================= */

const STATUS_ID_TO_ROW_STATUS: Record<string, string> = {
  inprogress: "In progress",
  prepared: "Prepared",
  waiting: "Waiting",
  completed: "Completed",
};

/* =========================
   COMPONENT
   ========================= */

export function DataTableCore({
  columns,
  rows,
  rowIdKey,
  selectable = false,
  expandable = false,
  selectedRows = [],
  onSelectionChange,
  renderExpandedRow,
  headerVariant = "statusSplit",
}: Props) {
  const [search, setSearch] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [selectedStatusIds, setSelectedStatusIds] = useState<string[]>([]);

  const [sort, setSort] = useState<SortState>(null);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [showCustomizeColumns, setShowCustomizeColumns] =
    useState(false);

  /* =========================
     COLUMN CONFIG
     ========================= */

  const [columnConfig, setColumnConfig] = useState<ColumnConfig[]>(() =>
    columns.map((c) => ({
      key: c.key,
      label: c.label ?? c.key,
      visible: !c.hidden,
      locked: false,
    }))
  );

  useEffect(() => {
    setColumnConfig(
      columns.map((c) => ({
        key: c.key,
        label: c.label ?? c.key,
        visible: !c.hidden,
        locked: false,
      }))
    );
  }, [columns]);

  const visibleColumns = useMemo(
    () =>
      columns.filter((col) =>
        columnConfig.find(
          (cfg) => cfg.key === col.key && cfg.visible
        )
      ),
    [columns, columnConfig]
  );

  /* =========================
     FILTER + SORT (UPDATED)
     ========================= */

  const filteredRows = useMemo(() => {
    let result = rows;

    if (selectedStatusIds.length > 0) {
      const allowedStatuses = selectedStatusIds.map(
        (id) => STATUS_ID_TO_ROW_STATUS[id]
      );

      result = result.filter(
        (row) =>
          typeof row.status === "string" &&
          allowedStatuses.includes(row.status)
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((row) =>
        visibleColumns.some((col) => {
          const value = row[col.key];
          return (
            value !== undefined &&
            String(value).toLowerCase().includes(q)
          );
        })
      );
    }

    if (sort) {
      result = [...result].sort((a, b) => {
        const av = a[sort.key];
        const bv = b[sort.key];
        if (av === bv) return 0;
        if (sort.direction === "asc") return av > bv ? 1 : -1;
        return av < bv ? 1 : -1;
      });
    }

    return result;
  }, [rows, selectedStatusIds, search, sort, visibleColumns]);

  const pagedRows = filteredRows.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const colSpan =
    visibleColumns.length +
    (selectable ? 1 : 0) +
    (expandable ? 1 : 0);

  /* =========================
     RENDER
     ========================= */

  return (
    <>
      <div className="data-table-card">
        <div className="data-table">
          <DataTableHeader
            variant={headerVariant}
            searchValue={search}
            onSearchChange={setSearch}
            showDetails={showDetails}
            onToggleDetails={setShowDetails}
            showFilters={showFilters}
            onToggleFilters={() => setShowFilters((v) => !v)}
            onCustomizeColumns={() => setShowCustomizeColumns(true)}
            selectedStatusIds={selectedStatusIds}
            onStatusChange={setSelectedStatusIds}
          />

          <div className="data-table__header-row">
            <table>
              <thead>
                <tr>
                  {selectable && <th style={{ width: 40 }} />}
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
                      <tr>
                        {selectable && (
                          <td>
                            <Checkbox
                              state={
                                isSelected
                                  ? "checked"
                                  : "unchecked"
                              }
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!onSelectionChange) return;

                                onSelectionChange(
                                  isSelected
                                    ? selectedRows.filter(
                                        (x) => x !== id
                                      )
                                    : [...selectedRows, id]
                                );
                              }}
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
                                    ? prev.filter(
                                        (x) => x !== id
                                      )
                                    : [...prev, id]
                                )
                              }
                            >
                              <Icon
                                name="chevronDownStroke"
                                size="sm"
                              />
                            </button>
                          </td>
                        )}

                        {visibleColumns.map((col) => (
                          <td key={col.key}>
                            {col.renderCell
                              ? col.renderCell(
                                  row[col.key],
                                  row
                                )
                              : row[col.key]}
                          </td>
                        ))}
                      </tr>

                      {expandable &&
                        isExpanded &&
                        renderExpandedRow && (
                          <tr>
                            <td colSpan={colSpan}>
                              {renderExpandedRow(row)}
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
            pagination={{
              page,
              pageSize,
              total: filteredRows.length,
            }}
            disabled={filteredRows.length <= pageSize}
            onPageChange={setPage}
            onExport={() => {}}
          />
        </div>
      </div>

      {showCustomizeColumns && (
        <CustomizeColumnsModal
          columns={columnConfig}
          onClose={() => setShowCustomizeColumns(false)}
          onSave={(cols) => {
            setColumnConfig(cols);
            setShowCustomizeColumns(false);
          }}
        />
      )}
    </>
  );
}
