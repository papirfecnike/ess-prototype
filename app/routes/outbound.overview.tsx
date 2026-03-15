import type { LoaderFunction } from "react-router";
import { useMemo, useState } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";

import { ExpandableDataTable } from "@/components/data/ExpandableDataTable";
import type { DataTableColumn } from "@/components/data/DataTableCore";

import { Tag } from "@/components/ui/tag/Tag";
import { Chip } from "@/components/ui/chip/Chip";
import { Icon } from "@/components/ui/icon/Icon";

export const loader: LoaderFunction = async () => null;

/* =========================
   STATUS → TAG
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

export default function OutboundOverview() {

  const [activeStatuses, setActiveStatuses] = useState<string[]>([]);

  /* =========================
     COLUMNS
  ========================= */

  const columns: DataTableColumn[] = [
    { key: "id", label: "Picklist ID", sortable: true },
    { key: "order", label: "Order ID", sortable: true },
    { key: "created", label: "Created", sortable: true },
    { key: "pickdate", label: "Pick date", sortable: true },
    { key: "deliverydate", label: "Delivery date", align: "center" },
    { key: "priority", label: "Priority", align: "center" },
    { key: "noitems", label: "No. of items", align: "center" },
    {
      key: "status",
      label: "Status",
      align: "center",
      renderCell: (value) => renderStatusTag(String(value)),
    },
    {
      key: "actions",
      label: "",
      align: "center",
      renderCell: () => (
        <button
          type="button"
          className="btn--ghost"
          aria-label="Actions"
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
     DATA (same as picking)
  ========================= */

  const rows = [
    {
      id: 9305204750,
      order: 2784741143,
      created: "08-Jan-2026 14:48:45",
      pickdate: "08-Jan-2026",
      deliverydate: "11-Jan-2026 21:00:00",
      priority: "50",
      noitems: "8",
      status: "In progress",
    },
    {
      id: 9305204751,
      order: 2784741144,
      created: "08-Jan-2026 14:42:12",
      pickdate: "08-Jan-2026",
      deliverydate: "11-Jan-2026 21:00:00",
      priority: "50",
      noitems: "4",
      status: "In progress",
    },
    {
      id: 9305204752,
      order: 2784741145,
      created: "08-Jan-2026 14:39:37",
      pickdate: "08-Jan-2026",
      deliverydate: "11-Jan-2026 21:00:00",
      priority: "50",
      noitems: "4",
      status: "In progress",
    },
    {
      id: 9305204753,
      order: 2784741146,
      created: "08-Jan-2026 14:34:29",
      pickdate: "08-Jan-2026",
      deliverydate: "11-Jan-2026 21:00:00",
      priority: "50",
      noitems: "4",
      status: "Prepared",
    },
    {
      id: 9305204754,
      order: 2784741147,
      created: "08-Jan-2026 14:34:29",
      pickdate: "08-Jan-2026",
      deliverydate: "11-Jan-2026 21:00:00",
      priority: "50",
      noitems: "4",
      status: "Prepared",
    },
    {
      id: 9305204755,
      order: 2784741148,
      created: "08-Jan-2026 14:34:29",
      pickdate: "08-Jan-2026",
      deliverydate: "11-Jan-2026 21:00:00",
      priority: "50",
      noitems: "4",
      status: "Waiting",
    },
    {
      id: 9305204756,
      order: 2784741149,
      created: "08-Jan-2026 14:34:29",
      pickdate: "08-Jan-2026",
      deliverydate: "11-Jan-2026 21:00:00",
      priority: "50",
      noitems: "4",
      status: "Prepared",
    },
    {
      id: 930520457,
      order: 2784741150,
      created: "08-Jan-2026 14:34:29",
      pickdate: "08-Jan-2026",
      deliverydate: "11-Jan-2026 21:00:00",
      priority: "1",
      noitems: "4",
      status: "Completed",
    },
    {
      id: 930520458,
      order: 2784741151,
      created: "08-Jan-2026 14:34:29",
      pickdate: "08-Jan-2026",
      deliverydate: "11-Jan-2026 21:00:00",
      priority: "1",
      noitems: "4",
      status: "Completed",
    },
    {
      id: 930520459,
      order: 2784741152,
      created: "08-Jan-2026 14:34:29",
      pickdate: "08-Jan-2026",
      deliverydate: "11-Jan-2026 21:00:00",
      priority: "1",
      noitems: "4",
      status: "Completed",
    },
    {
      id: 930520460,
      order: 2784741153,
      created: "08-Jan-2026 14:34:29",
      pickdate: "08-Jan-2026",
      deliverydate: "11-Jan-2026 21:00:00",
      priority: "1",
      noitems: "4",
      status: "Completed",
    },
  ];

  /* =========================
     CHIP FILTER
  ========================= */

  function toggleStatus(status: string) {
    setActiveStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  }

  const filteredRows = useMemo(() => {
    if (activeStatuses.length === 0) return rows;

    return rows.filter((row) =>
      activeStatuses.includes(row.status)
    );
  }, [rows, activeStatuses]);

  /* =========================
     STATUS STATS
  ========================= */

  const statusStats = useMemo(() => {
    const map: Record<string, number> = {};

    rows.forEach((row) => {
      map[row.status] = (map[row.status] ?? 0) + 1;
    });

    return Object.entries(map);
  }, [rows]);

  /* =========================
     DETAILS CONTENT
  ========================= */

  const detailsContent = (
    <>
      <div className="data-table__text">STATUS</div>

      <div className="data-table__chips">
        {statusStats.map(([status, count]) => (
          <Chip
            key={status}
            isActive={activeStatuses.includes(status)}
            onClick={() => toggleStatus(status)}
          >
            {status} ({count})
          </Chip>
        ))}
      </div>
    </>
  );

  /* =========================
     RENDER
  ========================= */

  return (
    <PageLayout
      title="Picking"
      subtitle="Overview of all outbound operations and customer orders"
    >
      <PageSection>
        <ExpandableDataTable
          rowIdKey="id"
          columns={columns}
          rows={filteredRows}
          headerVariant="statusSplit"
          detailsContent={detailsContent}
          renderExpandedRow={() => (
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
    </PageLayout>
  );
}