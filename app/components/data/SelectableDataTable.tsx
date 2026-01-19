import { DataTableCore, type DataTableColumn, type DataTableRow } from "./DataTableCore";
import type { HeaderVariant } from "./DataTableHeader";

type Props = {
  columns: DataTableColumn[];
  rows: DataTableRow[];
  rowIdKey: string;
  renderExpandedRow: (row: DataTableRow) => React.ReactNode;

  headerVariant?: HeaderVariant;
};




export function SelectableDataTable(props: Props) {
  return (
    <DataTableCore
      {...props}
      selectable
    />
  );
}
