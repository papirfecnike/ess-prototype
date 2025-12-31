import { useState } from "react";

export function DataTableHeader() {
  const [showDetails, setShowDetails] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="data-table-header">
      <div className="data-table-header-row">
        <input
          type="search"
          placeholder="Search table…"
        />

        <button>Filter</button>

        <button
          onClick={() => setShowDetails(v => !v)}
        >
          Show details
        </button>

        <button
          onClick={() => setShowFilters(v => !v)}
        >
          Filters
        </button>
      </div>

      {showDetails && (
        <div className="data-table-details">
          {/* későbbi filterek */}
          <span>Additional filters</span>
        </div>
      )}

      {showFilters && (
        <div className="data-table-filters">
          {/* accordion tartalom */}
          <span>All available filters</span>
        </div>
      )}
    </div>
  );
}
