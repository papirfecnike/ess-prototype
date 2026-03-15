import type { LoaderFunction } from "react-router";
import { useState, useEffect, useMemo, useRef } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";

import { SelectableDataTable } from "@/components/data/SelectableDataTable";
import type { DataTableColumn } from "@/components/data/DataTableCore";

import { DropdownMenu } from "@/components/ui/menu/DropdownMenu";
import { Tag } from "@/components/ui/tag/Tag";
import { Chip } from "@/components/ui/chip/Chip";
import { ScanInput } from "@/components/ui/scan-input/ScanInput";
import { Notification } from "@/components/ui/notification/Notification";
import { Icon } from "@/components/ui/icon/Icon";
import { Button } from "@/components/ui/button/Button";
import { Dialog } from "@/components/ui/dialog/Dialog";

export const loader: LoaderFunction = async () => null;

function renderStatusTag(status: string) {
  switch (status) {
    case "In progress": return <Tag label={status} variant="warning" />;
    case "Prepared": return <Tag label={status} variant="default" />;
    case "Waiting": return <Tag label={status} variant="danger" />;
    case "Completed": return <Tag label={status} variant="success" />;
    case "Interrupted": return <Tag label={status} variant="danger" />;
    default: return <Tag label={status} />;
  }
}

const INITIAL_ROWS = [
  { id: 432169, name: "Bisgaard Winter Boots - Pixie - Khaki", sku: "WD750", progress: "2/3", status: "In progress", operator: "c.newman", workstation: "Port 01, Port 02", system: "AutoStore", more: "" },
  { id: 432170, name: "Name It Jumpsuit - NkfRoka - Burgundy", sku: "WF773", progress: "5/11", status: "In progress", operator: "s.taylor", workstation: "Port 04", system: "AutoStore", more: "" },
  { id: 432171, name: "Minymo Cardigan - Knitted - Woodrose", sku: "BW975", progress: "7/9", status: "In progress", operator: "p.ramazotti", workstation: "Port 07, Port 08", system: "Conveyor", more: "" },
  { id: 432172, name: "Minymo Cardigan w. Teddy - Parisian Night", sku: "WC551", progress: "2/6", status: "Waiting", operator: "i.d.hoffmann", workstation: "Port 05", system: "AMR", more: "" },
  { id: 432173, name: "adidas Performance Shoes - Advantage 2.0", sku: "WF685", progress: "0/3", status: "Prepared", operator: "d.haugen", workstation: "Port 03", system: "AutoStore", more: "" },
  { id: 432174, name: "adidas Performance Shoes - Advantage 2.0 - Ftwwht/Cwhite/Legink", sku: "WF681", progress: "0/4", status: "Prepared", operator: "s.pittmann", workstation: "Port 02", system: "AMR", more: "" },
  { id: 432175, name: "adidas Performance Shoes - Run 70s 2.0 EL C - Navy/White", sku: "BM841", progress: "0/2", status: "Prepared", operator: "f.rickman", workstation: "Port 06", system: "AutoStore", more: "" },
  { id: 432176, name: "Name It Blouse - Rib - Noos - NmfKab - Lavender Gray", sku: "WH768", progress: "0/3", status: "Prepared", operator: "s.h.bergman", workstation: "Port 02", system: "AMR", more: "" },
];

export default function InboundPutaway() {

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [scanValue, setScanValue] = useState("");
  const [openMenuRowId, setOpenMenuRowId] = useState<string | null>(null);
  const menuAnchorRef = useRef<HTMLElement | null>(null);

  const [hiddenSkus, setHiddenSkus] = useState<string[]>([]);
  const [interruptedSkus, setInterruptedSkus] = useState<string[]>([]);
  const [activeStatuses, setActiveStatuses] = useState<string[]>([]);

  const [showCompletedNotification, setShowCompletedNotification] = useState(false);
  const [showInterruptedNotification, setShowInterruptedNotification] = useState(false);
  const [dialogStatus, setDialogStatus] = useState<string | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("putaway:completed");
    if (!raw) return;
    const { sku } = JSON.parse(raw);
    setHiddenSkus(prev => [...prev, sku]);
    setShowCompletedNotification(true);
    sessionStorage.removeItem("putaway:completed");
  }, []);

  useEffect(() => {
    const raw = sessionStorage.getItem("putaway:interrupted");
    if (!raw) return;
    const { sku } = JSON.parse(raw);
    setInterruptedSkus(prev => [...prev, sku]);
    setShowInterruptedNotification(true);
    sessionStorage.removeItem("putaway:interrupted");
  }, []);

  function handleConfirm() {
    if (!exactPreparedMatch) return;
    window.location.assign(`/inbound/putaway-product?sku=${exactPreparedMatch.sku}`);
  }

  function handlePutaway() {
    if (selectedRows.length === 0) return;
    const row = visibleRows.find(r => String(r.id) === selectedRows[0]);
    if (!row) return;
    if (row.status !== "Prepared") {
      setDialogStatus(row.status);
      return;
    }
    window.location.assign(`/inbound/putaway-product?sku=${row.sku}`);
  }

  const columns: DataTableColumn[] = [
    { key: "id", label: "PO #", sortable: true },
    { key: "name", label: "Product", sortable: true },
    { key: "sku", label: "SKU", sortable: true },
    { key: "progress", label: "Progress", sortable: true },
    { key: "status", label: "Status", align: "center", renderCell: (value) => renderStatusTag(String(value)) },
    { key: "operator", label: "Assigned operator", align: "center" },
    { key: "workstation", label: "Workstation", align: "center" },
    { key: "system", label: "System", align: "center" },
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
            ref={(el) => { if (isMenuOpen) menuAnchorRef.current = el; }}
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenuRowId(isMenuOpen ? null : currentRowId);
            }}
          >
            <Icon name={isMenuOpen ? "closeStroke" : "moreVert"} size="sm" />
          </button>
        );
      },
    },
  ];

  const visibleRows = INITIAL_ROWS
    .filter(row => !hiddenSkus.includes(row.sku))
    .map(row => interruptedSkus.includes(row.sku) ? { ...row, status: "Interrupted" } : row);

  const exactPreparedMatch = useMemo(() => {
    const q = scanValue.trim();
    if (!q) return null;
    return INITIAL_ROWS.find(
      row => row.status === "Prepared" && (
        String(row.id) === q ||
        row.sku.toUpperCase() === q.toUpperCase() ||
        row.name.toUpperCase() === q.toUpperCase()
      )
    );
  }, [scanValue]);

  const canConfirm = Boolean(exactPreparedMatch);

  const statusStats = useMemo(() => {
    const map: Record<string, number> = {};
    visibleRows.forEach(row => { map[row.status] = (map[row.status] ?? 0) + 1; });
    return Object.entries(map);
  }, [visibleRows]);

  function toggleStatus(status: string) {
    setActiveStatuses(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  }

  const filteredRows = useMemo(() => {
    if (!activeStatuses.length) return visibleRows;
    return visibleRows.filter(row => activeStatuses.includes(row.status));
  }, [visibleRows, activeStatuses]);

  const detailsContent = (
    <>
      <div className="data-table__text">STATUS</div>
      <div className="data-table__chips">
        {statusStats.map(([status, count]) => (
          <Chip key={status} isActive={activeStatuses.includes(status)} onClick={() => toggleStatus(status)}>
            {status} ({count})
          </Chip>
        ))}
      </div>
    </>
  );

  const batchActions = (
    <>
      <Button size="sm" variant="secondary" onClick={handlePutaway}>
        Putaway
      </Button>
      <Button size="sm" variant="ghost">Edit</Button>
      <Button size="sm" variant="ghost" intent="danger">Delete</Button>
    </>
  );

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
          onSelectionChange={setSelectedRows}
          detailsContent={detailsContent}
          batchActions={batchActions}
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

      {dialogStatus && (
        <Dialog
          isOpen
          intent="error"
          title="Putaway not allowed"
          footerRight={
            <Button variant="ghost" onClick={() => setDialogStatus(null)}>
              Close
            </Button>
          }
        >
          <span style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", flexWrap: "wrap" }}>
            Putaway cannot be started because the status is
            {renderStatusTag(dialogStatus)}
          </span>
        </Dialog>
      )}

      {showCompletedNotification && (
        <Notification
          intent="success"
          title="Putaway completed"
          message="Product successfully put away."
          onClose={() => setShowCompletedNotification(false)}
        />
      )}

      {showInterruptedNotification && (
        <Notification
          intent="danger"
          title="Interrupted task"
          message="Interrupted task."
          onClose={() => setShowInterruptedNotification(false)}
        />
      )}
    </PageLayout>
  );
}