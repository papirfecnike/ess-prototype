import type { ReactNode } from "react";
import { Icon } from "../icon/Icon";

type Option = {
  value: string;
  label: string;
};

type Props = {
  icon?: ReactNode;
  options: Option[];
};

export function Select({ icon, options }: Props) {
  return (
    <div className="select">
      {icon && <span className="select__icon">{icon}</span>}

      <button className="select__trigger">
        Select…
        <Icon name="chevronDown" size="sm" />
      </button>
    </div>
  );
}
