import {
  DataTableCore,
  type DataTableColumn,
  type DataTableRow,
} from "./DataTableCore";

type Props = {
  columns: DataTableColumn[];
  rows: DataTableRow[];
  rowIdKey: string;

  selectedRows?: string[];
  onSelectionChange?: (ids: string[]) => void;

  expandedRows?: string[];
  onExpandChange?: (ids: string[]) => void;

  renderExpandedRow?: (row: DataTableRow) => React.ReactNode;
};

export function SelectableExpandableDataTable({
  columns,
  rows,
  rowIdKey,

  selectedRows,
  onSelectionChange,

  expandedRows,
  onExpandChange,

  renderExpandedRow,
}: Props) {
  return (
    <DataTableCore
      columns={columns}
      rows={rows}
      rowIdKey={rowIdKey}

      selectable
      expandable

      selectedRows={selectedRows}
      onSelectionChange={onSelectionChange}

      expandedRows={expandedRows}
      onExpandChange={onExpandChange}

      renderExpandedRow={renderExpandedRow}
    />
  );
}