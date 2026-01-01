type Pagination = {
  page: number;
  pageSize: number;
  total: number;
};

type Props = {
  pagination: Pagination;
};

export function DataTableFooter({ pagination }: Props) {
  const { page, pageSize, total } = pagination;
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="data-table__footer">
      <div className="data-table__footer-left">
        <button>Export</button>
      </div>

      <div className="data-table__footer-right">
        <button disabled={page === 1}>Prev</button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
