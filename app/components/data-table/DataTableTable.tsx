import { Column, Row } from "./types";

type Props = {
  columns: Column[];
  rows: Row[];
};

export function DataTableTable({
  columns,
  rows,
}: Props) {
  return (
    <table className="data-table-table">
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col.key}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map(row => (
          <tr key={row.id}>
            {columns.map(col => (
              <td key={col.key}>
                {String(row[col.key] ?? "")}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
