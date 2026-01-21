import {
  DataTableCore,
  type DataTableColumn,
  type DataTableRow,
} from "./DataTableCore";
import type { HeaderVariant } from "./DataTableHeader";
import type { ColumnConfig } from "./CustomizeColumnsModal";

type Props = {
  columns: DataTableColumn[];
  rows: DataTableRow[];
  rowIdKey: string;

  selectedRows?: string[];
  onSelectionChange?: (ids: string[]) => void;

  columnConfig?: ColumnConfig[];
  onColumnConfigChange?: (cols: ColumnConfig[]) => void;

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
