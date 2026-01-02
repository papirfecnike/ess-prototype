import { DataTableCore, type DataTableColumn, type DataTableRow } from "./DataTableCore";

type Props = {
  columns: DataTableColumn[];
  rows: DataTableRow[];
  rowIdKey: string;
  renderExpandedRow: (row: DataTableRow) => React.ReactNode;
};

export function ExpandableDataTable(props: Props) {
  return (
    <DataTableCore
      {...props}
      expandable
    />
  );
}
