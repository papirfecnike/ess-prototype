type Column = {
  key: string;
  label: string;
};

type Props = {
  columns: Column[];
  rows: Record<string, string>[];
};

export function Table({ columns, rows }: Props) {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map(c => (
            <th key={c.key}>{c.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {columns.map(c => (
              <td key={c.key}>{row[c.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
