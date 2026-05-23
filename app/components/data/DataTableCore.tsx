import "./data-table.css"

import { useEffect, useState, Fragment, useMemo, useRef } from "react"

import { DataTableHeader } from "./DataTableHeader"
import { DataTableFooter } from "./DataTableFooter"
import { CustomizeColumnsModal } from "@/components/data/CustomizeColumnsModal"
import type { ColumnConfig } from "./CustomizeColumnsModal"

import { Icon } from "../ui/icon/Icon"
import { Checkbox } from "../ui/checkbox/Checkbox"

import type { HeaderVariant } from "./DataTableHeader"

import { Button } from "@/components/ui/button/Button"
import { Chip } from "@/components/ui/chip/Chip"
import { Dialog } from "@/components/ui/dialog/Dialog"
import { RadioButton } from "@/components/ui/radiobutton/RadioButton"
import { TextField } from "@/components/ui/input/TextField"
import { Select } from "@/components/ui/select/Select"
import { Notification } from "@/components/ui/notification/Notification"

/* =========================
   TYPES
========================= */

export type DataTableColumn = {
  key: string
  label?: string
  sortable?: boolean
  filterable?: boolean
  filterType?: "text" | "multiSelect" | "date"
  align?: "left" | "center" | "right"
  width?: number | string
  minWidth?: number
  wrap?: boolean
  hidden?: boolean
  renderCell?: (value: unknown, row: DataTableRow) => React.ReactNode
}

export type DataTableRow = Record<string, string | number>
type ColumnFilterValue = string | string[]
type SortDirection = "asc" | "desc"

type InspectionRow = {
  bin: string
  compartment: string
  sku: string
  product: string
}

type Props = {
  columns: DataTableColumn[]
  rows: DataTableRow[]
  rowIdKey: string

  selectable?: boolean
  expandable?: boolean

  selectedRows?: string[]
  onSelectionChange?: (ids: string[]) => void
  expandedRows?: string[]
  onExpandChange?: (ids: string[]) => void

  renderExpandedRow?: (row: DataTableRow) => React.ReactNode

  headerVariant?: HeaderVariant

  detailsContent?: React.ReactNode
  batchActions?: React.ReactNode

  tableTitle?: string
  headerActions?: React.ReactNode
  headerLeftActions?: React.ReactNode
  onRowClick?: (row: DataTableRow) => void
  onScheduleSelected?: (ids: string[]) => void
  showCustomize?: boolean
  activeFiltersLabel?: string
  showHeader?: boolean
}

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
  expandedRows = [],
  onExpandChange,
  renderExpandedRow,
  headerVariant = "statusSplit",
  detailsContent,
  batchActions,
  tableTitle,
  headerActions,
  headerLeftActions,
  onRowClick,
  onScheduleSelected,
  showCustomize = true,
  activeFiltersLabel,
  showHeader = true,
}: Props) {

  const [search, setSearch] = useState("")
  const [showInspectionDialog, setShowInspectionDialog] = useState(false)
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)
  const [showScheduleSuccess, setShowScheduleSuccess] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showCustomizeColumns, setShowCustomizeColumns] = useState(false)
  const [activeFilterColumn, setActiveFilterColumn] = useState<string | null>(null)
  const [filterPopupPosition, setFilterPopupPosition] = useState({ top: 0, left: 0, width: 240 })
  const filterPopoverRef = useRef<HTMLDivElement>(null)
  const [inspectionMode, setInspectionMode] = useState<"existing" | "new" | null>(null)
  const [scheduleReasonCode, setScheduleReasonCode] = useState<string | null>(null)
  const [existingOpen, setExistingOpen] = useState(true)
  const [newOpen, setNewOpen] = useState(true)
  const [deletedIds, setDeletedIds] = useState<string[]>([])
  const [columnFilters, setColumnFilters] = useState<Record<string, ColumnFilterValue>>({})
  const [sortState, setSortState] = useState<{ columnKey: string; direction: SortDirection } | null>(null)
  const [bulkMenuPosition, setBulkMenuPosition] = useState<{ x: number; y: number } | null>(null)
  const [bulkMenuDragOffset, setBulkMenuDragOffset] = useState({ x: 0, y: 0 })
  const [isDraggingBulkMenu, setIsDraggingBulkMenu] = useState(false)
  const bulkMenuRef = useRef<HTMLDivElement>(null)

  const [page, setPage] = useState(1)
  const pageSize = 10
  void expandable
  void expandedRows
  void onExpandChange
  void renderExpandedRow
  void detailsContent
  void batchActions

  const [columnConfig, setColumnConfig] = useState<ColumnConfig[]>(() =>
    columns.map(c => ({
      key: c.key,
      label: c.label ?? c.key,
      visible: !c.hidden,
      locked: false,
    }))
  )

  useEffect(() => {
    setColumnConfig(currentConfig => {
      const configByKey = new Map(currentConfig.map(config => [config.key, config]))

      return columns.map(c => {
        const existing = configByKey.get(c.key)

        return {
          key: c.key,
          label: c.label ?? c.key,
          visible: existing?.visible ?? !c.hidden,
          locked: existing?.locked ?? false,
        }
      })
    })
  }, [columns])

  useEffect(() => {
    setPage(1)
  }, [search, columnFilters])

  useEffect(() => {
    if (!activeFilterColumn) return

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as HTMLElement
      if (filterPopoverRef.current?.contains(target)) return
      if (target.closest(".data-table__column-filter-button")) return

      setActiveFilterColumn(null)
    }

    document.addEventListener("pointerdown", handlePointerDown)
    return () => document.removeEventListener("pointerdown", handlePointerDown)
  }, [activeFilterColumn])

  const selectedRowData = useMemo<InspectionRow[]>(() => {
    const idSet = new Set(selectedRows)
    return rows
      .filter(r => idSet.has(String(r[rowIdKey])))
      .map(r => ({
        bin: String(r.bin ?? ""),
        compartment: String(r.compartment ?? ""),
        sku: String(r.sku ?? ""),
        product: String(r.product ?? "")
      }))
  }, [rows, selectedRows, rowIdKey])

  const inspectionBins = useMemo(() => {
    return Array.from(new Set(selectedRowData.map(r => r.bin)))
  }, [selectedRowData])

  const scheduleBinSummary = inspectionBins.length > 0 ? inspectionBins.join(", ") : "No bins selected"

  const goToInspectionProcess = () => {
    const firstRow = selectedRowData[0]
    setShowInspectionDialog(false)
    setInspectionMode(null)
    window.location.assign(`/inventory/inspection-product?id=${firstRow?.sku ?? ""}`)
  }

  const inspectionDialogRows = selectedRowData.length
    ? selectedRowData
    : [{ bin: "HU-00246095", sku: "WD750", product: "adidas Originals Shoes - Gazelle W - Half blue/Ftwwht/Cblack" }]

  const handleScheduleInspection = () => {
    onScheduleSelected?.(selectedRows)
    clearSelection()
    setShowScheduleDialog(false)
    setShowScheduleSuccess(true)
  }

  const visibleColumns = useMemo(
    () => columns.filter(col =>
      columnConfig.some(config => config.key === col.key && config.visible)
    ),
    [columns, columnConfig]
  )

  const availableRows = useMemo(() => {
    if (deletedIds.length === 0) return rows

    const deletedIdSet = new Set(deletedIds)
    return rows.filter(row => !deletedIdSet.has(String(row[rowIdKey])))
  }, [deletedIds, rows, rowIdKey])

  const filterableColumnKeys = useMemo(() => {
    return new Set(
      visibleColumns
        .filter(col => {
          if (col.filterable === false) return false
          if (col.filterable === true) return true
          return availableRows.some(row => typeof row[col.key] === "string")
        })
        .map(col => col.key)
    )
  }, [availableRows, visibleColumns])

  const getColumnFilterType = (column: DataTableColumn) => {
    if (column.filterType) return column.filterType
    return "text"
  }

  const getColumnFilterOptions = (columnKey: string) => {
    return Array.from(
      new Set(
        availableRows
          .map(row => row[columnKey])
          .filter((value): value is string | number => value !== undefined && value !== "")
          .map(value => String(value))
      )
    )
  }

  const normalizeDateValue = (value: string | number) => {
    const parsed = new Date(String(value))
    if (Number.isNaN(parsed.getTime())) return String(value).slice(0, 10)
    return parsed.toISOString().slice(0, 10)
  }

  const filteredRows = useMemo(() => {
    let result = availableRows

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(row =>
        visibleColumns.some(col => {
          const value = row[col.key]
          return value !== undefined && String(value).toLowerCase().includes(q)
        })
      )
    }

    const activeColumnFilters = Object.entries(columnFilters).filter(
      ([columnKey, value]) =>
        filterableColumnKeys.has(columnKey) &&
        (Array.isArray(value) ? value.length > 0 : value.trim())
    )

    if (activeColumnFilters.length > 0) {
      result = result.filter(row =>
        activeColumnFilters.every(([columnKey, value]) => {
          const column = columns.find(c => c.key === columnKey)
          if (!column) return true

          const cellValue = row[columnKey]
          if (cellValue === undefined) return false

          if (Array.isArray(value)) {
            return value.length === 0 || value.includes(String(cellValue))
          }

          if (getColumnFilterType(column) === "date") {
            return normalizeDateValue(cellValue) === value
          }

          return String(cellValue).toLowerCase().includes(value.trim().toLowerCase())
        })
      )
    }

    return result
  }, [availableRows, columnFilters, columns, filterableColumnKeys, search, visibleColumns])

  const sortedRows = useMemo(() => {
    if (!sortState) return filteredRows

    return [...filteredRows].sort((a, b) => {
      const aValue = a[sortState.columnKey]
      const bValue = b[sortState.columnKey]

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortState.direction === "asc" ? aValue - bValue : bValue - aValue
      }

      return sortState.direction === "asc"
        ? String(aValue ?? "").localeCompare(String(bValue ?? ""), undefined, { numeric: true, sensitivity: "base" })
        : String(bValue ?? "").localeCompare(String(aValue ?? ""), undefined, { numeric: true, sensitivity: "base" })
    })
  }, [filteredRows, sortState])

  const pagedRows = sortedRows.slice(
    (page - 1) * pageSize,
    page * pageSize
  )

  const clearSelection = () => {
    onSelectionChange?.([])
  }

  const handleDeleteSelectedRows = () => {
    setDeletedIds(ids => Array.from(new Set([...ids, ...selectedRows])))
    clearSelection()
    setShowDeleteDialog(false)
  }

  const handleBulkMenuPointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!bulkMenuRef.current) return

    const rect = bulkMenuRef.current.getBoundingClientRect()
    setBulkMenuPosition({ x: rect.left, y: rect.top })
    setBulkMenuDragOffset({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    })
    setIsDraggingBulkMenu(true)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handleBulkMenuPointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!isDraggingBulkMenu) return

    setBulkMenuPosition({
      x: event.clientX - bulkMenuDragOffset.x,
      y: event.clientY - bulkMenuDragOffset.y,
    })
  }

  const handleBulkMenuPointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
    setIsDraggingBulkMenu(false)
    event.currentTarget.releasePointerCapture(event.pointerId)
  }

  const openColumnFilter = (event: React.MouseEvent<HTMLButtonElement>, columnKey: string) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const width = Math.max(240, rect.width)
    const height = 220
    const gap = 6
    const top = rect.bottom + height + gap > window.innerHeight && rect.top > height
      ? rect.top + window.scrollY - height - gap
      : rect.bottom + window.scrollY + gap
    const left = Math.min(
      Math.max(rect.left + window.scrollX, window.scrollX + 8),
      window.scrollX + window.innerWidth - width - 8
    )

    setActiveFilterColumn(current => current === columnKey ? null : columnKey)
    setFilterPopupPosition({
      top,
      left,
      width,
    })
  }

  const toggleSort = (columnKey: string) => {
    setSortState(current => {
      if (current?.columnKey !== columnKey) return { columnKey, direction: "asc" }
      return { columnKey, direction: current.direction === "asc" ? "desc" : "asc" }
    })
  }

  const activeFilterColumnConfig = visibleColumns.find(col => col.key === activeFilterColumn)

  const totalConfiguredWidth = useMemo(() => {
    return visibleColumns.reduce((total, column) => {
      return total + (typeof column.width === "number" ? column.width : 120)
    }, selectable ? 48 : 0)
  }, [selectable, visibleColumns])

  const getColumnWidth = (column: DataTableColumn) => {
    if (typeof column.width !== "number") return column.width
    return `${(column.width / totalConfiguredWidth) * 100}%`
  }

  const getCellStyle = (column: DataTableColumn) => ({
    width: getColumnWidth(column),
    minWidth: column.minWidth,
    textAlign: column.align,
  })

  const hasColumnFilterValue = (columnKey: string) => {
    const value = columnFilters[columnKey]
    return Array.isArray(value) ? value.length > 0 : Boolean(value?.trim())
  }

  const activeFilterLabels = useMemo(() => {
    const labels: string[] = []

    if (search.trim()) {
      labels.push(`Search: ${search.trim()}`)
    }

    Object.entries(columnFilters).forEach(([columnKey, value]) => {
      const column = columns.find(c => c.key === columnKey)
      const label = column?.label ?? columnKey

      if (Array.isArray(value) && value.length > 0) {
        labels.push(`${label}: ${value.join(", ")}`)
      } else if (!Array.isArray(value) && value.trim()) {
        labels.push(`${label}: ${value}`)
      }
    })

    return labels
  }, [columnFilters, columns, search])

  const clearActiveFilters = () => {
    setSearch("")
    setColumnFilters({})
  }

  return (
    <>
      <div className="data-table-card">
        <div className="data-table">

          {showHeader && (
            <DataTableHeader
              variant={tableTitle ? "titled" : headerVariant}
              searchValue={search}
              onSearchChange={setSearch}
              headerActions={headerActions}
              headerLeftActions={headerLeftActions}
              onCustomizeColumns={showCustomize ? () => setShowCustomizeColumns(true) : undefined}
              activeFilters={activeFilterLabels}
              activeFiltersLabel={activeFiltersLabel}
              onClearActiveFilters={clearActiveFilters}
            />
          )}

          {/* TABLE */}
          <div className="data-table__header-row">
            <table style={{ minWidth: totalConfiguredWidth }}>
              <colgroup>
                {selectable && <col style={{ width: `${(48 / totalConfiguredWidth) * 100}%` }} />}
                {visibleColumns.map(col => (
                  <col key={col.key} style={{ width: getColumnWidth(col) }} />
                ))}
              </colgroup>
              <thead>
                <tr>
                  {selectable && <th className="data-table__checkbox-cell" style={{ width: 48 }} />}
                  {visibleColumns.map(c => (
                    <th
                      key={c.key}
                      className={`data-table__cell--${c.key}`}
                      style={getCellStyle(c)}
                      title={c.label ?? c.key}
                    >
                      <div className="data-table__column-header">
                        {c.sortable ? (
                          <button
                            type="button"
                            className={[
                              "data-table__column-sort-label",
                              sortState?.columnKey === c.key ? "is-active" : "",
                            ].join(" ")}
                            aria-label={`Sort ${c.label ?? c.key}`}
                            title={c.label ?? c.key}
                            onClick={() => toggleSort(c.key)}
                          >
                            {c.label}
                          </button>
                        ) : (
                          <span title={c.label ?? c.key}>{c.label}</span>
                        )}
                      {filterableColumnKeys.has(c.key) && (
                          <button
                            type="button"
                            className={[
                              "data-table__column-filter-button",
                              hasColumnFilterValue(c.key) ? "is-active" : "",
                              activeFilterColumn === c.key ? "is-open" : "",
                            ].join(" ")}
                            aria-label={`Filter ${c.label ?? c.key}`}
                            onClick={(event) => openColumnFilter(event, c.key)}
                          >
                            <Icon name="filter" size="sm" />
                          </button>
                      )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pagedRows.map(row => {
                  const id = String(row[rowIdKey])
                  const isSelected = selectedRows.includes(id)
                  return (
                    <Fragment key={id}>
                      <tr
                        className={onRowClick ? "data-table__row--clickable" : ""}
                        onClick={() => onRowClick?.(row)}
                      >
                        {selectable && (
                          <td className="data-table__checkbox-cell">
                            <Checkbox
                              state={isSelected ? "checked" : "unchecked"}
                              onClick={(e) => {
                                e.stopPropagation()
                                if (!onSelectionChange) return
                                onSelectionChange(
                                  isSelected
                                    ? selectedRows.filter(x => x !== id)
                                    : [...selectedRows, id]
                                )
                              }}
                            />
                          </td>
                        )}
                        {visibleColumns.map(col => (
                          <td
                            key={col.key}
                            className={[
                              `data-table__cell--${col.key}`,
                              col.wrap ? "data-table__cell--wrap" : "",
                            ].join(" ")}
                            style={getCellStyle(col)}
                          >
                            <span className={col.wrap ? "data-table__cell-content data-table__cell-content--wrap" : "data-table__cell-content"}>
                              {col.renderCell ? col.renderCell(row[col.key], row) : row[col.key]}
                            </span>
                          </td>
                        ))}
                      </tr>
                    </Fragment>
                  )
                })}
              </tbody>
            </table>
          </div>

          <DataTableFooter
            pagination={{ page, pageSize, total: filteredRows.length }}
            disabled={filteredRows.length <= pageSize}
            onPageChange={setPage}
            onExport={() => {}}
          />

        </div>

        {selectedRows.length > 0 && (
          <div
            ref={bulkMenuRef}
            className={[
              "data-table__bulk-menu",
              bulkMenuPosition ? "is-positioned" : "",
              isDraggingBulkMenu ? "is-dragging" : "",
            ].join(" ")}
            style={
              bulkMenuPosition
                ? { left: bulkMenuPosition.x, top: bulkMenuPosition.y }
                : undefined
            }
          >
            <button
              type="button"
              className="data-table__bulk-drag"
              aria-label="Move bulk actions"
              onPointerDown={handleBulkMenuPointerDown}
              onPointerMove={handleBulkMenuPointerMove}
              onPointerUp={handleBulkMenuPointerUp}
              onPointerCancel={handleBulkMenuPointerUp}
            >
              <Icon name="dragIndicator" size="sm" />
            </button>

            <Chip onRemove={clearSelection}>
              {selectedRows.length} selected
            </Chip>

            <div className="data-table__bulk-divider" />

            <Button
              size="sm"
              variant="ghost"
              leadingIcon="search"
              onClick={() => {
                setInspectionMode(null)
                setExistingOpen(true)
                setShowInspectionDialog(true)
              }}
            >
              Inspect
            </Button>

            <Button
              size="sm"
              variant="ghost"
              leadingIcon="clock"
              onClick={() => {
                setScheduleReasonCode(null)
                setShowScheduleDialog(true)
              }}
            >
              Schedule
            </Button>

            <div className="data-table__bulk-divider" />

            <Button
              size="sm"
              variant="ghost"
              intent="danger"
              leadingIcon="delete"
              onClick={() => setShowDeleteDialog(true)}
            >
              Delete
            </Button>
          </div>
        )}
      </div>

      {activeFilterColumn && activeFilterColumnConfig && (
        <div
          className="data-table__filter-popover"
          ref={filterPopoverRef}
          style={{
            top: filterPopupPosition.top,
            left: filterPopupPosition.left,
            width: filterPopupPosition.width,
          }}
        >
          {getColumnFilterType(activeFilterColumnConfig) === "multiSelect" ? (
            <div className="data-table__filter-options">
              {getColumnFilterOptions(activeFilterColumn).map(option => {
                const current = columnFilters[activeFilterColumn]
                const selected = Array.isArray(current) ? current : []
                const isChecked = selected.includes(option)

                return (
                  <button
                    key={option}
                    type="button"
                    className="data-table__filter-option"
                    onClick={() =>
                      setColumnFilters(filters => ({
                        ...filters,
                        [activeFilterColumn]: isChecked
                          ? selected.filter(value => value !== option)
                          : [...selected, option],
                      }))
                    }
                  >
                    <Checkbox state={isChecked ? "checked" : "unchecked"} />
                    <span>{option}</span>
                  </button>
                )
              })}
            </div>
          ) : getColumnFilterType(activeFilterColumnConfig) === "date" ? (
            <TextField
              type="date"
              label={activeFilterColumnConfig.label ?? activeFilterColumnConfig.key}
              value={typeof columnFilters[activeFilterColumn] === "string" ? columnFilters[activeFilterColumn] : ""}
              autoFocus
              onChange={(event) =>
                setColumnFilters(filters => ({
                  ...filters,
                  [activeFilterColumn]: event.target.value,
                }))
              }
            />
          ) : (
            <TextField
              type="search"
              label={`Filter ${activeFilterColumnConfig.label ?? activeFilterColumnConfig.key}`}
              value={typeof columnFilters[activeFilterColumn] === "string" ? columnFilters[activeFilterColumn] : ""}
              autoFocus
              onChange={(event) =>
                setColumnFilters(filters => ({
                  ...filters,
                  [activeFilterColumn]: event.target.value,
                }))
              }
            />
          )}
          <div className="data-table__filter-popover-actions">
            <Button
              size="sm"
              variant="ghost"
              onClick={() =>
                setColumnFilters(filters => ({
                  ...filters,
                  [activeFilterColumn]: getColumnFilterType(activeFilterColumnConfig) === "multiSelect" ? [] : "",
                }))
              }
            >
              Clear
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setActiveFilterColumn(null)}
            >
              Close
            </Button>
          </div>
        </div>
      )}

      {/* START INSPECTION DIALOG */}
      {showInspectionDialog && (
        <Dialog
          isOpen
          intent="inspection"
          title="Choose how to inspect"
          footerLeft={
            <Button variant="ghost" onClick={() => setShowInspectionDialog(false)}>
              Cancel
            </Button>
          }
          footerRight={
            <Button
              variant="primary"
              disabled={!inspectionMode}
              onClick={goToInspectionProcess}
            >
              Start inspection
            </Button>
          }
        >
          <div className="start-inspection-dialog">
            <div className="start-inspection-dialog__banner">
              Inspect this bin together with others or separately.
            </div>

            <div
              className="start-inspection-dialog__choice"
              onClick={() => setInspectionMode("existing")}
            >
              <div className="start-inspection-dialog__choice-header">
                <RadioButton checked={inspectionMode === "existing"} />
                <strong>Add to inspection INV-0000004</strong>
                <span>{selectedRowData.length || 1} bin{(selectedRowData.length || 1) === 1 ? "" : "s"}</span>
                <button
                  type="button"
                  aria-label="Toggle existing inspection rows"
                  onClick={(event) => {
                    event.stopPropagation()
                    setExistingOpen(open => !open)
                  }}
                >
                  <Icon name={existingOpen ? "chevronUpStroke" : "chevronDownStroke"} size="sm" />
                </button>
              </div>
              <p>This bin will be inspected together with the other bins.</p>

              {existingOpen && (
                <div className="start-inspection-dialog__table-wrapper">
                  <table className="start-inspection-dialog__table data-table__dialog-table">
                    <thead>
                      <tr>
                        <th>Bin</th>
                        <th>SKU</th>
                        <th>Item</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inspectionDialogRows.map((row, i) => (
                        <tr key={i}>
                          <td>{row.bin}</td>
                          <td>{row.sku}</td>
                          <td>{row.product}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="start-inspection-dialog__divider">OR</div>

            <div
              className="start-inspection-dialog__choice"
              onClick={() => setInspectionMode("new")}
            >
              <div className="start-inspection-dialog__choice-header">
                <RadioButton checked={inspectionMode === "new"} />
                <strong>Start a new inspection for this bin</strong>
                <span>{inspectionDialogRows.length} bin{inspectionDialogRows.length === 1 ? "" : "s"}</span>
                <button
                  type="button"
                  aria-label="Toggle new inspection rows"
                  onClick={(event) => {
                    event.stopPropagation()
                    setNewOpen(open => !open)
                  }}
                >
                  <Icon name={newOpen ? "chevronUpStroke" : "chevronDownStroke"} size="sm" />
                </button>
              </div>
              <p>This bin will be inspected separately from other bins.</p>

              {newOpen && (
                <div className="start-inspection-dialog__table-wrapper">
                  <table className="start-inspection-dialog__table data-table__dialog-table">
                    <thead>
                      <tr>
                        <th>Bin</th>
                        <th>SKU</th>
                        <th>Item</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inspectionDialogRows.map((row, i) => (
                        <tr key={i}>
                          <td>{row.bin}</td>
                          <td>{row.sku}</td>
                          <td>{row.product}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </Dialog>
      )}

      {showScheduleDialog && (
        <Dialog
          isOpen
          intent="schedule"
          title="Schedule inspection"
          footerLeft={
            <Button variant="ghost" onClick={() => setShowScheduleDialog(false)}>
              Cancel
            </Button>
          }
          footerRight={
            <Button
              variant="primary"
              onClick={handleScheduleInspection}
            >
              Schedule
            </Button>
          }
        >
          <div className="schedule-inspection-dialog">
            <div className="schedule-inspection-dialog__row">
              <strong>Selection</strong>
              <span>{selectedRowData.length} compartment{selectedRowData.length === 1 ? "" : "s"} in {inspectionBins.length} bin{inspectionBins.length === 1 ? "" : "s"}</span>
            </div>
            <div className="schedule-inspection-dialog__row">
              <strong>Bins included</strong>
              <span>{scheduleBinSummary}</span>
            </div>
            <Select
              label="Add a reason (optional)"
              variant="single"
              value={scheduleReasonCode}
              onChange={setScheduleReasonCode}
              options={[
                { value: "count_mismatch", label: "Count mismatch" },
                { value: "expired", label: "Expired" },
                { value: "missing", label: "Missing" },
                { value: "wrong_location", label: "Wrong compartment" },
                { value: "damaged", label: "Damaged" },
              ]}
            />
            <div className="schedule-inspection-dialog__info">
              <Icon name="info" size="sm" />
              <span>
                This inspection will be scheduled and prepared before starting.
                <br />
                <br />
                Status: Scheduled → Preparing → Prepared
              </span>
            </div>
          </div>
        </Dialog>
      )}

      {showDeleteDialog && (
        <Dialog
          isOpen
          intent="error"
          title="Delete selected items"
          footerLeft={
            <Button variant="ghost" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
          }
          footerRight={
            <Button
              variant="primary"
              intent="danger"
              onClick={handleDeleteSelectedRows}
            >
              Delete
            </Button>
          }
        >
          <p>
            Are you sure you want to delete {selectedRows.length} selected item{selectedRows.length === 1 ? "" : "s"}?
          </p>
        </Dialog>
      )}

      {showCustomizeColumns && (
        <CustomizeColumnsModal
          columns={columnConfig}
          onClose={() => setShowCustomizeColumns(false)}
          onSave={(cols) => {
            setColumnConfig(cols)
            setShowCustomizeColumns(false)
          }}
        />
      )}

      {showScheduleSuccess && (
        <Notification
          intent="success"
          title="Inspection scheduled"
          message="The selected items have been scheduled for inspection."
          onClose={() => setShowScheduleSuccess(false)}
        />
      )}

    </>
  )
}
