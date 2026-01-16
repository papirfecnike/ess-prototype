import type { LoaderFunction } from "react-router";
import { useMemo, useState, useEffect, useRef } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";

import { SelectableDataTable } from "@/components/data/SelectableDataTable";
import type { DataTableColumn } from "@/components/data/DataTableCore";
import { DropdownMenu } from "@/components/ui/menu/DropdownMenu";
import { Tag } from "@/components/ui/tag/Tag";
import { Notification } from "@/components/ui/notification/Notification";
import { ScanInput } from "@/components/ui/scan-input/ScanInput";
import { Icon } from "@/components/ui/icon/Icon";

export const loader: LoaderFunction = async () => {
  return null;
};

/* =========================
   TYPES
   ========================= */

type Row = {
  id: number;
  order: number;
  name: string;
  created: string;
  pickdate: string;
  deliverydate: string;
  priority: string;
  noitems: string;
  status: string;
  more: string;
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
  const [openMenuRowId, setOpenMenuRowId] = useState<string | null>(null);
  const menuAnchorRef = useRef<HTMLElement | null>(null);
  const [showNotification, setShowNotification] = useState(false);

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

  const INITIAL_ROWS: Row[] = [
    {
      id: 9305204750,
      order: 2784741143,
      name: "Minymo Cardigan - Knitted - Woodrose",
      created: "08-Jan-2026 14:48:45",
      pickdate: "08-Jan-2026",
      deliverydate: "11-Jan-2026 21:00:00",
      priority: "50",
      noitems: "8",
      status: "In progress",
      more: "",
    },
    {
      id: 9305204751,
      order: 2784741144,
      name: "Minymo Cardigan w. Teddy - Parisian Night",
      created: "08-Jan-2026 14:42:12",
      pickdate: "08-Jan-2026",
      deliverydate: "11-Jan-2026 21:00:00",
      priority: "50",
      noitems: "4",
      status: "In progress",
      more: "",
    },
    {
      id: 9305204752,
      order: 2784741145,
      name: "adidas Performance Shoes - Advantage 2.0",
      created: "08-Jan-2026 14:39:37",
      pickdate: "08-Jan-2026",
      deliverydate: "11-Jan-2026 21:00:00",
      priority: "50",
      noitems: "4",
      status: "In progress",
      more: "",
    },
    {
      id: 9305204753,
      order: 2784741146,
      name: "adidas Performance Shoes - VL Court 3.0 K",
      created: "08-Jan-2026 14:34:29",
      pickdate: "08-Jan-2026",
      deliverydate: "11-Jan-2026 21:00:00",
      priority: "50",
      noitems: "4",
      status: "Prepared",
      more: "",
    },
  ];

    const [rows, setRows] = useState<Row[]>(INITIAL_ROWS);

  /* =========================
     HANDLE RETURN FROM PRODUCT
     ========================= */

  useEffect(() => {
    const completedId =
      sessionStorage.getItem("picking:completedPicklistId");

    if (!completedId) return;

    setRows((prev) =>
      prev.map((row) =>
        String(row.id) === completedId
          ? { ...row, status: "Completed" }
          : row
      )
    );

    sessionStorage.removeItem("picking:completedPicklistId");

    setShowNotification(true);
  }, []);


  /* =========================
     FILTER LOGIC
     ========================= */

  const filteredRows = useMemo(() => {
    if (!scanValue.trim()) return rows;

    const q = scanValue.toLowerCase();

    return rows.filter((row) =>
      [row.id, row.order, row.name].some((value) =>
        String(value).toLowerCase().includes(q)
      )
    );
  }, [scanValue, rows]);

  const canConfirm = useMemo(() => {
    if (filteredRows.length !== 1) return false;

    return filteredRows[0].status === "Prepared";
  }, [filteredRows]);

  const preparedRows = useMemo(() => {
    return filteredRows.filter(
      (row) => row.status === "Prepared"
    );
  }, [filteredRows]);

  const hasMatch = filteredRows.length > 0;

  /* =========================
     HANDLERS
     ========================= */

    function handleConfirm() {
      if (!canConfirm) return;

      window.location.href = `/outbound/picking-product`;
    }

    function handleSelectionChange(rowIds: string[]) {
      const allowedIds = preparedRows.map((r) => String(r.id));
      setSelectedRows(rowIds.filter((id) => allowedIds.includes(id)));
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
          rows={hasMatch ? filteredRows : []}
          selectedRows={selectedRows}
          onSelectionChange={handleSelectionChange}
        />
      </PageSection>

      <DropdownMenu
        open={openMenuRowId !== null}
        anchorRef={menuAnchorRef}
        items={[
          { id: "pick", label: "Pick" },
          { id: "edit", label: "Edit" },
          { id: "delete", label: "Delete", intent: "danger" },
        ]}
        onClose={() => setOpenMenuRowId(null)}
        onSelect={(actionId) => {
          console.log("action:", actionId, "row:", openMenuRowId);
          setOpenMenuRowId(null);
        }}
      />



      {showNotification && (
        <Notification
          intent="success"
          title="Picking completed"
          message="The picklist has been picked successfully."
          onClose={() => setShowNotification(false)}
        />
      )}
    </PageLayout>
  );
}
