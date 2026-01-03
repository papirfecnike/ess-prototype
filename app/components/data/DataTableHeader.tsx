import { Toggle } from "../ui/toggle/Toggle";
import { Icon } from "../ui/icon/Icon";
import { SelectableList } from "../ui/list/SelectableList";
import { Select } from "@/components/ui/select/Select";

type Props = {
  searchValue: string;
  onSearchChange: (value: string) => void;

  showDetails: boolean;
  onToggleDetails: (value: boolean) => void;

  showFilters: boolean;
  onToggleFilters: () => void;
};

export function DataTableHeader({
  searchValue,
  onSearchChange,
  showDetails,
  onToggleDetails,
  showFilters,
  onToggleFilters,
}: Props) {
  return (
    <div className="data-table__header">
      <div className="data-table__header-main">
        <div className="data-table__header-left">
          <input
            type="search"
            placeholder="Search"
            className="text-field__input"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="data-table__header-right">
          <Toggle
            checked={showDetails}
            onChange={onToggleDetails}
            label="Show details"
          />

          <button
            type="button"
            className="btn--secondary data-table__filter-button"
            onClick={onToggleFilters}
          >
            Filter
            <Icon
              name="chevronDown"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.25}
              className={[
                "data-table__chevron",
                showFilters ? "is-open" : "",
              ].join(" ")}
            />
          </button>
        </div>
      </div>

      {/* DETAILS PANEL */}
      {showDetails && (
        <div className="data-table__header-details">
          <SelectableList
            items={[
              { id: "in-progress", label: "In progress" },
              { id: "completed", label: "Completed" },
              { id: "blocked", label: "Blocked", disabled: true },
            ]}
            value={["in-progress", "completed"]}
            onChange={() => {}}
          />
        </div>
      )}

      {/* FILTER PANEL */}
      {showFilters && (
        <div className="data-table__filter-panel">
          <div className="data-table__filter-selects">
            <Select
              label="Warehouse"
              size="sm"
              multiple
              value={["all"]}
              onChange={() => {}}
              options={[
                { value: "all", label: "All" },
                { value: "a", label: "Warehouse A" },
                { value: "b", label: "Warehouse B" },
              ]}
            />

            <Select
              label="Priority"
              size="sm"
              multiple
              value={["all"]}
              onChange={() => {}}
              options={[
                { value: "all", label: "All" },
                { value: "high", label: "High" },
                { value: "low", label: "Low" },
              ]}
            />
          </div>

          <div className="data-table__filter-actions">
            <button type="button" className="btn--secondary" disabled>
              Customize columns
            </button>

            <button
              className="btn btn--ghost btn--danger btn--sm"
            >
              <Icon name="delete" size="sm" />
              Delete filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
