import { PageHeader } from "./PageHeader";

type Props = {
  title?: string;
  subtitle?: string;
  headerActions?: React.ReactNode;
  headerContent?: React.ReactNode;
  children: React.ReactNode;
};

export function PageLayout({
  title,
  subtitle,
  headerActions,
  headerContent,
  children,
}: Props) {
  return (
    <div className="page">
      <PageHeader
        title={title}
        subtitle={subtitle}
        actions={headerActions}
        content={headerContent}
      />

      <div className="page-content">
        {children}
      </div>
    </div>
  );
}
