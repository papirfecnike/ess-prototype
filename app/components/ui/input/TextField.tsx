import type { InputHTMLAttributes, ReactNode } from "react";

type Props = {
  icon?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export function TextField({ icon, ...rest }: Props) {
  return (
    <div className="text-field">
      {icon && <span className="text-field__icon">{icon}</span>}
      <input className="text-field__input" {...rest} />
    </div>
  );
}
