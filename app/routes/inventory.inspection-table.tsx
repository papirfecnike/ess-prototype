import type { LoaderFunction } from "react-router";
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";
import { TabBar } from "@/components/ui/tab/TabBar";
import { EmptyState } from "@/components/ui/empty-state/EmptyState";
import CompartmentsTab from "./inventory.tab.compartments";
import InspectionsTab from "./inventory.tab.inspections";

export const loader: LoaderFunction = async () => null;

export default function InventoryInspection() {

  const [tab, setTab] = useState("compartments");

  return (
    <PageLayout
      title="Overview"
      subtitle="All inventory operations and advice lines"
    >
      {/* TAB BAR */}
      <PageSection>
        <TabBar
          activeTab={tab}
          onChange={setTab}
          tabs={[
            { id: "compartments", label: "Compression" },
            { id: "bins", label: "Bins" },
            { id: "inspections", label: "Inspections" },
          ]}
        />
      </PageSection>

      {/* TAB CONTENT */}
      <PageSection>

        {tab === "compartments" && <CompartmentsTab />}

        {tab === "inspections" && <InspectionsTab />}

        {tab === "bins" && (
          <EmptyState
            title="No bins available"
            description="There are no bin-level inspection tasks to display right now."
            iconName="inventory2"
          />
        )}

      </PageSection>

    </PageLayout>
  );
}
