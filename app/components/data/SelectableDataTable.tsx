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
      selectable
    />
  );
}