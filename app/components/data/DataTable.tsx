import "./data-table.css";
import { DataTableHeader } from "./DataTableHeader";
import { DataTableFooter } from "./DataTableFooter";

/* =========================
   TYPES
   ========================= */

export type DataTableColumn = {
  key: string;
  label: string;
};

export type DataTableRow = Record<string, string | number>;

type Pagination = {
  page: number;
  pageSize: number;
  total: number;
};

type DataTableProps = {
  columns: DataTableColumn[];
  rows: DataTableRow[];
  pagination?: Pagination;
};

/* =========================
   COMPONENT
   ========================= */

export function DataTable({
  columns,
  rows,
  pagination,
}: DataTableProps) {
  return (
    <div className="data-table-card">
      <div className="data-table">
        <DataTableHeader />

        <div className="data-table__header-row">
          <table>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key}>{col.label}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col) => (
                    <td key={col.key}>
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {pagination && (
          <DataTableFooter pagination={pagination} />
        )}
      </div>
    </div>
  );
}
