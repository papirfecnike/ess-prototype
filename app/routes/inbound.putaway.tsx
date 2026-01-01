import type { LoaderFunction } from "react-router";
import { useState } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";
import { DataTable } from "@/components/data/DataTable";
import { DropdownMenu } from "@/components/ui/menu/DropdownMenu";
import { Button } from "@/components/ui/button/Button";
import { Select } from "@/components/ui/select/Select";
import { Toggle } from "@/components/ui/toggle/Toggle";
import {
  SelectableList,
  type SelectableListItem,
} from "@/components/ui/list/SelectableList";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function InboundPutaway() {
  const [dense, setDense] = useState(false);

  const statusItems: SelectableListItem[] = [
    { id: "in-progress", label: "In progress" },
    { id: "completed", label: "Completed" },
    { id: "blocked", label: "Blocked" },
  ];

  const [statuses, setStatuses] = useState<string[]>([]);

  const items: SelectableListItem[] = [
    {
      id: "in-progress",
      label: "In progress",
      description: "Orders currently processed",
    },
    {
      id: "completed",
      label: "Completed",
    },
    {
      id: "blocked",
      label: "Blocked",
      disabled: true,
    },
  ];

  // STATE
  const [selected, setSelected] = useState<string[]>([]);

  // RENDER
  return (
    <PageLayout
      title="Putaway"
      subtitle="Handling and placement of inbound goods"
    >
      <PageSection title="Status filter">
        <Toggle
          label="Compact view"
          checked={dense}
          onChange={(e) => setDense(e.target.checked)}
        />;
          <DropdownMenu
            trigger={
              <Button variant="secondary">
                Filter status
              </Button>
            }
          >
            <SelectableList
              items={items}
              value={selected}
              onChange={setSelected}
            />
          </DropdownMenu>

          <Select
            label="Status"
            items={statusItems}
            value={statuses}
            onChange={setStatuses}
            placeholder="Filter by status"
          />

        {/* DEBUG */}
        <pre>{JSON.stringify(selected, null, 2)}</pre>
      </PageSection>

      <PageSection title="Putaway orders">
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
