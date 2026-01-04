import type { LoaderFunction } from "react-router";
import { useState } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";

import { SelectableDataTable } from "@/components/data/SelectableDataTable";
import type { DataTableColumn } from "@/components/data/DataTableCore";
import { Tag } from "@/components/ui/tag/Tag";
import { Icon } from "@/components/ui/icon/Icon";

import { ScanInput } from "@/components/inputs/ScanInput";


export const loader: LoaderFunction = async () => {
  return null;
};

/* =========================
   STATUS → TAG MAPPING
   ========================= */

function renderStatusTag(status: string) {
  switch (status) {
    case "In progress":
      return <Tag label={status} variant="warning" />;

    case "Prepared":
      return <Tag label={status} variant="default" />;

    case "Waiting":
      return <Tag label={status} variant="danger" />;

    case "Completed":
      return <Tag label={status} variant="success" />;

    default:
      return <Tag label={status} />;
  }
}

export default function ControlIntLogs() {
  /* =========================
     STATE
     ========================= */

  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  /* =========================
     COLUMNS
     ========================= */

  const columns: DataTableColumn[] = [
    { key: "eventid", label: "Event ID", sortable: true },
    { key: "time", label: "Time", sortable: true },
    { key: "date", label: "Date", sortable: true },
    { key: "orderid", label: "Order ID", sortable: true },
    { key: "eventtype", label: "Event type", align: "center" },
    { key: "endpoint", label: "Endpoint", align: "center" },
  
    {
      key: "status",
      label: "Status",
      align: "center",
      renderCell: (value) =>
        renderStatusTag(String(value)),
    },

    { key: "description", label: "Description", align: "center" },

  ];

  /* =========================
     ROWS
     ========================= */

  const rows = [
    {
      eventid: 432170,
      time: "14:31:45",
      date: "08-Nov-2025",
      orderid: "PO-12349",
      eventtype: "Outgoing message",
      endpoint: "Send to AutoStore",
      status: "In progress",
      description: "New order successfully created in WMS",
    },
    {
      eventid: 432171,
      time: "14:29:57",
      date: "08-Nov-2025",
      orderid: "PO-12351",
      eventtype: "Incoming message",
      endpoint: "PortCreate the product",
      status: "In progress",
      description: "-",
    },
    {
      eventid: 432172,
      time: "14:24:11",
      date: "08-Nov-2025",
      orderid: "PO-12354",
      eventtype: "Transformation",
      endpoint: "n/a",
      status: "In progress",
      description: "-",
    },
    {
      eventid: 432173,
      time: "14:21:02",
      date: "08-Nov-2025",
      orderid: "PO-12351",
      eventtype: "Create picklist",
      endpoint: "Pick list",
      status: "In progress",
      description: "-",
    },
    {
      eventid: 432174,
      time: "14:18:45",
      date: "08-Nov-2025",
      orderid: "PO-12349",
      eventtype: "Incoming message",
      endpoint: "Update inventory",
      status: "Prepared",
      description: "-",
    },
    {
      eventid: 432175,
      time: "14:14:32",
      date: "08-Nov-2025",
      orderid: "PO-12349",
      eventtype: "Incoming message",
      endpoint: "Receive order",
      status: "Waiting",
      description: "-",
    },
    {
      eventid: 432176,
      time: "14:02:51",
      date: "08-Nov-2025",
      orderid: "PO-12349",
      eventtype: "Create picklist",
      endpoint: "Transfer list",
      status: "Prepared",
      description: "-",
    },
    {
      eventid: 432177,
      time: "14:01:03",
      date: "08-Nov-2025",
      orderid: "PO-12351",
      eventtype: "Create picklist",
      endpoint: "Pick list",
      status: "Completed",
      description: "-",
    },
    {
      eventid: 432178,
      time: "13:58:45",
      date: "08-Nov-2025",
      orderid: "PO-12349",
      eventtype: "Transformation",
      endpoint: "n/a",
      status: "Completed",
      description: "-",
    },
    {
      eventid: 432179,
      time: "13:55:45",
      date: "08-Nov-2025",
      orderid: "PO-12349",
      eventtype: "Outgoing message",
      endpoint: "Send to AutoStore",
      status: "Completed",
      description: "-",
    },
    {
      eventid: 432180,
      time: "13:51:42",
      date: "08-Nov-2025",
      orderid: "PO-12349",
      eventtype: "Outgoing message",
      endpoint: "Send to AutoStore",
      status: "Completed",
      description: "-",
    },
    {
      eventid: 432181,
      time: "14:47:09",
      date: "08-Nov-2025",
      orderid: "PO-12349",
      eventtype: "Outgoing message",
      endpoint: "Send to AutoStore",
      status: "Completed",
      description: "-",
    },
  ];

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
          rowIdKey="eventid"
          columns={columns}
          rows={rows}
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
        />
      </PageSection>
    </PageLayout>
  );
}
