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

  onMoveRow?: (index: number, direction: "up" | "down") => void;
  enableReorder?: boolean;
};

/* =========================
   COMPONENT
   ========================= */

export function ReorderDataTable({
  columns,
  rows,
  rowIdKey,
  onMoveRow,
  enableReorder = true,
}: Props) {
  /* =========================
     REORDER COLUMN
     ========================= */

  const reorderColumn: DataTableColumn = {
    key: "__reorder",
    label: "",
    align: "center",
    renderCell: (_value, row) => {
      if (!onMoveRow) return null;

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

  /* =========================
     FINAL COLUMNS
     ========================= */

  const finalColumns = enableReorder
    ? [reorderColumn, ...columns]
    : columns;

  /* =========================
     RENDER
     ========================= */

  return (
    <DataTableCore
      rowIdKey={rowIdKey}
      columns={finalColumns}
      rows={rows}
      {...(enableReorder
        ? { headerVariant: "reorder" }
        : {})}
    />
  );
}
