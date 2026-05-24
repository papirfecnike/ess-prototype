import type { DataTableColumn, DataTableRow } from "./DataTableCore"

export type ColumnFilterValue = string | string[]
export type SortDirection = "asc" | "desc"
export type FilterOption = { value: string; label: string }
export type SortState = { columnKey: string; direction: SortDirection } | null

export function getColumnFilterType(column: DataTableColumn) {
  return column.filterType ?? "text"
}

export function getColumnFilterOptions(
  column: DataTableColumn,
  rows: DataTableRow[]
): FilterOption[] {
  if (column.filterOptions) {
    return column.filterOptions.map(option =>
      typeof option === "string" ? { value: option, label: option } : option
    )
  }

  return Array.from(
    new Set(
      rows
        .map(row => row[column.key])
        .filter((value): value is string | number => value !== undefined && value !== "")
        .map(value => String(value))
    )
  ).map(value => ({ value, label: value }))
}

export function normalizeDateValue(value: string | number) {
  const parsed = new Date(String(value))
  if (Number.isNaN(parsed.getTime())) return String(value).slice(0, 10)
  return parsed.toISOString().slice(0, 10)
}

export function hasFilterValue(value: ColumnFilterValue | undefined) {
  return Array.isArray(value) ? value.length > 0 : Boolean(value?.trim())
}

export function filterRows({
  rows,
  search,
  visibleColumns,
  columnFilters,
  filterableColumnKeys,
  columns,
}: {
  rows: DataTableRow[]
  search: string
  visibleColumns: DataTableColumn[]
  columnFilters: Record<string, ColumnFilterValue>
  filterableColumnKeys: Set<string>
  columns: DataTableColumn[]
}) {
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

  const activeColumnFilters = Object.entries(columnFilters).filter(
    ([columnKey, value]) => filterableColumnKeys.has(columnKey) && hasFilterValue(value)
  )

  if (activeColumnFilters.length === 0) return result

  return result.filter(row =>
    activeColumnFilters.every(([columnKey, value]) => {
      const column = columns.find(c => c.key === columnKey)
      if (!column) return true

      const cellValue = row[columnKey]
      if (cellValue === undefined) return false

      if (Array.isArray(value)) {
        const haystack = String(cellValue)
        return value.length === 0 || value.some(filterValue => haystack === filterValue || haystack.includes(filterValue))
      }

      if (getColumnFilterType(column) === "date") {
        return normalizeDateValue(String(cellValue)) === value
      }

      if (getColumnFilterType(column) === "time") {
        return String(cellValue).slice(0, 5) === value
      }

      return String(cellValue).toLowerCase().includes(value.trim().toLowerCase())
    })
  )
}

export function sortRows(rows: DataTableRow[], sortState: SortState) {
  if (!sortState) return rows

  return [...rows].sort((a, b) => {
    const aValue = a[sortState.columnKey]
    const bValue = b[sortState.columnKey]

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortState.direction === "asc" ? aValue - bValue : bValue - aValue
    }

    return sortState.direction === "asc"
      ? String(aValue ?? "").localeCompare(String(bValue ?? ""), undefined, { numeric: true, sensitivity: "base" })
      : String(bValue ?? "").localeCompare(String(aValue ?? ""), undefined, { numeric: true, sensitivity: "base" })
  })
}
