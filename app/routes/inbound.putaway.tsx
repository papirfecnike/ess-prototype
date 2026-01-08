import type { LoaderFunction } from "react-router";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";
import { Button } from "@/components/ui/button/Button";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function InboundPutaway() {
  function goToTable() {
    if (typeof window !== "undefined") {
      window.location.assign("/inbound/putaway-table");
    }
  }

  return (
    <PageLayout
      title="Putaway"
      subtitle="Overview of all inbound operations"
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
            Putaway 1/1
          </Button>

          <Button
            variant="context"
            style={{ width: 250 }}
            onClick={goToTable}
          >
            Putaway 1/2
          </Button>
        </div>
      </PageSection>
    </PageLayout>
  );
}
