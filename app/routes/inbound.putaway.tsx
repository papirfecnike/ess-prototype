import type { LoaderFunction } from "react-router";
import { useState } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";

import { SelectableDataTable } from "@/components/data/SelectableDataTable";
import { ExpandableDataTable } from "@/components/data/ExpandableDataTable";
import type { DataTableColumn } from "@/components/data/DataTableCore";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function InboundPutaway() {
  /* =========================
     STATE
     ========================= */

  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  /* =========================
     DOMAIN COLUMNS
     ========================= */

  const columns: DataTableColumn[] = [
    { key: "id", label: "ID", sortable: true },
    { key: "name", label: "Name", sortable: true },
    { key: "status", label: "Status", align: "center" },
  ];

  /* =========================
     ROWS
     ========================= */

  const rows = [
    { id: 1, name: "Order A", status: "Open" },
    { id: 2, name: "Order B", status: "Closed" },
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
        {/* SELECTABLE TABLE */}
        <SelectableDataTable
          rowIdKey="id"
          columns={columns}
          rows={rows}
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
        />

        {/* EXPANDABLE TABLE */}
        <ExpandableDataTable
          rowIdKey="id"
          columns={columns}
          rows={rows}
          renderExpandedRow={(row) => (
            <div>
              <strong>Extra info</strong>
              <div>ID: {row.id}</div>
              <div>Name: {row.name}</div>
              <div>Status: {row.status}</div>
            </div>
          )}
        />
      </PageSection>
    </PageLayout>
  );
}
