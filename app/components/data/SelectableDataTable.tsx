import { DataTableCore, type DataTableColumn, type DataTableRow } from "./DataTableCore";

type Props = {
  columns: DataTableColumn[];
  rows: DataTableRow[];
  rowIdKey: string;
  selectedRows: string[];
  onSelectionChange: (ids: string[]) => void;
};

export function SelectableDataTable(props: Props) {
  return (
    <DataTableCore
      {...props}
      selectable
    />
  );
}
