import "./data-table.css"

import { useState, useEffect, Fragment, useMemo } from "react"

import { DataTableHeader } from "./DataTableHeader"
import { DataTableFooter } from "./DataTableFooter"

import { Icon } from "../ui/icon/Icon"
import { Checkbox } from "../ui/checkbox/Checkbox"

import { CustomizeColumnsModal } from "@/components/data/CustomizeColumnsModal"
import type { ColumnConfig } from "./CustomizeColumnsModal"
import type { HeaderVariant } from "./DataTableHeader"

import { TextField } from "@/components/ui/input/TextField"
import { Button } from "@/components/ui/button/Button"
import { Select } from "@/components/ui/select/Select"
import { Chip } from "@/components/ui/chip/Chip"
import { Tag } from "@/components/ui/tag/Tag"
import { Dialog } from "@/components/ui/dialog/Dialog"
import { RadioButton } from "@/components/ui/radiobutton/RadioButton"

/* =========================
   TYPES
========================= */

export type DataTableColumn = {
  key: string
  label?: string
  sortable?: boolean
  align?: "left" | "center" | "right"
  width?: number | string
  hidden?: boolean
  renderCell?: (value: unknown, row: DataTableRow) => React.ReactNode
}

export type DataTableRow = Record<string, string | number>

type FilterOperator = "equals" | "contains" | "gt" | "lt"

type Filter = {
  column: string
  operator: FilterOperator
  value: string
}

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

  renderExpandedRow?: (row: DataTableRow) => React.ReactNode

  headerVariant?: HeaderVariant

  detailsContent?: React.ReactNode
  batchActions?: React.ReactNode

  tableTitle?: string
  headerActions?: React.ReactNode
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
  headerVariant = "statusSplit",
  detailsContent,
  batchActions,
  tableTitle,
  headerActions,
}: Props) {

  const [search, setSearch] = useState("")
  const [showDetails, setShowDetails] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [showInspectionDialog, setShowInspectionDialog] = useState(false)
  const [inspectionMode, setInspectionMode] = useState<"existing" | "new" | null>(null)
  const [existingOpen, setExistingOpen] = useState(true)

  const [filters, setFilters] = useState<Filter[]>([
    { column: columns[0]?.key ?? "", operator: "equals", value: "" }
  ])

  const [appliedFilters, setAppliedFilters] = useState<Filter[]>([])
  const [page, setPage] = useState(1)
  const pageSize = 10
  const [showCustomizeColumns, setShowCustomizeColumns] = useState(false)

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

  const [columnConfig, setColumnConfig] = useState<ColumnConfig[]>(() =>
    columns.map(c => ({
      key: c.key,
      label: c.label ?? c.key,
      visible: !c.hidden,
      locked: false
    }))
  )

  useEffect(() => {
    setColumnConfig(
      columns.map(c => ({
        key: c.key,
        label: c.label ?? c.key,
        visible: !c.hidden,
        locked: false
      }))
    )
  }, [columns])

  const visibleColumns = useMemo(
    () => columns.filter(col =>
      columnConfig.find(cfg => cfg.key === col.key && cfg.visible)
    ),
    [columns, columnConfig]
  )

  function applyFilters(rows: DataTableRow[]) {
    return rows.filter(row =>
      appliedFilters.every(filter => {
        const value = row[filter.column]
        if (filter.operator === "equals") return String(value) === filter.value
        if (filter.operator === "contains") return String(value).toLowerCase().includes(filter.value.toLowerCase())
        if (filter.operator === "gt") return Number(value) > Number(filter.value)
        if (filter.operator === "lt") return Number(value) < Number(filter.value)
        return true
      })
    )
  }

  const filteredRows = useMemo(() => {
    let result = rows
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(row =>
        visibleColumns.some(col => {
          const value = row[col.key]
          return value !== undefined && String(value).toLowerCase().includes(q)
        })
      )
    }
    result = applyFilters(result)
    return result
  }, [rows, search, appliedFilters, visibleColumns])

  const pagedRows = filteredRows.slice(
    (page - 1) * pageSize,
    page * pageSize
  )

  const defaultBatchActions = (
    <>
      <Button
        size="sm"
        variant="secondary"
        onClick={() => {
          setInspectionMode(null)
          setExistingOpen(true)
          setShowInspectionDialog(true)
        }}
      >
        Inspection
      </Button>
      <Button size="sm" variant="ghost">Schedule</Button>
      <Button size="sm" variant="ghost" intent="danger">Delete</Button>
    </>
  )

  return (
    <>
      <div className="data-table-card">
        <div className="data-table">

          <DataTableHeader
            variant={tableTitle ? "titled" : headerVariant}
            searchValue={search}
            onSearchChange={setSearch}
            showDetails={showDetails}
            onToggleDetails={setShowDetails}
            showFilters={showFilters}
            onToggleFilters={() => setShowFilters(v => !v)}
            detailsContent={detailsContent}
            title={tableTitle}
            headerActions={headerActions}
          />

          {/* FILTER PANEL */}
          {showFilters && !tableTitle && (
            <div className="data-table_filter">
              {filters.map((filter, index) => (
                <div key={index} className="data-table__filter-row">
                  <Select
                    label="Column"
                    variant="single"
                    value={filter.column}
                    onChange={(v) => {
                      const copy = [...filters]
                      copy[index].column = v ?? ""
                      setFilters(copy)
                    }}
                    options={columns.map(c => ({ value: c.key, label: c.label ?? c.key }))}
                  />
                  <Select
                    label="Operator"
                    variant="single"
                    value={filter.operator}
                    onChange={(v) => {
                      const copy = [...filters]
                      copy[index].operator = (v ?? "equals") as FilterOperator
                      setFilters(copy)
                    }}
                    options={[
                      { value: "equals", label: "Equals" },
                      { value: "contains", label: "Contains" },
                      { value: "gt", label: ">" },
                      { value: "lt", label: "<" }
                    ]}
                  />
                  <TextField
                    label="Value"
                    value={filter.value}
                    onChange={(e) => {
                      const copy = [...filters]
                      copy[index].value = e.target.value
                      setFilters(copy)
                    }}
                  />
                  <Button
                    variant="icon"
                    intent="danger"
                    size="sm"
                    onClick={() => {
                      const newFilters = filters.filter((_, i) => i !== index)
                      if (newFilters.length === 0) {
                        newFilters.push({ column: columns[0]?.key ?? "", operator: "equals", value: "" })
                      }
                      setFilters(newFilters)
                    }}
                  >
                    <Icon name="delete" size="sm" />
                  </Button>
                </div>
              ))}

              <div className="data-table__filter-add">
                <Button
                  size="sm"
                  variant="ghost"
                  leadingIcon="add"
                  onClick={() =>
                    setFilters([...filters, { column: columns[0]?.key ?? "", operator: "equals", value: "" }])
                  }
                >
                  Add filter
                </Button>
              </div>

              <div className="data-table__filter-actions">
                <Button size="sm" variant="ghost" onClick={() => setShowCustomizeColumns(true)}>
                  Customize columns
                </Button>
                <div style={{ display: "flex", gap: "var(--space-2)" }}>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setAppliedFilters([])
                      setFilters([{ column: columns[0]?.key ?? "", operator: "equals", value: "" }])
                    }}
                  >
                    Cancel filters
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => setAppliedFilters([...filters])}>
                    Apply filters
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* BATCH ACTIONS */}
          {selectedRows.length > 0 && (
            <div className="data-table_container">
              <div className="data-table__selection-count">
                {selectedRows.length} items selected
              </div>
              <div className="data-table_container-actions">
                {batchActions ? batchActions : defaultBatchActions}
              </div>
            </div>
          )}

          {/* TABLE */}
          <div className="data-table__header-row">
            <table>
              <thead>
                <tr>
                  {selectable && <th style={{ width: 40 }} />}
                  {visibleColumns.map(c => (
                    <th key={c.key}>{c.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pagedRows.map(row => {
                  const id = String(row[rowIdKey])
                  const isSelected = selectedRows.includes(id)
                  return (
                    <Fragment key={id}>
                      <tr>
                        {selectable && (
                          <td>
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
                          <td key={col.key}>
                            {col.renderCell ? col.renderCell(row[col.key], row) : row[col.key]}
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
      </div>

      {/* START INSPECTION DIALOG */}
      {showInspectionDialog && (
        <Dialog
          isOpen
          title="Start inspection"
          footerLeft={
            <Button variant="ghost" onClick={() => setShowInspectionDialog(false)}>
              Cancel
            </Button>
          }
          footerRight={
            <Button
              variant="primary"
              disabled={!inspectionMode}
              onClick={() => {
                setShowInspectionDialog(false)
                setInspectionMode(null)
              }}
            >
              Start
            </Button>
          }
        >
          <div className="start-inspection-dialog__info">
            <Icon name="info" />
            <span>
              You have selected compartments that are connected to an existing task group.
              All the connected tasks will be delivered to the port if you proceed.
            </span>
          </div>

          <div className="start-inspection-dialog__block">
            <span className="start-inspection-dialog__title">
              Select existing task group:
            </span>
            <div className="start-inspection-dialog__option-row">
              <RadioButton checked={inspectionMode === "existing"} />
              <div className="start-inspection-dialog__task">
                <div
                  className="start-inspection-dialog__task-header"
                  onClick={() => {
                    setInspectionMode("existing")
                    setExistingOpen(o => !o)
                  }}
                >
                  <Tag label="INV-0000004" variant="outlined" />
                  <span className="start-inspection-dialog__task-count">
                    ({selectedRowData.length} compartments)
                  </span>
                  <Icon name={existingOpen ? "chevronUpStroke" : "chevronDownStroke"} />
                </div>

                {existingOpen && (
                  <div className="start-inspection-dialog__table-wrapper">
                    <table className="start-inspection-dialog__table">
                      <thead>
                        <tr>
                          <th>Bin</th>
                          <th>Comp.</th>
                          <th>SKU</th>
                          <th>Item</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedRowData.map((row, i) => (
                          <tr key={i}>
                            <td>{row.bin}</td>
                            <td>{row.compartment}</td>
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
          </div>

          <div className="start-inspection-dialog__divider">OR</div>

          <div className="start-inspection-dialog__block">
            <span className="start-inspection-dialog__title">
              Create a new inspection from the selected compartments:
            </span>
            <div
              className="start-inspection-dialog__option-row"
              onClick={() => setInspectionMode("new")}
            >
              <RadioButton checked={inspectionMode === "new"} />
              <div className="start-inspection-dialog__container">
                <div className="start-inspection-dialog__new">
                  <span>Compartments</span>
                  <span className="start-inspection-dialog__count">
                    {selectedRowData.length} compartments
                  </span>
                </div>
                <div className="start-inspection-dialog__row">
                  <span>Bins to be delivered</span>
                  <div className="start-inspection-dialog__chips">
                    {inspectionBins.map(bin => (
                      <Chip key={bin}>{bin}</Chip>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      )}

      {/* CUSTOMIZE COLUMNS */}
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
    </>
  )
}