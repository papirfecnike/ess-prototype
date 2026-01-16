import type { LoaderFunction } from "react-router";
import { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";

import { SelectableDataTable } from "@/components/data/SelectableDataTable";
import type { DataTableColumn } from "@/components/data/DataTableCore";
import { DropdownMenu } from "@/components/ui/menu/DropdownMenu";
import { Tag } from "@/components/ui/tag/Tag";
import { ScanInput } from "@/components/ui/scan-input/ScanInput";
import { Notification } from "@/components/ui/notification/Notification";
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

type Row = {
  id: number;
  product: string;
  sku: string;
  compartment: string;
  maxcapacity: string;
  currentqty: string;
};

export default function InventoryInspection() {
  const [scanValue, setScanValue] = useState("");
  const [openMenuRowId, setOpenMenuRowId] = useState<string | null>(null);
  const menuAnchorRef = useRef<HTMLElement | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  /* =========================
     BASE ROWS (STATEFUL)
     ========================= */

 const INITIAL_ROWS: Row[] = [
    {
      id: 9875,
      product: "Bisgaard Winter Boots - Pixie - Khaki",
      sku: "WD750",
      compartment: "AS-887652-01-01",
      maxcapacity: "12",
      currentqty: "23",
    },
    {
      id: 9876,
      product: "Name It Jumpsuit - NkfRoka - Burgundy",
      sku: "WF773",
      compartment: "AS-887652-01-01",
      maxcapacity: "12",
      currentqty: "45",
    },
    {
      id: 9877,
      product: "Minymo Cardigan - Knitted - Woodrose",
      sku: "BW975",
      compartment: "AS-887652-01-01",
      maxcapacity: "12",
      currentqty: "56",
    },
    {
      id: 9878,
      product: "Minymo Cardigan w. Teddy - Parisian Night",
      sku: "WC551",
      compartment: "AS-887652-01-01",
      maxcapacity: "12",
      currentqty: "72",
    },
  ];

  const [rows, setRows] = useState<Row[]>(INITIAL_ROWS);

useEffect(() => {
  const raw = sessionStorage.getItem("inspection:completedIds");
  if (!raw) return;

  const completedIds: number[] = JSON.parse(raw);

  setRows(
    INITIAL_ROWS.filter(r => !completedIds.includes(r.id))
  );

  setShowNotification(true);
}, []);

  /* =========================
     HANDLE RETURN FROM PRODUCT
     ========================= */

useEffect(() => {
  const completedRaw = sessionStorage.getItem("inspection:completedIds");
  if (!completedRaw) return;

  const completedIds: number[] = JSON.parse(completedRaw);

  setRows(
    INITIAL_ROWS.filter((row) => !completedIds.includes(row.id))
  );

  setShowNotification(true);
}, []);

useEffect(() => {
  const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;

  if (nav?.type === "reload") {
    sessionStorage.removeItem("inspection:completedIds");
  }
}, []);

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
            ref={(el) => {
              if (isMenuOpen) menuAnchorRef.current = el;
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
     FILTER + MATCH
     ========================= */

  const filteredRows = useMemo(() => {
    if (!scanValue.trim()) return rows;
    const q = scanValue.toLowerCase();
    return rows.filter((row) =>
      [row.id, row.sku, row.product].some((v) =>
        String(v).toLowerCase().includes(q)
      )
    );
  }, [scanValue, rows]);

  const exactMatch = useMemo(() => {
    const q = scanValue.trim();
    if (!q) return null;
    return rows.find(
      (r) =>
        String(r.id) === q || r.sku.toLowerCase() === q.toLowerCase()
    );
  }, [scanValue, rows]);

  /* =========================
     NAVIGATION
     ========================= */

  function handleConfirm() {
    if (!exactMatch) return;

    navigate(
      `/inventory/inspection-product?id=${exactMatch.id}&sku=${exactMatch.sku}`
    );
  }

  return (
    <PageLayout
      title={
        <ScanInput
          value={scanValue}
          onChange={(e) => setScanValue(e.target.value)}
          onSubmit={handleConfirm}
          isDisabled={!exactMatch}
          buttonLabel="Confirm"
        />
      }
    >
      <PageSection>
        <SelectableDataTable
          rowIdKey="id"
          columns={columns}
          rows={filteredRows}
          selectedRows={exactMatch ? [String(exactMatch.id)] : []}
          onSelectionChange={() => {}}
        />
      </PageSection>

      <DropdownMenu
        open={openMenuRowId !== null}
        anchorRef={menuAnchorRef}
        items={[{ id: "inspect", label: "Inspect" }]}
        onClose={() => setOpenMenuRowId(null)}
        onSelect={() => setOpenMenuRowId(null)}
      />

      {showNotification && (
        <Notification
          intent="success"
          title="Inspection completed"
          message="Product has been inspected successfully."
          onClose={() => setShowNotification(false)}
        />
      )}
    </PageLayout>
  );
}
