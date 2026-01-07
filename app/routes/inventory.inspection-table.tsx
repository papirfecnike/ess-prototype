import type { LoaderFunction } from "react-router";
import { useMemo, useState, useRef } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";

import { SelectableDataTable } from "@/components/data/SelectableDataTable";
import type { DataTableColumn } from "@/components/data/DataTableCore";
import { DropdownMenu } from "@/components/ui/menu/DropdownMenu";
import { Tag } from "@/components/ui/tag/Tag";
import { Icon } from "@/components/ui/icon/Icon";

import { ScanInput } from "@/components/ui/scan-input/ScanInput";

export const loader: LoaderFunction = async () => {
  return null;
};

/* =========================
   STATUS → TAG (ha később kell)
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

export default function InventoryInspection() {
  /* =========================
     STATE
     ========================= */

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [scanValue, setScanValue] = useState("");
  const [openMenuRowId, setOpenMenuRowId] = useState<string | null>(null);
  const menuAnchorRef = useRef<HTMLElement | null>(null);

  /* =========================
     COLUMNS
     ========================= */

  const columns: DataTableColumn[] = [
    { key: "id", label: "Batch ID", sortable: true },
    { key: "product", label: "Product", sortable: true },
    { key: "sku", label: "SKU", sortable: true },
    { key: "compartment", label: "Compartment ID", sortable: true },
    { key: "maxcapacity", label: "Max. capacity", align: "center" },
    { key: "currentqty", label: "Current qty", align: "center" },
    {
      key: "more",
      label: "",
      align: "right",
      renderCell: (_value, row) => {
        const currentRowId = String(row.id);
        const isMenuOpen = openMenuRowId === currentRowId;

        return (
          <button
            type="button"
            className="btn--ghost"
            aria-label="More"
            ref={(el) => {
              if (isMenuOpen) {
                menuAnchorRef.current = el;
              }
            }}
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenuRowId(isMenuOpen ? null : currentRowId);
            }}
          >
            <Icon
              name={isMenuOpen ? "closeStroke" : "moreVert"}
              size="sm"
            />
          </button>
        );
      },
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
      compartment: "AS-887652-01-01",
      maxcapacity: "12",
      currentqty: "23",
      more: "",
    },
    {
      id: 432171,
      product: "Name It Jumpsuit - NkfRoka - Burgundy",
      sku: "WF773",
      compartment: "AS-887652-01-01",
      maxcapacity: "12",
      currentqty: "45",
      more: "",
    },
    {
      id: 432172,
      product: "Minymo Cardigan - Knitted - Woodrose",
      sku: "BW975",
      compartment: "AS-887652-01-01",
      maxcapacity: "12",
      currentqty: "56",
      more: "",
    },
    {
      id: 432173,
      product: "Minymo Cardigan w. Teddy - Parisian Night",
      sku: "WC551",
      compartment: "AS-887652-01-01",
      maxcapacity: "12",
      currentqty: "72",
      more: "",
    },
  ];

  /* =========================
     FILTER (substring search)
     ========================= */

  const filteredRows = useMemo(() => {
    if (!scanValue.trim()) return rows;

    const q = scanValue.toLowerCase();

    return rows.filter((row) =>
      [row.id, row.sku, row.product].some((value) =>
        String(value).toLowerCase().includes(q)
      )
    );
  }, [scanValue, rows]);

  /* =========================
     EXACT MATCH (ID vagy SKU)
     ========================= */

  const exactMatch = useMemo(() => {
    const q = scanValue.trim();
    if (!q) return null;

    return rows.find(
      (row) =>
        String(row.id) === q ||
        row.sku.toLowerCase() === q.toLowerCase()
    );
  }, [scanValue, rows]);

  const canConfirm = Boolean(exactMatch);

  /* =========================
     HANDLERS
     ========================= */

  function handleConfirm() {
    if (!exactMatch) return;

    window.location.href = `/inventory/inspection-product`;
  }

  function handleSelectionChange(rowIds: string[]) {
    if (!exactMatch) {
      setSelectedRows([]);
      return;
    }

    const allowedId = String(exactMatch.id);
    setSelectedRows(rowIds.filter((id) => id === allowedId));
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
          isDisabled={!canConfirm}
          buttonLabel="Confirm"
        />
      }
    >
      <PageSection>
        <SelectableDataTable
          rowIdKey="id"
          columns={columns}
          rows={filteredRows}
          selectedRows={selectedRows}
          onSelectionChange={handleSelectionChange}
        />
      </PageSection>

      <DropdownMenu
        open={openMenuRowId !== null}
        anchorRef={menuAnchorRef}
        items={[
          { id: "inspect", label: "Inspect" },
          { id: "edit", label: "Edit" },
          { id: "delete", label: "Delete", intent: "danger" },
        ]}
        onClose={() => setOpenMenuRowId(null)}
        onSelect={(actionId) => {
          console.log("action:", actionId, "row:", openMenuRowId);
          setOpenMenuRowId(null);
        }}
      />
    </PageLayout>
  );
}
