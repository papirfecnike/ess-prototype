import { useState } from "react";
import { Toggle } from "../ui/toggle/Toggle";
import { SelectableList } from "../ui/list/SelectableList";

export function DataTableHeader() {
  const [showDetails, setShowDetails] = useState(false);
  const [statuses, setStatuses] = useState<string[]>([]);

  return (
    <div
      className={[
        "data-table__header",
        showDetails ? "is-expanded" : "",
      ].join(" ")}
    >
      {/* TOP ROW */}
      <div className="data-table__header-main">
        <div className="data-table__header-left">
          <input
            type="search"
            placeholder="Search"
            className="text-field__input"
          />
        </div>

        <div className="data-table__header-right">
          <div className="data-table__toggle">
            <Toggle
              checked={showDetails}
              onChange={setShowDetails}
              label="Show details"
            />
          </div>

          <button className="btn--secondary">Columns</button>
        </div>
      </div>

      {/* EXPANDABLE DETAILS */}
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
    </div>
  );
}
