import { useState } from "react";
import { Toggle } from "../ui/toggle/Toggle";
import { SelectableList } from "../ui/list/SelectableList";
import { Select } from "@/components/ui/select/Select";
import { Icon } from "../ui/icon/Icon";

export function DataTableHeader() {
  const [showDetails, setShowDetails] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [statuses, setStatuses] = useState<string[]>([
    "in-progress",
    "completed",
    "blocked",
  ]);

  return (
    <div className="data-table__header">
      {/* =========================
          TOP ROW
      ========================= */}
      <div className="data-table__header-main">
        <div className="data-table__header-left">
          <input
            type="search"
            placeholder="Search"
            className="text-field__input"
          />
        </div>

        <div className="data-table__header-right">
          <Toggle
            checked={showDetails}
            onChange={setShowDetails}
            label="Show details"
          />

          <button
            type="button"
            className="btn--secondary data-table__filter-button"
            onClick={() => setShowFilters((v) => !v)}
          >
            Filter
            <Icon
              name="chevron"
              className={[
                "data-table__chevron",
                showFilters ? "is-open" : "",
              ].join(" ")}
            />
          </button>
        </div>
      </div>

      {/* =========================
          DETAILS (STATUS FILTERS)
      ========================= */}
      {showDetails && (
        <div className="data-table__header-details">
          <SelectableList
            items={[
              { id: "in-progress", label: "In progress" },
              { id: "completed", label: "Completed" },
              { id: "blocked", label: "Blocked", disabled: true },
            ]}
            value={statuses}
            onChange={setStatuses}
          />
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
              options={[
                { value: "all", label: "All" },
                { value: "a", label: "Warehouse A" },
                { value: "b", label: "Warehouse B" },
                { value: "c", label: "Warehouse C" },
                { value: "d", label: "Warehouse D" },
                { value: "e", label: "Warehouse E" },
                { value: "f", label: "Warehouse F" },
              ]}
            />

            <Select
              label="Priority"
              options={[
                { value: "all", label: "All" },
                { value: "critical", label: "Critical" },
                { value: "urgent", label: "Urgent" },
                { value: "high", label: "High" },
                { value: "medium", label: "Medium" },
                { value: "low", label: "Low" },
                { value: "nicetohave", label: "Nice to have" },
              ]}
            />

            <Select
              label="Operator"
              options={[
                { value: "all", label: "All" },
                { value: "john", label: "John" },
                { value: "taylor", label: "Taylor" },
                { value: "finneas", label: "Finneas" },
                { value: "dmitry", label: "Dmitry" },
                { value: "esther", label: "Esther" },
                { value: "linnea", label: "Linnea" },
                { value: "thomas", label: "Thomas" },
                { value: "sindre", label: "Sindre" },
                { value: "jonathan", label: "Jonathan" },
                { value: "brigitte", label: "Brigitte" },
              ]}
            />
          </div>

          <div className="data-table__filter-actions">
            <button
              type="button"
              className="btn--secondary"
              disabled
            >
              Customize columns
            </button>

            <button
              type="button"
              className="btn--ghost"
              disabled
            >
              Delete filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
