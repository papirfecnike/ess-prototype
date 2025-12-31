type Props = {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  content?: React.ReactNode;
};

export function PageHeader({
  title,
  subtitle,
  actions,
  content,
}: Props) {
  return (
    <header className="page-header">
      <div className="page-header-main">
        {title && (
          <>
            <h1 className="page-title">{title}</h1>
            {subtitle && (
              <p className="page-subtitle">
                {subtitle}
              </p>
            )}
          </>
        )}

        {content && (
          <div className="page-header-content">
            {content}
          </div>
        )}
      </div>

      {actions && (
        <div className="page-header-actions">
          {actions}
        </div>
      )}
    </header>
  );
}
