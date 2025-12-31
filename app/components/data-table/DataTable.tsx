import { Column, Row, Pagination } from "./types";
import { DataTableHeader } from "./DataTableHeader";
import { DataTableTable } from "./DataTableTable";
import { DataTableFooter } from "./DataTableFooter";

type Props = {
  columns: Column[];
  rows: Row[];
  pagination?: Pagination;
};

export function DataTable({
  columns,
  rows,
  pagination,
}: Props) {
  return (
    <div className="data-table">
      <DataTableHeader />

      <DataTableTable
        columns={columns}
        rows={rows}
      />

      <DataTableFooter pagination={pagination} />
    </div>
  );
}
