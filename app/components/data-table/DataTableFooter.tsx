import { Pagination } from "./types";

type Props = {
  pagination?: Pagination;
};

export function DataTableFooter({
  pagination,
}: Props) {
  return (
    <div className="data-table-footer">
      <button>Export</button>

      {pagination && (
        <span>
          Page {pagination.page} of{" "}
          {Math.ceil(
            pagination.total / pagination.pageSize
          )}
        </span>
      )}
    </div>
  );
}
