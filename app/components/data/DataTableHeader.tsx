import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { TextField } from "@/components/ui/input/TextField";
import { Button } from "@/components/ui/button/Button";
import { Icon } from "../ui/icon/Icon";

export type HeaderVariant =
  | "statusSplit"
  | "warehouseSelect"
  | "reorder"
  | "titled";

type Props = {
  variant?: HeaderVariant;
  searchValue: string;
  onSearchChange: (value: string) => void;
  headerActions?: ReactNode;
  headerLeftActions?: ReactNode;
  onCustomizeColumns?: () => void;
  activeFilters?: string[];
  activeFiltersLabel?: string;
  onClearActiveFilters?: () => void;
};

export function DataTableHeader({
  searchValue,
  onSearchChange,
  headerActions,
  headerLeftActions,
  onCustomizeColumns,
  activeFilters = [],
  activeFiltersLabel = "Active filters",
  onClearActiveFilters,
}: Props) {
  const [showActiveFilters, setShowActiveFilters] = useState(false);
  const activeFiltersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showActiveFilters) return;

    function handlePointerDown(event: PointerEvent) {
      if (activeFiltersRef.current?.contains(event.target as Node)) return;
      setShowActiveFilters(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [showActiveFilters]);

  return (
    <div className="data-table__header">
      <div className="data-table__header-main">
        <div className="data-table__header-left">
          <TextField
            type="search"
            label="Search"
            value={searchValue}
            leadingIcon={<Icon name="search" size="sm" />}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {headerLeftActions}
        </div>

        {(headerActions || onCustomizeColumns) && (
          <div className="data-table__header-right">
            {headerActions}
            <div className="data-table__active-filters" ref={activeFiltersRef}>
              <Button
                variant="ghost"
                size="sm"
                leadingIcon="filter"
                trailingIcon="chevronDownStroke"
                onClick={() => setShowActiveFilters(open => !open)}
              >
                {activeFiltersLabel}
              </Button>

              {showActiveFilters && (
                <div className="data-table__active-filters-popover">
                  <div className="data-table__active-filters-title">
                    <strong>Active filters</strong>
                    <div className="data-table__active-filters-icons">
                      <Icon name="flag" size="sm" />
                      <Icon name="settings" size="sm" />
                    </div>
                  </div>

                  <button type="button" className="data-table__filter-preset">
                    <Icon name="inventory" size="sm" />
                    <span>Select filter preset</span>
                    <Icon name="chevronDownStroke" size="sm" />
                  </button>

                  <div className="data-table__active-filter-list">
                    {activeFilters.length > 0 ? (
                      activeFilters.map(filter => (
                        <span key={filter} className="data-table__active-filter-chip">
                          {filter}
                        </span>
                      ))
                    ) : (
                      <strong>No active filters</strong>
                    )}
                  </div>

                  <div className="data-table__active-filters-footer">
                    <Button
                      variant="ghost"
                      size="sm"
                      leadingIcon="closeStroke"
                      disabled={activeFilters.length === 0}
                      onClick={onClearActiveFilters}
                    >
                      Clear all
                    </Button>
                  </div>
                </div>
              )}
            </div>
            {onCustomizeColumns && (
              <Button
                variant="ghost"
                size="sm"
                leadingIcon="settings"
                onClick={onCustomizeColumns}
              >
                Customize
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
