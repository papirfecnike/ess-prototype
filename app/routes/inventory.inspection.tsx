import type { LoaderFunction } from "react-router";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";
import { Button } from "@/components/ui/button/Button";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function InventoryInspection() {
  function goToTable() {
    if (typeof window !== "undefined") {
      window.location.assign("/inventory/inspection-table");
    }
  }

  return (
    <PageLayout
      title="Inspection"
      subtitle="All inventory operations and advice lines"
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
            variant="secondary"
            style={{ width: 250 }}
            onClick={goToTable}
          >
            Compression
          </Button>

          <Button
            variant="secondary"
            style={{ width: 250 }}
            onClick={goToTable}
          >
            Inspection
          </Button>
        </div>
      </PageSection>
    </PageLayout>
  );
}
