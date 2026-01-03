import type { ReactNode } from "react";
import { PageHeader } from "./PageHeader";
import "./page-layout.css";

type Props = {
  title?: ReactNode;
  subtitle?: ReactNode;
  headerContent?: ReactNode;
  headerActions?: ReactNode;
  children: ReactNode;
};

export function PageLayout({
  title,
  subtitle,
  headerContent,
  headerActions,
  children,
}: Props) {
  return (
    <div className="page-layout">
      <PageHeader
        title={title}
        subtitle={subtitle}
        headerContent={headerContent}
        headerActions={headerActions}
      />

      <div className="page-layout__content">
        {children}
      </div>
    </div>
  );
}
