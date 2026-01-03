import type { LoaderFunction } from "react-router";
import { useState } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";

import { ExpandableDataTable } from "@/components/data/ExpandableDataTable";
import type { DataTableColumn } from "@/components/data/DataTableCore";
import { Tag } from "@/components/ui/tag/Tag";
import { Icon } from "@/components/ui/icon/Icon";

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

export default function OutboundPicking() {
  /* =========================
     COLUMNS
     ========================= */

  const columns: DataTableColumn[] = [
    { key: "picklist", label: "Picklist", sortable: true },
    { key: "order", label: "Order #", sortable: true },
    { key: "created", label: "Created", sortable: true },
    { key: "pickdate", label: "Pick date", sortable: true },
    { key: "deliverydate", label: "Delivery date", align: "center" },
    { key: "priority", label: "Priority", align: "center" },
    { key: "noitems", label: "# of items", align: "center" },
    {
      key: "status",
      label: "Status",
      align: "center",
      renderCell: (value) =>
        renderStatusTag(String(value)),
    },
    {
      key: "actions",
      label: "",
      align: "center",
      renderCell: () => (
        <button
          type="button"
          className="btn--ghost"
          aria-label="View history"
          onClick={() => {
            console.log("open actions");
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

  const rows = [
    {
      picklist: 9305204751,
      order: "2784741143",
      created: "08-Jan-2026 15:29:17",
      pickdate: "09-Jan-2026",
      deliverydate: "14-Jan-2026 21:00:00",
      priority: "50",
      noitems: "4",
      status: "In progress",
    },
    {
      picklist: 9305204752,
      order: "2784741144",
      created: "08-Jan-2026 15:29:17",
      pickdate: "09-Jan-2026",
      deliverydate: "14-Jan-2026 21:00:00",
      priority: "50",
      noitems: "2",
      status: "In progress",
    },
    {
      picklist: 9305204753,
      order: "2784741145",
      created: "08-Jan-2026 15:29:17",
      pickdate: "09-Jan-2026",
      deliverydate: "14-Jan-2026 21:00:00",
      priority: "50",
      noitems: "3",
      status: "In progress",
    },
    {
      picklist: 9305204754,
      order: "2784741146",
      created: "08-Jan-2026 15:29:17",
      pickdate: "09-Jan-2026",
      deliverydate: "14-Jan-2026 21:00:00",
      priority: "50",
      noitems: "3",
      status: "In progress",
    },
    {
      picklist: 9305204755,
      order: "2784741147",
      created: "08-Jan-2026 15:29:17",
      pickdate: "09-Jan-2026",
      deliverydate: "14-Jan-2026 21:00:00",
      priority: "50",
      noitems: "2",
      status: "Prepared",
    },
    {
      picklist: 9305204756,
      order: "2784741148",
      created: "08-Jan-2026 15:29:17",
      pickdate: "09-Jan-2026",
      deliverydate: "14-Jan-2026 21:00:00",
      priority: "50",
      noitems: "1",
      status: "Waiting",
    },
    {
      picklist: 9305204757,
      order: "2784741149",
      created: "08-Jan-2026 15:29:17",
      pickdate: "09-Jan-2026",
      deliverydate: "14-Jan-2026 21:00:00",
      priority: "50",
      noitems: "5",
      status: "Prepared",
    },
    {
      picklist: 9305204758,
      order: "2784741150",
      created: "08-Jan-2026 15:29:17",
      pickdate: "09-Jan-2026",
      deliverydate: "14-Jan-2026 21:00:00",
      priority: "50",
      noitems: "2",
      status: "Completed",
    },
    {
      picklist: 9305204759,
      order: "2784741151",
      created: "08-Jan-2026 15:29:17",
      pickdate: "09-Jan-2026",
      deliverydate: "14-Jan-2026 21:00:00",
      priority: "50",
      noitems: "3",
      status: "Completed",
    },
    {
      picklist: 9305204760,
      order: "2784741152",
      created: "08-Jan-2026 15:29:17",
      pickdate: "09-Jan-2026",
      deliverydate: "14-Jan-2026 21:00:00",
      priority: "50",
      noitems: "6",
      status: "Completed",
    },
    {
      picklist: 9305204761,
      order: "2784741153",
      created: "08-Jan-2026 15:29:17",
      pickdate: "09-Jan-2026",
      deliverydate: "14-Jan-2026 21:00:00",
      priority: "01",
      noitems: "7",
      status: "Completed",
    },
  ];

  /* =========================
     RENDER
     ========================= */

  return (
  <PageSection>
    <ExpandableDataTable
      rowIdKey="picklist"
      columns={columns}
      rows={rows}
      renderExpandedRow={(row) => (
        <table>
          <thead>
            <tr>
              <th>Production ID</th>
              <th>Location type</th>
              <th>Location ID</th>
              <th>Location capacity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>WD750-01</td>
              <td>1/4 bin</td>
              <td>AS-326437-04-01</td>
              <td>12/80</td>
              <td>In progress</td>
            </tr>
            <tr>
              <td>WD750-01</td>
              <td>1/4 bin</td>
              <td>AS-322439-04-04</td>
              <td>30/80</td>
              <td>Prepared</td>
            </tr>
          </tbody>
        </table>
      )}
    />
  </PageSection>
  );
}