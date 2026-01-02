import { Toggle } from "../ui/toggle/Toggle";
import { Icon } from "../ui/icon/Icon";

type Props = {
  searchValue: string;
  onSearchChange: (value: string) => void;
};

export function DataTableHeader({
  searchValue,
  onSearchChange,
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
          {/* ezek később visszajöhetnek */}
        </div>
      </div>
    </div>
  );
}
