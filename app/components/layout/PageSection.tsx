import type { ReactNode } from "react";

type Props = {
  title?: string;
  children: ReactNode;
};

export function PageSection({ title, children }: Props) {
  return (
    <section className="page-section">
      {title && (
        <h2 className="page-section__title">
          {title}
        </h2>
      )}

      <div className="page-section__content">
        {children}
      </div>
    </section>
  );
}
