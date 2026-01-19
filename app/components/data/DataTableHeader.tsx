import { useState } from "react";
import { Toggle } from "../ui/toggle/Toggle";
import { Icon } from "../ui/icon/Icon";
import { Select } from "@/components/ui/select/Select";
import { Button } from "@/components/ui/button/Button";
import { Chip } from "@/components/ui/chip/Chip";
import { SplitButton } from "@/components/ui/split-button/SplitButton";

type Props = {
  variant?: "statusSplit" | "warehouseSelect";

  searchValue: string;
  onSearchChange: (value: string) => void;

  showDetails: boolean;
  onToggleDetails: (value: boolean) => void;

  showFilters: boolean;
  onToggleFilters: () => void;

  onCustomizeColumns: () => void;

  selectedStatusIds: string[];
  onStatusChange: (ids: string[]) => void;
};


export type HeaderVariant = "statusSplit" | "warehouseSelect";

/* =========================
   STATUS DEFINITIONS
   ========================= */

const STATUS_ITEMS = [
  { id: "inprogress", label: "In progress" },
  { id: "prepared", label: "Prepared" },
  { id: "waiting", label: "Waiting" },
  { id: "completed", label: "Completed" },
];

const STATUS_LABEL_BY_ID: Record<string, string> = {
  inprogress: "In progress",
  prepared: "Prepared",
  waiting: "Waiting",
  completed: "Completed",
};

export function DataTableHeader({
  variant = "statusSplit",
  searchValue,
  onSearchChange,
  showDetails,
  onToggleDetails,
  showFilters,
  onToggleFilters,
  onCustomizeColumns,
  selectedStatusIds,
  onStatusChange,
}: Props) {

  const [warehouseFilter, setWarehouseFilter] = useState<string[]>([]);
  const [portFilter, setPortFilter] = useState<string[]>([]);


  return (
    <div className="data-table__header">
      {/* =========================
          HEADER MAIN
          ========================= */}
      <div className="data-table__header-main">
        <div className="data-table__header-left">
          {variant === "statusSplit" && (
            <>
              <input
                type="search"
                placeholder="Search"
                className="text-field__input"
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
              />

              <SplitButton
                label="Status"
                items={STATUS_ITEMS}
                selectedIds={selectedStatusIds}
                onChange={(ids) => onStatusChange(ids)}
              />
            </>
          )}

          {variant === "warehouseSelect" && (
            <div className="data-table__header-title">
              <Icon name="barChart" />
              <h3>Storage by location</h3>
            </div>
          )}
        </div>

        <div className="data-table__header-right">
          {variant === "statusSplit" && (
            <>
              <Toggle
                checked={showDetails}
                onCheckedChange={onToggleDetails}
                title="Show details"
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
            </>
          )}

          {variant === "warehouseSelect" && (
            <>
              <div className="data-table__header-select">
                <Select
                  label="Warehouse"
                  size="sm"
                  variant="single"
                  value={warehouseFilter[0] ?? ""}
                  onChange={(v) => setWarehouseFilter([v])}
                  options={[
                    { value: "a", label: "Warehouse A" },
                    { value: "b", label: "Warehouse B" },
                    { value: "c", label: "Warehouse C" },
                  ]}
                />
              </div>

              <Button
                variant="ghost"
                intent="default"
                size="sm"
                trailingIcon="assessment"
              >
                Generate reorder report
              </Button>
            </>
          )}
        </div>
      </div>

      {/* =========================
          DETAILS PANEL (CHIPS)
          ========================= */}
      {variant === "statusSplit" && showDetails && (
        <div className="data-table__header-details">
          <div className="data-table__text">STATUS</div>

          <div className="data-table__chips">
            {selectedStatusIds.length === 0 ? (
              <span className="data-table__empty">
                No item selected
              </span>
            ) : (
              selectedStatusIds.map((id) => (
              <Chip
                key={id}
                onRemove={() =>
                  onStatusChange(
                    selectedStatusIds.filter((x) => x !== id)
                  )
                }
              >
                {STATUS_LABEL_BY_ID[id]}
              </Chip>
              ))
            )}
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
              variant="multi"
              value={warehouseFilter}
              onChange={setWarehouseFilter}
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
              label="Port"
              size="md"
              variant="multi"
              value={portFilter}
              onChange={setPortFilter}
              options={[
                { value: "all", label: "All" },
                { value: "01", label: "Port 01" },
                { value: "02", label: "Port 02" },
                { value: "03", label: "Port 03" },
                { value: "04", label: "Port 04" },
                { value: "05", label: "Port 05" },
                { value: "06", label: "Port 06" },
                { value: "07", label: "Port 07" },
                { value: "08", label: "Port 08" },
                { value: "09", label: "Port 09" },
                { value: "10", label: "Port 10" },
              ]}
            />
          </div>

          <div className="data-table__filter-actions">
            <Button
              variant="secondary"
              intent="default"
              size="sm"
              leadingIcon="widthNormal"
              onClick={onCustomizeColumns}
            >
              Customize columns
            </Button>

            <Button
              variant="ghost"
              intent="danger"
              size="sm"
              leadingIcon="delete"
              onClick={() => {
                setWarehouseFilter([]);
                setPortFilter([]);
              }}
            >
              Delete filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
