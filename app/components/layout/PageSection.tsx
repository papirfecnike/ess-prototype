import type { ReactNode } from "react";
import "./page-section.css";
import "../layout/page-content.css";

type Props = {
  title?: string;
  children: ReactNode;
};

export function PageSection({ title, children }: Props) {
  return (
    <section className="page-section">
      <div className="page-content">
        {title && (
          <h2 className="page-section__title">
            {title}
          </h2>
        )}

        <div className="page-section__content">
          {children}
        </div>
      </div>
    </section>
  );
}
