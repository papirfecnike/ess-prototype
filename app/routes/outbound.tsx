import { Outlet } from "react-router";
import { PageLayout } from "@/components/layout/PageLayout";

export default function Outbound() {
  return (
    <PageLayout
      title="Outbound"
      subtitle="Outbound operations and fulfillment"
    >
      <Outlet />
    </PageLayout>
  );
}
