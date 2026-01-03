import type { ReactNode } from "react";
import "./page-header.css";
import "../layout/page-content.css";

type Props = {
  title?: ReactNode;
  subtitle?: ReactNode;
  headerContent?: ReactNode;
  headerActions?: ReactNode;
};

export function PageHeader({
  title,
  subtitle,
  headerContent,
  headerActions,
}: Props) {
  const isPlainTitle = typeof title === "string";

  return (
    <header className="page-header">
      <div className="page-content">
        <div className="page-header__main">
          {title && (
            <div
              className={
                isPlainTitle
                  ? "page-header__title"
                  : "page-header__title--custom"
              }
            >
              {title}
            </div>
          )}

          {subtitle && (
            <div className="page-header__subtitle">
              {subtitle}
            </div>
          )}
        </div>

        {(headerContent || headerActions) && (
          <div className="page-header__side">
            {headerContent}
            {headerActions}
          </div>
        )}
      </div>
    </header>
  );
}
