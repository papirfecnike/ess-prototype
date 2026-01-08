import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Icon } from "../icon/Icon";

type Variant = "primary" | "secondary" | "ghost" | "context" | "icon";
type Intent = "default" | "danger" | "warning" | "success";
type Size = "sm" | "md";

type Props = {
  children: ReactNode;
  variant?: Variant;
  intent?: Intent;
  size?: Size;
  leadingIcon?: string;
  trailingIcon?: string;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  variant = "primary",
  intent = "default",
  size = "md",
  leadingIcon,
  trailingIcon,
  isLoading = false,
  disabled,
  ...rest
}: Props) {
  return (
    <button
      className={[
        "btn",
        `btn--${variant}`,
        `btn--${intent}`,
        `btn--${size}`,
        leadingIcon ? "btn--leading-icon" : "",
        trailingIcon ? "btn--trailing-icon" : "",
      ].join(" ")}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...rest}
    >
      {leadingIcon && <Icon name={leadingIcon} />}
      {children}
      {trailingIcon && <Icon name={trailingIcon} />}
    </button>
  );
}
