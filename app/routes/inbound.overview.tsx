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
   STATUS → TAG RENDERER
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

export default function InboundPutaway() {
  /* =========================
     COLUMNS
     ========================= */

  const columns: DataTableColumn[] = [
    { key: "id", label: "PO", sortable: true },
    { key: "product", label: "Product", sortable: true },
    { key: "sku", label: "SKU", sortable: true },
    { key: "progress", label: "Progress", sortable: true },

    {
      key: "status",
      label: "Status",
      align: "center",
      renderCell: (value) =>
        renderStatusTag(String(value)),
    },

    { key: "operator", label: "Assigned operator", align: "center" },
    { key: "workstation", label: "Workstation", align: "center" },
    { key: "date", label: "Date", align: "center" },

    {
      key: "events",
      label: "Events",
      align: "center",
      renderCell: () => (
        <button
          type="button"
          className="btn--ghost"
          aria-label="View history"
          onClick={() => {
            console.log("open history");
          }}
        >
          <Icon name="history" size="sm" />
        </button>
      ),
    },
  ];

  /* =========================
     ROWS
     ========================= */

  const rows = [
    {
      id: 432170,
      product: "Bisgaard Winter Boots - Pixie - Khaki",
      sku: "WD750",
      progress: "2/3",
      status: "In progress",
      operator: "c.newman",
      workstation: "Port 01",
      date: "08-Jan-2026",
      events: "x",
    },
    {
      id: 432171,
      product: "Name It Jumpsuit - NkfRoka - Burgundy",
      sku: "WF773",
      progress: "5/11",
      status: "In progress",
      operator: "s.taylor",
      workstation: "Port 04",
      date: "08-Jan-2026",
      events: "x",
    },
    {
      id: 432174,
      product: "adidas Performance Shoes - Advantage 2.0",
      sku: "WF685",
      progress: "0/3",
      status: "Prepared",
      operator: "s.pittmann",
      workstation: "Port 02",
      date: "n/a",
      events: "x",
    },
    {
      id: 432175,
      product: "adidas Performance Shoes - VL Court 3.0 K",
      sku: "BS970",
      progress: "0/3",
      status: "Waiting",
      operator: "d.haugen",
      workstation: "Port 03",
      date: "n/a",
      events: "x",
    },
    {
      id: 432177,
      product: "Name It Blouse - Rib - Lavender Gray",
      sku: "WH768",
      progress: "11/11",
      status: "Completed",
      operator: "a.kovach",
      workstation: "Port 09",
      date: "08-Nov-2025",
      events: "x",
    },
  ];

  /* =========================
     RENDER
     ========================= */

  return (
    <PageLayout
      title="Putaway"
      subtitle="Handling and placement of inbound goods"
    >
      <PageSection>
        <ExpandableDataTable
          rowIdKey="id"
          columns={columns}
          rows={rows}
          renderExpandedRow={(row) => (
            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>User</th>
                  <th>Date</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Putaway started</td>
                  <td>{row.operator}</td>
                  <td>{row.date}</td>
                  <td>Initial scan</td>
                </tr>
                <tr>
                  <td>Item processed</td>
                  <td>{row.operator}</td>
                  <td>{row.date}</td>
                  <td>Progress update</td>
                </tr>
              </tbody>
            </table>
          )}

        />

      </PageSection>
    </PageLayout>
  );
}
