import type { LoaderFunction } from "react-router";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";
import { Button } from "@/components/ui/button/Button";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function OutboundPicking() {
  function goToTable() {
    if (typeof window !== "undefined") {
      window.location.assign("/outbound/picking-table");
    }
  }

  return (
    <PageLayout
      title="Picking"
      subtitle="Overview of all outbound operations and customer orders"
    >
      <PageSection>
        <div
          style={{
            display: "flex",
            gap: "24px",
            alignItems: "center",
          }}
        >
          <Button
            variant="context"
            style={{ width: 250 }}
            onClick={goToTable}
          >
            Retail
          </Button>

          <Button
            variant="context"
            style={{ width: 250 }}
            onClick={goToTable}
          >
            Single
          </Button>

          <Button
            variant="context"
            style={{ width: 250 }}
            onClick={goToTable}
          >
            Multi
          </Button>
        </div>
      </PageSection>
    </PageLayout>
  );
}
