import type { LoaderFunction } from "react-router";
import { useState } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";
import { DataTable } from "@/components/data/DataTable";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function InboundPutaway() {
  const [dense, setDense] = useState(false);

  const [statuses, setStatuses] = useState<string[]>([]);

  // STATE
  const [selected, setSelected] = useState<string[]>([]);

  // RENDER
  return (
    <PageLayout
      title="Putaway"
      subtitle="Handling and placement of inbound goods"
    >

      <PageSection>
        <DataTable
          columns={[
            { key: "id", label: "Order" },
            { key: "status", label: "Status" },
            { key: "location", label: "Location" },
          ]}
          rows={[
            {
              id: "PU-1021",
              status: "In progress",
              location: "A-12",
            },
            {
              id: "PU-1022",
              status: "Completed",
              location: "B-03",
            },
          ]}
          pagination={{
            page: 1,
            pageSize: 10,
            total: 42,
          }}
        />
      </PageSection>
    </PageLayout>
  );
}
