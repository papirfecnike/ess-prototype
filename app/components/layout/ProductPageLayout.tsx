import type { ReactNode } from "react";
import "./product-page-layout.css";

type Props = {
  children: ReactNode;
};

export function ProductPageLayout({ children }: Props) {
  return (
    <div className="product-page-layout">
      {children}
    </div>
  );
}
