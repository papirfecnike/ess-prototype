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
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className="data-table__footer">
      <span>
        {from}–{to} of {total}
      </span>

      <div>
        <button disabled={page === 1}>Previous</button>
        <button disabled={to >= total}>Next</button>
      </div>
    </div>
  );
}
