import {
  DataTableCore,
  type DataTableColumn,
  type DataTableRow,
} from "./DataTableCore";
import { Button } from "@/components/ui/button/Button";
import { Icon } from "@/components/ui/icon/Icon";

/* =========================
   TYPES
   ========================= */

type Props = {
  columns: DataTableColumn[];
  rows: DataTableRow[];
  rowIdKey: string;

  /**
   * Called when a row should be moved.
   * index: current row index (in rendered order)
   * direction: "up" | "down"
   */
  onMoveRow: (index: number, direction: "up" | "down") => void;
};

/* =========================
   COMPONENT
   ========================= */

export function ReorderDataTable({
  columns,
  rows,
  rowIdKey,
  onMoveRow,
}: Props) {
  /* =========================
     REORDER COLUMN
     ========================= */

  const reorderColumn: DataTableColumn = {
    key: "__reorder",
    label: "",
    align: "center",
    renderCell: (_value, row) => {
      const index = rows.findIndex(
        (r) => String(r[rowIdKey]) === String(row[rowIdKey])
      );

      const isFirst = index === 0;

      return (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() =>
            onMoveRow(index, isFirst ? "down" : "up")
          }
        >
        <Icon
            name={isFirst ? "arrowDownward" : "arrowUpward"}
            size="sm"
        />
        </Button>
      );
    },
  };

  const finalColumns: DataTableColumn[] = [
    reorderColumn,
    ...columns,
  ];

  /* =========================
     RENDER
     ========================= */

  return (
    <DataTableCore
      rowIdKey={rowIdKey}
      columns={finalColumns}
      rows={rows}
      headerVariant="reorder"
      /* explicitly NOT selectable / expandable */
    />
  );
}
