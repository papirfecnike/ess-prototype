import "./data-table.css";
import { DataTableHeader } from "./DataTableHeader";
import { DataTableFooter } from "./DataTableFooter";

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

type Props = {
  columns: DataTableColumn[];
  rows: DataTableRow[];
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

      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col) => (
                <td key={col.key}>
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {pagination && (
        <DataTableFooter pagination={pagination} />
      )}
    </div>
  );
}
