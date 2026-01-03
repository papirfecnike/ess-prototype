import { Toggle } from "../ui/toggle/Toggle";
import { Icon } from "../ui/icon/Icon";
import { Select } from "@/components/ui/select/Select";
import { Button } from "@/components/ui/button/Button";
import { Chip } from "@/components/ui/chip/Chip";

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
      {/* =========================
          HEADER MAIN
          ========================= */}
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

          <Button
            variant="ghost"
            intent="default"
            size="sm"
            trailingIcon="chevronDownStroke"
            onClick={onToggleFilters}
          >
            Filter
          </Button>
        </div>
      </div>

      {/* =========================
          DETAILS PANEL (CHIPS)
          ========================= */}
      {showDetails && (
        <div className="data-table__header-details">
          <div className="data-table__chips">
            <Chip onRemove={() => {}}>In progress</Chip>
            <Chip onRemove={() => {}}>Completed</Chip>
          </div>
        </div>
      )}

      {/* =========================
          FILTER PANEL
          ========================= */}
      {showFilters && (
        <div className="data-table__filter-panel">
          <div className="data-table__filter-selects">
            <Select
              label="Warehouse"
              size="md"
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
              size="md"
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

          {/* ACTIONS */}
          <div className="data-table__filter-actions">
            <Button variant="secondary" intent="default" size="sm" disabled>
              Customize columns
            </Button>

            <Button variant="ghost" intent="danger" size="sm" leadingIcon="delete">
              Delete filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
