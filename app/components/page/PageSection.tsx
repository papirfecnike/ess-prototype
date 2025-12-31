type Props = {
  title?: string;
  children: React.ReactNode;
};

export function PageSection({ title, children }: Props) {
  return (
    <section className="page-section">
      {title && <h2>{title}</h2>}
      <div className="page-section-content">
        {children}
      </div>
    </section>
  );
}
