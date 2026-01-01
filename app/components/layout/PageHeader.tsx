import type { ReactNode } from "react";

type Props = {
  title?: string;
  subtitle?: string;
  headerContent?: ReactNode;
  headerActions?: ReactNode;
};

export function PageHeader({
  title,
  subtitle,
  headerContent,
  headerActions,
}: Props) {
  return (
    <header className="page-header">
      <div className="page-header__left">
        {headerContent ? (
          headerContent
        ) : (
          <>
            {title && (
              <h1 className="page-header__title">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="page-header__subtitle">
                {subtitle}
              </p>
            )}
          </>
        )}
      </div>

      {headerActions && (
        <div className="page-header__actions">
          {headerActions}
        </div>
      )}
    </header>
  );
}
