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

  expandedRows?: string[];
  onExpandChange?: (ids: string[]) => void;

  renderExpandedRow?: (row: DataTableRow) => ReactNode;

  headerVariant?: HeaderVariant;

  detailsContent?: ReactNode;
};

export function ExpandableDataTable({
  columns,
  rows,
  rowIdKey,
  expandedRows,
  onExpandChange,
  renderExpandedRow,
  headerVariant,
  detailsContent,
}: Props) {
  return (
    <DataTableCore
      columns={columns}
      rows={rows}
      rowIdKey={rowIdKey}
      expandedRows={expandedRows}
      onExpandChange={onExpandChange}
      renderExpandedRow={renderExpandedRow}
      headerVariant={headerVariant}
      detailsContent={detailsContent}
      expandable
    />
  );
}