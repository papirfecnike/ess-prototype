import { Icon } from "../ui/icon/Icon";
import { Select } from "@/components/ui/select/Select";

export type Pagination = {
  page: number;
  pageSize: number;
  total: number;
};

export type DataTableFooterProps = {
  pagination: Pagination;
  disabled?: boolean;

  onPageChange?: (page: number) => void;
  onExport?: () => void;
};

export function DataTableFooter({
  pagination,
  disabled = false,
  onPageChange,
  onExport,
}: DataTableFooterProps) {
  const { page, pageSize, total } = pagination;

  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const pageOptions = Array.from(
    { length: totalPages },
    (_, i) => ({
      value: String(i + 1),
      label: `Page ${i + 1}`,
    })
  );

  const canGoFirst = !disabled && page > 1;
  const canGoPrev = !disabled && page > 1;
  const canGoNext = !disabled && page < totalPages;
  const canGoLast = !disabled && page < totalPages;

  return (
    <div className="data-table__footer">
      {/* LEFT */}
      <div className="data-table__footer-left">
        <button
          type="button"
          className="btn--ghost"
          onClick={onExport}
          disabled={!onExport}
        >
          Export
        </button>
      </div>

      {/* RIGHT */}
      <div className="data-table__footer-center">
        {/* FIRST */}
        <button
          type="button"
          className="btn--ghost"
          disabled={!canGoFirst}
          onClick={() => onPageChange?.(1)}
          aria-label="First page"
        >
          <Icon
            name="firstPage"
            size="sm"
            className="data-table__chevron data-table__chevron-first"
          />
        </button>

        {/* PREVIOUS */}
        <button
          type="button"
          className="btn--ghost"
          disabled={!canGoPrev}
          onClick={() => onPageChange?.(page - 1)}
          aria-label="Previous page"
        >
          <Icon
            name="chevronDown"
            size="sm"
            className="data-table__chevron data-table__chevron-left"
          />
        </button>

        {/* RANGE */}
        <span className="data-table__footer-range">
          {from}–{to} of {total}
        </span>

        {/* NEXT */}
        <button
          type="button"
          className="btn--ghost"
          disabled={!canGoNext}
          onClick={() => onPageChange?.(page + 1)}
          aria-label="Next page"
        >
          <Icon
            name="chevronDown"
            size="sm"
            className="data-table__chevron data-table__chevron-right"
          />
        </button>

        <button
          type="button"
          className="btn--ghost"
          disabled={!canGoLast}
          onClick={() => onPageChange?.(totalPages)}
          aria-label="Last page"
        >
          <Icon
            name="lastPage"
            size="sm"
            className="data-table__chevron data-table__chevron-last"
          />
        </button>

        <div className="data-table__footer-page-select">
          <Select
            size="sm"
            value={[String(page)]}
            onChange={(v) =>
              onPageChange?.(Number(v[0]))
            }
            options={pageOptions}
            label=""
          />
        </div>
      </div>
    </div>
  );
}
