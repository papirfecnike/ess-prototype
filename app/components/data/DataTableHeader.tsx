import { useState } from "react";
import { Toggle } from "../ui/toggle/Toggle";
import { Icon } from "../ui/icon/Icon";
import { Select } from "@/components/ui/select/Select";
import { Button } from "@/components/ui/button/Button";
import { Chip } from "@/components/ui/chip/Chip";
import { SplitButton } from "@/components/ui/split-button/SplitButton";

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
  /* =========================
     FILTER STATE (FIX)
     ========================= */

  const [warehouseFilter, setWarehouseFilter] = useState<string[]>([]);
  const [portFilter, setPortFilter] = useState<string[]>([]);

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
          <SplitButton
            label="Status"
            items={[
              { id: "inprogress", label: "In progress" },
              { id: "prepared", label: "Prepared" },
              { id: "waiting", label: "Waiting" },
              { id: "completed", label: "Completed" },
            ]}
            onChange={(selectedIds, active) => {
              console.log("Selected:", selectedIds);
              console.log("Active:", active);
            }}
          />
        </div>

        <div className="data-table__header-right">
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
        </div>
      </div>

      {/* =========================
          DETAILS PANEL (CHIPS)
          ========================= */}
      {showDetails && (
        <div className="data-table__header-details">
          <div className="data-table__chips">
            <Chip onRemove={() => {}}>In progress</Chip>
            <Chip onRemove={() => {}}>Prepared</Chip>
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

          {/* ACTIONS */}
          <div className="data-table__filter-actions">
            <Button
              variant="secondary"
              intent="default"
              size="sm"
              leadingIcon="widthNormal"
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
