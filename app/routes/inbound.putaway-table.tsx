import type { LoaderFunction } from "react-router";
import { useState, useEffect, useMemo, useRef } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";
import { SelectableDataTable } from "@/components/data/SelectableDataTable";
import type { DataTableColumn } from "@/components/data/DataTableCore";
import { DropdownMenu } from "@/components/ui/menu/DropdownMenu";
import { Tag } from "@/components/ui/tag/Tag";
import { ScanInput } from "@/components/ui/scan-input/ScanInput";
import { Notification } from "@/components/ui/notification/Notification";
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

export default function InboundPutaway() {
  /* =========================
     STATE
     ========================= */

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [scanValue, setScanValue] = useState("");
  const [openMenuRowId, setOpenMenuRowId] = useState<string | null>(null);
  const menuAnchorRef = useRef<HTMLElement | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hiddenSkus, setHiddenSkus] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("putaway:completed");
    if (!raw) return;

    const { sku } = JSON.parse(raw);

    setHiddenSkus((prev) => [...prev, sku]);
    setShowNotification(true);

    sessionStorage.removeItem("putaway:completed");
  }, []);

  function handleConfirm() {
    if (!exactPreparedMatch) return;

    window.location.assign(
      `/inbound/putaway-product?sku=${exactPreparedMatch.sku}`
    );
  }

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
          onClick={() => {
            console.log("open history");
          }}
        >
          <Icon name="history" size="sm" />
        </button>
      ),
    },
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
              setOpenMenuRowId(
                isMenuOpen ? null : currentRowId
              );
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
     ROWS (ALL 11)
     ========================= */

  const rows = [
    {
      id: 432170,
      name: "Bisgaard Winter Boots - Pixie - Khaki",
      sku: "WD750",
      progress: "2/3",
      status: "In progress",
      operator: "c.newman",
      workstation: "Port 01, Port 02",
      date: "08-Jan-2026",
      events: "x",
      more: "",
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
      events: "x",
      more: "",
    },
    {
      id: 432172,
      name: "Minymo Cardigan - Knitted - Woodrose",
      sku: "BW975",
      progress: "7/9",
      status: "In progress",
      operator: "p.ramazotti",
      workstation: "Port 07, Port 08",
      date: "08-Jan-2026",
      events: "x",
      more: "",
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
      events: "x",
      more: "",
    },
    {
      id: 432174,
      name: "adidas Performance Shoes - VL Court 3.0 K",
      sku: "BS970",
      progress: "0/3",
      status: "Waiting",
      operator: "d.haugen",
      workstation: "Port 03",
      date: "n/a",
      events: "x",
      more: "",
    },
    {
      id: 432175,
      name: "Hust and Claire Dynevest – HCEmily – Pale Mauve",
      sku: "WA874",
      progress: "0/3",
      status: "Prepared",
      operator: "s.pittmann",
      workstation: "Port 02",
      date: "n/a",
      events: "x",
      more: "",
    },
    {
      id: 432176,
      name: "Name It Dynevest - NmfMylane - Woodrose m. Sløyfebånd",
      sku: "BX962",
      progress: "0/2",
      status: "Prepared",
      operator: "f.rickman",
      workstation: "Port 06",
      date: "n/a",
      events: "x",
      more: "",
    },
    {
      id: 432177,
      name: "Billieblush Dynevest – Peach",
      sku: "BV122",
      progress: "0/3",
      status: "Prepared",
      operator: "s.h.bergman",
      workstation: "Port 02",
      date: "n/a",
      events: "x",
      more: "",
    },
  ];



  const visibleRows = rows.filter(
    (row) => !hiddenSkus.includes(row.sku)
  );

  /* =========================
     EXACT MATCH LOGIC
     ========================= */

  const exactPreparedMatch = useMemo(() => {
    const q = scanValue.trim();
    if (!q) return null;

    return rows.find(
      (row) =>
        row.status === "Prepared" &&
        (String(row.id) === q ||
          row.sku.toUpperCase() === q.toUpperCase() ||
          row.name.toUpperCase() === q.toUpperCase())
    );
  }, [scanValue, rows]);

  const canConfirm = Boolean(exactPreparedMatch);

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
          rows={visibleRows}
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
        />
        
        <DropdownMenu
          open={openMenuRowId !== null}
          anchorRef={menuAnchorRef}
          items={[
            { id: "putaway", label: "Put away" },
            { id: "edit", label: "Edit" },
            { id: "delete", label: "Delete", intent: "danger" },
          ]}
          onClose={() => setOpenMenuRowId(null)}
          onSelect={(actionId) => {
            console.log("action:", actionId, "row:", openMenuRowId);
            setOpenMenuRowId(null);
          }}
        />
      </PageSection>

      {showNotification && (
        <Notification
          intent="success"
          title="Putaway completed"
          message="Product successfully put away."
          onClose={() => setShowNotification(false)}
        />
      )}
    </PageLayout>
  );
}
