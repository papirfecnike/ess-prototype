import type { LoaderFunction } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";

import { SelectableDataTable } from "@/components/data/SelectableDataTable";
import type { DataTableColumn } from "@/components/data/DataTableCore";

import { Button } from "@/components/ui/button/Button";
import { Tag } from "@/components/ui/tag/Tag";
import { Chip } from "@/components/ui/chip/Chip";
import { Notification } from "@/components/ui/notification/Notification";
import { ScanInput } from "@/components/ui/scan-input/ScanInput";
import { Dialog } from "@/components/ui/dialog/Dialog";
import "@/styles/product-page.css";
import "@/styles/inbound-putaway-list.css";

export const loader: LoaderFunction = async () => null;

type Row = {
  id: number;
  order: number;
  created: string;
  pickdate: string;
  deliverydate: string;
  priority: string;
  noitems: string;
  status: string;
};

function renderStatusTag(status: string) {
  switch (status) {
    case "In progress": return <Tag label={status} variant="warning" />;
    case "Prepared": return <Tag label={status} variant="default" />;
    case "Waiting": return <Tag label={status} variant="danger" />;
    case "Completed": return <Tag label={status} variant="success" />;
    default: return <Tag label={status} />;
  }
}

const INITIAL_ROWS: Row[] = [
  { id: 9305204750, order: 2784741143, created: "08-Jan-2026 14:48:45", pickdate: "08-Jan-2026", deliverydate: "11-Jan-2026 21:00:00", priority: "50", noitems: "8", status: "In progress" },
  { id: 9305204751, order: 2784741144, created: "08-Jan-2026 14:34:29", pickdate: "08-Jan-2026", deliverydate: "11-Jan-2026 21:00:00", priority: "50", noitems: "4", status: "In progress" },
  { id: 9305204752, order: 2784741145, created: "08-Jan-2026 14:34:29", pickdate: "08-Jan-2026", deliverydate: "11-Jan-2026 21:00:00", priority: "50", noitems: "4", status: "In progress" },
  { id: 9305204753, order: 2784741146, created: "08-Jan-2026 14:34:29", pickdate: "08-Jan-2026", deliverydate: "11-Jan-2026 21:00:00", priority: "50", noitems: "4", status: "Prepared" },
  { id: 9305204754, order: 2784741147, created: "08-Jan-2026 14:34:29", pickdate: "08-Jan-2026", deliverydate: "11-Jan-2026 21:00:00", priority: "50", noitems: "4", status: "Prepared" },
  { id: 9305204755, order: 2784741148, created: "08-Jan-2026 14:34:29", pickdate: "08-Jan-2026", deliverydate: "11-Jan-2026 21:00:00", priority: "50", noitems: "4", status: "Waiting" },
  { id: 9305204756, order: 2784741149, created: "08-Jan-2026 14:34:29", pickdate: "08-Jan-2026", deliverydate: "11-Jan-2026 21:00:00", priority: "50", noitems: "4", status: "Prepared" },
  { id: 930520457, order: 2784741150, created: "08-Jan-2026 14:34:29", pickdate: "08-Jan-2026", deliverydate: "11-Jan-2026 21:00:00", priority: "1", noitems: "4", status: "Completed" },
  { id: 930520458, order: 2784741151, created: "08-Jan-2026 14:34:29", pickdate: "08-Jan-2026", deliverydate: "11-Jan-2026 21:00:00", priority: "1", noitems: "4", status: "Completed" },
  { id: 930520459, order: 2784741152, created: "08-Jan-2026 14:34:29", pickdate: "08-Jan-2026", deliverydate: "11-Jan-2026 21:00:00", priority: "1", noitems: "4", status: "Completed" },
  { id: 930520460, order: 2784741153, created: "08-Jan-2026 14:34:29", pickdate: "08-Jan-2026", deliverydate: "11-Jan-2026 21:00:00", priority: "1", noitems: "4", status: "Completed" },
];

export default function OutboundPickingTable() {

  const navigate = useNavigate();

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [scanValue, setScanValue] = useState("");
  const [dialogStatus, setDialogStatus] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [activeStatuses, setActiveStatuses] = useState<string[]>([]);
  const [rows] = useState<Row[]>(INITIAL_ROWS);

  useEffect(() => {
    const completedPicklistId = sessionStorage.getItem("picking:completedPicklistId");
    if (!completedPicklistId) return;
    setShowNotification(true);
    sessionStorage.removeItem("picking:completedPicklistId");
  }, []);

  function handleScanSubmit() {
    const row = exactPicklistMatch ?? filteredRows.find(item => String(item.id) === selectedRows[0]);
    if (!row) return;
    if (row.status !== "Prepared") {
      setDialogStatus(row.status);
      return;
    }
    navigate("/outbound/picking-product");
  }

  function handlePick() {
    if (selectedRows.length === 0) return;
    const row = rows.find(r => String(r.id) === selectedRows[0]);
    if (!row) return;
    if (row.status !== "Prepared") {
      setDialogStatus(row.status);
      return;
    }
    navigate("/outbound/picking-product");
  }

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
      renderCell: value => renderStatusTag(String(value)),
    },
  ];

  const searchFilteredRows = useMemo(() => {
    if (!scanValue.trim()) return rows;
    const q = scanValue.toLowerCase();
    return rows.filter(row =>
      [row.id, row.order].some(v => String(v).toLowerCase().includes(q))
    );
  }, [scanValue, rows]);

  const filteredRows = useMemo(() => {
    if (!activeStatuses.length) return searchFilteredRows;
    return searchFilteredRows.filter(row => activeStatuses.includes(row.status));
  }, [searchFilteredRows, activeStatuses]);

  const exactPicklistMatch = useMemo(() => {
    const q = scanValue.trim();
    if (!q) return null;
    return rows.find(row => String(row.id) === q || String(row.order) === q) ?? null;
  }, [scanValue, rows]);

  const hasNoResult = scanValue.trim().length > 0 && searchFilteredRows.length === 0;
  const canConfirm = Boolean(exactPicklistMatch || selectedRows.length > 0);

  const statusStats = useMemo(() => {
    const map: Record<string, number> = {};
    rows.forEach(row => { map[row.status] = (map[row.status] ?? 0) + 1; });
    return Object.entries(map);
  }, [rows]);

  function toggleStatus(status: string) {
    setActiveStatuses(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  }

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
      <Button size="sm" variant="secondary" onClick={handlePick}>Pick</Button>
      <Button size="sm" variant="ghost">Edit</Button>
      <Button size="sm" variant="ghost" intent="danger">Delete</Button>
    </>
  );

  return (
    <PageLayout>
      <PageSection>
        <div className="putaway-list">
          <ScanInput
            value={scanValue}
            onChange={(e) => setScanValue(e.target.value)}
            onSubmit={handleScanSubmit}
            placeholder="Look for picklists to pick..."
            showButton={false}
            isDisabled={!canConfirm}
            error={hasNoResult ? "No result." : undefined}
          />
        </div>

        <SelectableDataTable
          rowIdKey="id"
          columns={columns}
          rows={filteredRows}
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
          detailsContent={detailsContent}
          headerVariant="statusSplit"
          batchActions={batchActions}
        />
      </PageSection>

      {dialogStatus && (
        <Dialog
          isOpen
          intent="error"
          title="Picking not allowed"
          footerRight={
            <Button variant="ghost" onClick={() => setDialogStatus(null)}>
              Close
            </Button>
          }
        >
          Picking cannot be started because the picklist status is {renderStatusTag(dialogStatus)}
        </Dialog>
      )}

      {showNotification && (
        <Notification
          intent="success"
          title="Picking completed"
          message="The picklist has been picked successfully."
          onClose={() => setShowNotification(false)}
        />
      )}

      <footer className="product-page__footer">
        <div className="product-page__footer-left">
          <Button
            variant="ghost"
            intent="danger"
            leadingIcon="chevronLeftStroke"
            onClick={() => navigate("/outbound/picking")}
          >
            Exit
          </Button>
        </div>
        <div className="product-page__footer-center" />
        <div className="product-page__footer-right">
          <Button
            variant="secondary"
            leadingIcon="checkStroke"
            disabled={!canConfirm}
            onClick={handleScanSubmit}
          >
            Confirm
          </Button>
        </div>
      </footer>
    </PageLayout>
  );
}
