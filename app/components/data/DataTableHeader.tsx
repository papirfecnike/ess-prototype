export function DataTableHeader() {
  return (
    <div className="data-table__header">
      <div className="data-table__header-left">
        <input
          type="search"
          placeholder="Search"
          className="data-table__search"
        />
      </div>

      <div className="data-table__header-right">
        <button>Filter</button>
        <button>Columns</button>
      </div>
    </div>
  );
}
