import type { ReactNode } from "react";

import {
  DataTableCore,
  type DataTableColumn,
  type DataTableRow,
} from "./DataTableCore";

import type { HeaderVariant } from "./DataTableHeader";

type Props = {
  columns: DataTableColumn[];
  rows: DataTableRow[];
  rowIdKey: string;

  selectedRows?: string[];
  onSelectionChange?: (ids: string[]) => void;

  headerVariant?: HeaderVariant;

  detailsContent?: ReactNode;
  batchActions?: ReactNode;
  tableTitle?: string;
  headerActions?: ReactNode;
  headerLeftActions?: ReactNode;
  onRowClick?: (row: DataTableRow) => void;
  onScheduleSelected?: (ids: string[], reasonCode?: string) => void;
  showCustomize?: boolean;
  activeFiltersLabel?: string;
  showActiveFilters?: boolean;
  showHeader?: boolean;
  selectable?: boolean;
};

export function SelectableDataTable({
  columns,
  rows,
  rowIdKey,
  selectedRows,
  onSelectionChange,
  headerVariant,
  detailsContent,
  batchActions,
  tableTitle,
  headerActions,
  headerLeftActions,
  onRowClick,
  onScheduleSelected,
  showCustomize,
  activeFiltersLabel,
  showActiveFilters,
  showHeader,
  selectable = true,
}: Props) {
  return (
    <DataTableCore
      columns={columns}
      rows={rows}
      rowIdKey={rowIdKey}
      selectedRows={selectedRows}
      onSelectionChange={onSelectionChange}
      headerVariant={headerVariant}
      detailsContent={detailsContent}
      batchActions={batchActions}
      tableTitle={tableTitle}
      headerActions={headerActions}
      headerLeftActions={headerLeftActions}
      onRowClick={onRowClick}
      onScheduleSelected={onScheduleSelected}
      showCustomize={showCustomize}
      activeFiltersLabel={activeFiltersLabel}
      showActiveFilters={showActiveFilters}
      showHeader={showHeader}
      selectable={selectable}
    />
  );
}
