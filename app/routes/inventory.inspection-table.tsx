import type { LoaderFunction } from "react-router";
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";
import { TabBar } from "@/components/ui/tab/TabBar";
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
            { id: "compartments", label: <>Compartments <span className="tab-count">4</span></> },
            { id: "bins", label: <>Bins <span className="tab-count">0</span></> },
            { id: "inspections", label: <>Inspections <span className="tab-count">7</span></> },
          ]}
        />
      </PageSection>

      {/* TAB CONTENT */}
      <PageSection>

        {tab === "compartments" && <CompartmentsTab />}

        {tab === "inspections" && <InspectionsTab />}

        {tab === "bins" && (
          <div style={{ padding: 24 }}>
            Bins content coming later
          </div>
        )}

      </PageSection>

    </PageLayout>
  );
}