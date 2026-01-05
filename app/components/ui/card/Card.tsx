import type { ReactNode } from "react";
import "./card.css";

type Props = {
  children: ReactNode;
  className?: string;
};

export function Card({ className, children }: Props) {
  return <div className={["ui-card", className].join(" ")}>{children}</div>;
}
