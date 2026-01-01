import type { LoaderFunction } from "react-router";
import { useState } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";
import { DataTable } from "@/components/data/DataTable";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function InboundOverview() {
  const [dense, setDense] = useState(false);

  const [statuses, setStatuses] = useState<string[]>([]);

  // STATE
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <PageLayout
          title="Overview"
          subtitle="Overview of inbound processes."
        >
    <PageSection> </PageSection>
    </PageLayout>
  );
}
