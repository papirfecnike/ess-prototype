import type { LoaderFunction } from "react-router";
import { useState } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";

import { SelectableDataTable } from "@/components/data/SelectableDataTable";
import type { DataTableColumn } from "@/components/data/DataTableCore";
import { Icon } from "@/components/ui/icon/Icon";
import { Select } from "@/components/ui/select/Select";
import { Toggle } from "@/components/ui/toggle/Toggle";


export const loader: LoaderFunction = async () => {
  return null;
};

export default function ControlIntLogs() {
  /* =========================
     STATE
     ========================= */

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [eventType, setEventType] = useState<string | null>("all");
  const [showDetails, setShowDetails] = useState(false);

  /* =========================
     COLUMNS
     ========================= */

  const columns: DataTableColumn[] = [
    { key: "eventId", label: "Event ID", sortable: true, filterable: true, width: 300 },
    { key: "eventType", label: "Event type", sortable: true, filterable: true, width: 390 },
    { key: "source", label: "Source", sortable: true, filterable: true, width: 340 },
    { key: "subject", label: "Subject", sortable: true, filterable: true, width: 360 },
    { key: "correlationId", label: "Correlation ID", sortable: true, filterable: true, width: 320 },
    { key: "time", label: "Created", sortable: true, filterable: true, width: 190 },
    {
      key: "more",
      label: "",
      align: "right",
      filterable: false,
      width: 48,
      renderCell: () => (
        <button type="button" className="btn--ghost" aria-label="More">
          <Icon name="moreVert" size="sm" />
        </button>
      ),
    },
  ];

  /* =========================
     ROWS
     ========================= */

  const rows = [
    "pick-task-deviation-handled",
    "create-picklist",
    "picklist-created",
    "pick-tasks-selected",
    "create-pick-task-group",
    "pick-task-group-created",
    "picklist-planned",
    "pick-task-group-started",
    "pick-tasks-selected",
    "pick-tasks-ready",
    "confirm-pick",
    "pick-tasks-added",
    "pick-tasks-added",
    "pick-tasks-added",
  ].map((event, index) => ({
    eventId: [
      "019c75e7-3e67-7562-9335-2dca13acf7b0",
      "019c75e6-25b2-75b2-b6ca-68d8869c1ff5",
      "019c75e6-28b5-70c1-8122-01372275b939",
      "019c75e7-3e9d-71a6-8292-62e832bfd649",
      "019c75e6-2e63-77ff-bd0f-2a4d8c10b23a",
    ][index % 5],
    eventType: `net.elementlogic.picking.${event}-v1`,
    source: index % 3 === 1 ? "camunda-message-bus-converter" : "http://elementlogic.net/source/PickingService",
    subject: `picking.TODO.0.${event}-v1`,
    correlationId: index % 4 === 0 ? "019c75e7-3e67-7562-9335-2dca13acf7b0" : "f2c626ff-dbf1-4c1e-8122-01372275b939",
    time: "2026-05-11T09:22:47",
    more: "",
  }));

  /* =========================
     RENDER
     ========================= */

  return (
    <PageLayout
      title="Integration logs"
      subtitle="Monitor incoming and outgoing messages between systems"
    >
      <PageSection>
        <SelectableDataTable
          rowIdKey="eventId"
          columns={columns}
          rows={rows}
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
          showCustomize={false}
          activeFiltersLabel="Filters"
          headerLeftActions={
            <Select
              label="Event type"
              value={eventType}
              onChange={setEventType}
              options={[
                { value: "all", label: "All" },
                { value: "pick-task", label: "Pick task" },
                { value: "picklist", label: "Picklist" },
              ]}
            />
          }
          headerActions={
            <div className="integration-logs__header-actions">
              <Toggle
                title="Show details"
                checked={showDetails}
                onCheckedChange={setShowDetails}
              />
            </div>
          }
        />
      </PageSection>
    </PageLayout>
  );
}
