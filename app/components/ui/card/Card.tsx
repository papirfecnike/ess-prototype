import type { ReactNode } from "react";
import "./card.css";

type CardVariant = "default" | "darkHeader" | "scanInput";

type Props = {
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
};

export function Card({
  className,
  variant = "default",
  children,
}: Props) {
  return (
    <div
      className={[
        "ui-card",
        `ui-card--${variant}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
