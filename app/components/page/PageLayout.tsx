type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function PageLayout({ title, subtitle, children }: Props) {
  return (
    <div className="page">
      <header className="page-header">
        <h1>{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </header>

      <div className="page-content">
        {children}
      </div>
    </div>
  );
}
