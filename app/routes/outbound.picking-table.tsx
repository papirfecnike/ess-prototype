import type { LoaderFunction } from "react-router";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";


import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";

import { SelectableDataTable } from "@/components/data/SelectableDataTable";
import type { DataTableColumn } from "@/components/data/DataTableCore";
import { Tag } from "@/components/ui/tag/Tag";
import { Icon } from "@/components/ui/icon/Icon";

import { ScanInput } from "@/components/ui/scan-input/ScanInput";

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

export default function OutboundPickingTable() {
  /* =========================
     STATE
     ========================= */

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [scanValue, setScanValue] = useState("");
  const navigate = useNavigate();


  /* =========================
     COLUMNS
     ========================= */

  const columns: DataTableColumn[] = [
    { key: "id", label: "PO", sortable: true },
    { key: "name", label: "Product", sortable: true },
    { key: "sku", label: "SKU", sortable: true },
    { key: "progress", label: "Progress", sortable: true },
    {
      key: "status",
      label: "Status",
      align: "center",
      renderCell: (value) => renderStatusTag(String(value)),
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
          onClick={() => console.log("open history")}
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
      name: "Bisgaard Winter Boots - Pixie - Khaki",
      sku: "WD750",
      progress: "2/3",
      status: "In progress",
      operator: "c.newman",
      workstation: "Port 01",
      date: "08-Jan-2026",
    },
    {
      id: 432171,
      name: "Name It Jumpsuit - NkfRoka - Burgundy",
      sku: "WF773",
      progress: "5/11",
      status: "In progress",
      operator: "s.taylor",
      workstation: "Port 04",
      date: "08-Jan-2026",
    },
    {
      id: 432172,
      name: "Minymo Cardigan - Knitted - Woodrose",
      sku: "BW975",
      progress: "7/9",
      status: "In progress",
      operator: "p.ramazotti",
      workstation: "Port 07",
      date: "08-Jan-2026",
    },
    {
      id: 432173,
      name: "Minymo Cardigan w. Teddy - Parisian Night",
      sku: "WC551",
      progress: "2/6",
      status: "In progress",
      operator: "i.d.hoffmann",
      workstation: "Port 05",
      date: "08-Jan-2026",
    },
    {
      id: 432174,
      name: "adidas Performance Shoes - Advantage 2.0",
      sku: "WF685",
      progress: "0/3",
      status: "Prepared",
      operator: "s.pittmann",
      workstation: "Port 02",
      date: "n/a",
    },
    {
      id: 432175,
      name: "adidas Performance Shoes - VL Court 3.0 K",
      sku: "BS970",
      progress: "0/3",
      status: "Waiting",
      operator: "d.haugen",
      workstation: "Port 03",
      date: "n/a",
    },
    {
      id: 432176,
      name: "adidas Performance Shoes - Run 70s 2.0 EL C",
      sku: "BM841",
      progress: "0/2",
      status: "Prepared",
      operator: "f.rickman",
      workstation: "Port 06",
      date: "n/a",
    },
    {
      id: 432177,
      name: "Name It Blouse - Rib - Lavender Gray",
      sku: "WH768",
      progress: "11/11",
      status: "Completed",
      operator: "a.kovach",
      workstation: "Port 09",
      date: "08-Nov-2025",
    },
    {
      id: 432178,
      name: "Name It Blouses - 2-Pack - Iceland Fossil/Flint Stone",
      sku: "WG096",
      progress: "9/9",
      status: "Completed",
      operator: "j.braathen",
      workstation: "Port 04",
      date: "08-Nov-2025",
    },
    {
      id: 432179,
      name: "Billieblush Dynevest - Peach",
      sku: "BV122",
      progress: "11/11",
      status: "Completed",
      operator: "j.tenner",
      workstation: "Port 11",
      date: "08-Nov-2025",
    },
    {
      id: 432180,
      name: "Name It Blouses - 2-Pack - Iceland Fossil/Flint Stone",
      sku: "WG096",
      progress: "9/9",
      status: "Completed",
      operator: "j.braathen",
      workstation: "Port 04",
      date: "08-Nov-2025",
    },
  ];

  /* =========================
     FILTER LOGIC
     ========================= */

  const filteredRows = useMemo(() => {
    if (!scanValue.trim()) return rows;

    const q = scanValue.toLowerCase();

    return rows.filter((row) =>
      [row.id, row.name, row.sku].some((value) =>
        String(value).toLowerCase().includes(q)
      )
    );
  }, [scanValue, rows]);

  const hasMatch = filteredRows.length > 0;

  /* =========================
     HANDLERS
     ========================= */

    function handleConfirm() {
      if (!hasMatch) return;

      const matchedRow = filteredRows[0];

      window.location.href =
        `/outbound/picking-product`;
    }


  /* =========================
     RENDER
     ========================= */

  return (
    <PageLayout
      title={
        <ScanInput
          value={scanValue}
          onChange={(e) => setScanValue(e.target.value)}
          onSubmit={handleConfirm}
          isDisabled={!hasMatch}
          buttonLabel="Confirm"
        />
      }
    >
      <PageSection>
        <SelectableDataTable
          rowIdKey="id"
          columns={columns}
          rows={hasMatch ? filteredRows : []}
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
        />
      </PageSection>
    </PageLayout>
  );
}
