import type { LoaderFunction } from "react-router";
import { useState } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";

import { DataTableCore } from "@/components/data/DataTableCore";
import type { DataTableColumn, DataTableRow } from "@/components/data/DataTableCore";
import { Button } from "@/components/ui/button/Button";
import { Icon } from "@/components/ui/icon/Icon";
import { Select } from "@/components/ui/select/Select";
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
          onClick={(event) => {
            event.stopPropagation();
            setSelectedEvent(row);
          }}
        >
          <Icon name="moreVert" size="sm" />
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
              onChange={setEventType}
              options={[
                { value: "all", label: "All" },
                { value: "pick-task", label: "Pick task" },
                { value: "picklist", label: "Picklist" },
              ]}
            />
          }
        />
      </PageSection>

      {selectedEvent && (
        <aside className="event-log-drawer" aria-label="Event details">
          <div className="event-log-drawer__header">
            <div>
              <h2>Event details</h2>
              <span>{selectedEvent.time}</span>
            </div>
            <Button variant="icon" size="sm" onClick={() => setSelectedEvent(null)}>
              <Icon name="closeStroke" size="sm" />
            </Button>
          </div>

          <div className="event-log-drawer__content">
            <div className="event-log-drawer__section">
              <span className="event-log-drawer__label">Event ID</span>
              <strong>{selectedEvent.eventId}</strong>
            </div>
            <div className="event-log-drawer__section">
              <span className="event-log-drawer__label">Event type</span>
              <strong>{selectedEvent.eventType}</strong>
            </div>
            <div className="event-log-drawer__section">
              <span className="event-log-drawer__label">Source</span>
              <span>{selectedEvent.source}</span>
            </div>
            <div className="event-log-drawer__section">
              <span className="event-log-drawer__label">Subject</span>
              <span>{selectedEvent.subject}</span>
            </div>
            <div className="event-log-drawer__section">
              <span className="event-log-drawer__label">Correlation ID</span>
              <span>{selectedEvent.correlationId}</span>
            </div>
            <div className="event-log-drawer__section event-log-drawer__section--payload">
              <span className="event-log-drawer__label">Payload preview</span>
              <code>
                {JSON.stringify({
                  eventId: selectedEvent.eventId,
                  subject: selectedEvent.subject,
                  status: "summary",
                }, null, 2)}
              </code>
            </div>
          </div>
        </aside>
      )}
    </PageLayout>
  );
}
