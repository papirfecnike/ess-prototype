import type { ReactNode } from "react";
import "./card.css";

type Props = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: Props) {
  return <div className={`ui-card ${className}`}>{children}</div>;
}
