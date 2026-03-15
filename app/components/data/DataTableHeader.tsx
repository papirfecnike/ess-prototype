import { Toggle } from "../ui/toggle/Toggle";
import { Button } from "@/components/ui/button/Button";

export type HeaderVariant =
  | "statusSplit"
  | "warehouseSelect"
  | "reorder";

type Props = {
  variant?: HeaderVariant;
  searchValue: string;
  onSearchChange: (value: string) => void;
  showDetails: boolean;
  onToggleDetails: (value: boolean) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  detailsContent?: React.ReactNode;
};

export function DataTableHeader({
  variant = "statusSplit",
  searchValue,
  onSearchChange,
  showDetails,
  onToggleDetails,
  showFilters,
  onToggleFilters,
  detailsContent,
}: Props) {

  return (
    <>
      <div className="data-table__header">
        <div className="data-table__header-main">
          <div className="data-table__header-left">
            <input
              type="search"
              placeholder="Search in this data table..."
              className="text-field__input"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <div className="data-table__header-right">
            <div className="data-table__toggle">
              <Toggle
                checked={showDetails}
                onCheckedChange={onToggleDetails}
                title="Show details"
              />
            </div>

            <Button
              variant="ghost"
              size="sm"
              trailingIcon="chevronDownStroke"
              onClick={onToggleFilters}
            >
              Filters
            </Button>
          </div>
        </div>
      </div>

      {showDetails && detailsContent && (
        <div className="data-table_container">
          {detailsContent}
        </div>
      )}
    </>
  );
}