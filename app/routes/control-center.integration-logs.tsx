import type { LoaderFunction } from "react-router";
import { useRef, useState } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";

import { DataTableCore } from "@/components/data/DataTableCore";
import type { DataTableColumn, DataTableRow } from "@/components/data/DataTableCore";
import { Button } from "@/components/ui/button/Button";
import { Icon } from "@/components/ui/icon/Icon";
import { Select } from "@/components/ui/select/Select";
import { TextField } from "@/components/ui/input/TextField";
import { DropdownMenu } from "@/components/ui/menu/DropdownMenu";
import "@/styles/integration-logs.css";


export const loader: LoaderFunction = async () => {
  return null;
};

export default function ControlIntLogs() {
  /* =========================
     STATE
     ========================= */

  const [eventType, setEventType] = useState<string | null>("all");
  const [selectedEvent, setSelectedEvent] = useState<DataTableRow | null>(null);
  const [openMenuEventId, setOpenMenuEventId] = useState<string | null>(null);
  const [jsonSearch, setJsonSearch] = useState("");
  const menuAnchorRef = useRef<HTMLElement | null>(null);

  /* =========================
     COLUMNS
     ========================= */

  const columns: DataTableColumn[] = [
    { key: "eventId", label: "Event ID", sortable: true, filterable: true, width: 320 },
    { key: "eventType", label: "Event type", sortable: true, filterable: true, width: 400 },
    { key: "source", label: "Source", sortable: true, filterable: true, width: 340 },
    { key: "subject", label: "Subject", sortable: true, filterable: true, width: 370 },
    { key: "correlationId", label: "Correlation ID", sortable: true, filterable: true, width: 320 },
    {
      key: "more",
      label: "",
      align: "right",
      filterable: false,
      width: 48,
      renderCell: (_value, row) => (
        <button
          type="button"
          className="btn--ghost"
          aria-label="More"
          ref={(el) => { if (openMenuEventId === String(row.id)) menuAnchorRef.current = el; }}
          onClick={(event) => {
            event.stopPropagation();
            setOpenMenuEventId(current => current === String(row.id) ? null : String(row.id));
          }}
        >
          <Icon name={openMenuEventId === String(row.id) ? "closeStroke" : "moreVert"} size="sm" />
        </button>
      ),
    },
  ];

  /* =========================
     ROWS
     ========================= */

  const rows: DataTableRow[] = [
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
    id: `event-${index}`,
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
    payload: JSON.stringify({
      taskGroupId: "019c75e6-2e2b-7922-95d0-d6f1e12a3300",
      task: {
        id: { value: `task-${index + 1}` },
        taskGroupId: { value: "019c75e6-2e2b-7922-95d0-d6f1e12a3300" },
        plannedQuantity: 5,
        pickedQuantity: 3,
        status: 60,
        stockItemId: { value: "stock-item-001" },
        itemMasterDataId: { value: "item-master-001" },
        picklistId: { value: "34256170701" },
        picklistLineId: { value: "3425617070101" },
        deviationReason: 1,
        deviationState: 1,
      },
      extension: null,
      commandCorrelationId: "019c75e7-3da4-7b9e-8a09-1aed4f774d2f",
    }, null, 2),
    more: "",
  }));

  const visibleRows = rows.filter(row => {
    if (eventType === "all") return true;
    return String(row.eventType).includes(String(eventType));
  });

  /* =========================
     RENDER
     ========================= */

  return (
    <PageLayout
      title="Integration logs"
      subtitle="Monitor incoming and outgoing messages between systems"
    >
      <PageSection>
        <DataTableCore
          rowIdKey="id"
          columns={columns}
          rows={visibleRows}
          showCustomize={false}
          onRowClick={setSelectedEvent}
          headerLeftActions={
            <Select
              label="Event type"
              value={eventType}
              searchable={false}
              onChange={setEventType}
              options={[
                { value: "all", label: "All" },
                { value: "pick-task", label: "Pick task" },
                { value: "picklist", label: "Picklist" },
              ]}
            />
          }
        />
        <DropdownMenu
          open={openMenuEventId !== null}
          anchorRef={menuAnchorRef}
          items={[
            { id: "edit", label: "Edit", icon: "edit" },
            { id: "delete", label: "Delete", icon: "delete", intent: "danger" },
          ]}
          onClose={() => setOpenMenuEventId(null)}
          onSelect={(id) => {
            const event = visibleRows.find(row => String(row.id) === openMenuEventId);
            if (id === "edit" && event) setSelectedEvent(event);
            setOpenMenuEventId(null);
          }}
        />
      </PageSection>

      {selectedEvent && (
        <aside className="event-log-drawer" aria-label="Event details">
          <div className="event-log-drawer__header">
            <div>
              <h2>Log detailed view</h2>
              <span>event type</span>
              <strong>#{selectedEvent.eventId}</strong>
              <span>Time</span>
            </div>
            <Button variant="icon" size="sm" onClick={() => setSelectedEvent(null)}>
              <Icon name="closeStroke" size="sm" />
            </Button>
          </div>

          <div className="event-log-drawer__content">
            <TextField
              type="search"
              label="Search in JSON"
              leadingIcon={<Icon name="search" size="sm" />}
              value={jsonSearch}
              onChange={(event) => setJsonSearch(event.target.value)}
            />

            <div className="event-log-drawer__payload-heading">
              <h3>Payload</h3>
              <div>
                <Button variant="icon" size="sm" aria-label="Edit payload">
                  <Icon name="edit" size="sm" />
                </Button>
                <Button variant="icon" size="sm" aria-label="Copy payload">
                  <Icon name="inventory" size="sm" />
                </Button>
              </div>
            </div>

            <div className="event-log-drawer__code">
              <pre>{String(selectedEvent.payload)}</pre>
            </div>
          </div>
        </aside>
      )}
    </PageLayout>
  );
}
