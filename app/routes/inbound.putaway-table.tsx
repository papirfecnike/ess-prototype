import type { LoaderFunction } from "react-router";
import { useState, useEffect, useMemo, useRef } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";

import { DataTableCore } from "@/components/data/DataTableCore";
import type { DataTableColumn } from "@/components/data/DataTableCore";

import { DropdownMenu } from "@/components/ui/menu/DropdownMenu";
import { Tag } from "@/components/ui/tag/Tag";
import { Notification } from "@/components/ui/notification/Notification";
import { Icon } from "@/components/ui/icon/Icon";
import { Button } from "@/components/ui/button/Button";
import { ScanInput } from "@/components/ui/scan-input/ScanInput";
import "@/styles/product-page.css";
import "@/styles/inbound-putaway-list.css";

export const loader: LoaderFunction = async () => null;

function renderStatusTag(status: string) {
  switch (status) {
    case "In progress": return <Tag label={status} variant="warning" />;
    case "Created": return <Tag label={status} variant="default" />;
    case "Prepared": return <Tag label={status} variant="default" />;
    case "Waiting": return <Tag label={status} variant="danger" />;
    case "Completed": return <Tag label={status} variant="success" />;
    case "Interrupted": return <Tag label={status} variant="danger" />;
    default: return <Tag label={status} />;
  }
}

const INITIAL_ROWS = [
  { id: "3243435343589343", asnLineKey: "3243435343589343", itemKey: "WD750", item: "Bisgaard Winter Boots - Pixie - Khaki", name: "Bisgaard Winter Boots - Pixie - Khaki", sku: "WD750", processedQty: "2/4", quantity: 156, unit: "pcs", status: "In progress", received: "2026-05-12T09:00:00", completed: "2026-05-13T17:00:00", more: "" },
  { id: "8935485439112037", asnLineKey: "8935485439112037", itemKey: "WF773", item: "Name It Jumpsuit - NkfRoka - Burgundy", name: "Name It Jumpsuit - NkfRoka - Burgundy", sku: "WF773", processedQty: "6/9", quantity: 132, unit: "pcs", status: "In progress", received: "2026-05-12T09:00:00", completed: "2026-05-13T17:00:00", more: "" },
  { id: "2390922102145343", asnLineKey: "2390922102145343", itemKey: "BW975", item: "Minymo Cardigan - Knitted - Woodrose", name: "Minymo Cardigan - Knitted - Woodrose", sku: "BW975", processedQty: "2/3", quantity: 99, unit: "pcs", status: "In progress", received: "2026-05-12T09:00:00", completed: "2026-05-13T17:00:00", more: "" },
  { id: "9027340034389584", asnLineKey: "9027340034389584", itemKey: "WC551", item: "Minymo Cardigan w. Teddy - Parisian Night", name: "Minymo Cardigan w. Teddy - Parisian Night", sku: "WC551", processedQty: "4/5", quantity: 78, unit: "pcs", status: "In progress", received: "2026-05-12T09:00:00", completed: "2026-05-13T17:00:00", more: "" },
  { id: "9842914301435320", asnLineKey: "9842914301435320", itemKey: "AR759", item: "adidas Originals Shoes - Gazelle W - Half blue/Ftwwht/Cblack", name: "adidas Originals Shoes - Gazelle W - Half blue/Ftwwht/Cblack", sku: "AR759", processedQty: "0/3", quantity: 287, unit: "pcs", status: "Created", received: "2026-05-12T09:00:00", completed: "2026-05-13T17:00:00", more: "" },
  { id: "9432983201238544", asnLineKey: "9432983201238544", itemKey: "WF681", item: "adidas Performance Shoes - Advantage 2.0 - Ftwwht/Cwhite/Legink", name: "adidas Performance Shoes - Advantage 2.0 - Ftwwht/Cwhite/Legink", sku: "WF681", processedQty: "0/4", quantity: 13, unit: "pcs", status: "Created", received: "2026-05-12T09:00:00", completed: "2026-05-13T17:00:00", more: "" },
  { id: "4536344213018892", asnLineKey: "4536344213018892", itemKey: "II811", item: "Name It T-shirt - 2-Pack - NkfVotia - Pink Drink/Double Cream", name: "Name It T-shirt - 2-Pack - NkfVotia - Pink Drink/Double Cream", sku: "II811", processedQty: "0/2", quantity: 238, unit: "pcs", status: "Created", received: "2026-05-12T09:00:00", completed: "2026-05-13T17:00:00", more: "" },
  { id: "9123002132189012", asnLineKey: "9123002132189012", itemKey: "WH768", item: "Name It Blouse - Rib - Noos - NmfKab - Lavender Gray", name: "Name It Blouse - Rib - Noos - NmfKab - Lavender Gray", sku: "WH768", processedQty: "8/8", quantity: 129, unit: "pcs", status: "Completed", received: "2026-05-12T09:00:00", completed: "2026-05-13T17:00:00", more: "" },
  { id: "4983012135534132", asnLineKey: "4983012135534132", itemKey: "WC240", item: "Wheat Boxers - 2-Pack - Louis - Blue Multi Stripe", name: "Wheat Boxers - 2-Pack - Louis - Blue Multi Stripe", sku: "WC240", processedQty: "4/4", quantity: 225, unit: "pcs", status: "Completed", received: "2026-05-12T09:00:00", completed: "2026-05-13T17:00:00", more: "" },
  { id: "4322130442532411", asnLineKey: "4322130442532411", itemKey: "WI810", item: "Molo Collegegenser - Maxi - Multi Kronblader", name: "Molo Collegegenser - Maxi - Multi Kronblader", sku: "WI810", processedQty: "6/6", quantity: 215, unit: "pcs", status: "Completed", received: "2026-05-12T09:00:00", completed: "2026-05-13T17:00:00", more: "" },
  { id: "9848432947385435", asnLineKey: "9848432947385435", itemKey: "BT750", item: "Hummel Shoes w. Light - Daylight Glitter Jr - Silver", name: "Hummel Shoes w. Light - Daylight Glitter Jr - Silver", sku: "BT750", processedQty: "12/12", quantity: 134, unit: "pcs", status: "Completed", received: "2026-05-12T09:00:00", completed: "2026-05-13T17:00:00", more: "" },
  { id: "8342489324843212", asnLineKey: "8342489324843212", itemKey: "WV201", item: "Fila Shoes - Crusher V - Surf the Web-Scarlet Ibis", name: "Fila Shoes - Crusher V - Surf the Web-Scarlet Ibis", sku: "WV201", processedQty: "21/21", quantity: 19, unit: "pcs", status: "Completed", received: "2026-05-12T09:00:00", completed: "2026-05-13T17:00:00", more: "" },
  { id: "2343289710054657", asnLineKey: "2343289710054657", itemKey: "WV202", item: "Fila Shoes - Crusher V - Sleet-Evening Primrose", name: "Fila Shoes - Crusher V - Sleet-Evening Primrose", sku: "WV202", processedQty: "4/4", quantity: 178, unit: "pcs", status: "Completed", received: "2026-05-12T09:00:00", completed: "2026-05-13T17:00:00", more: "" },
  { id: "4321230245499011", asnLineKey: "4321230245499011", itemKey: "WK776", item: "Hummel Indoor Sports Shoes - Multiplay Stable VC Jr - Pink-A-Boo", name: "Hummel Indoor Sports Shoes - Multiplay Stable VC Jr - Pink-A-Boo", sku: "WK776", processedQty: "19/19", quantity: 219, unit: "pcs", status: "Completed", received: "2026-05-12T09:00:00", completed: "2026-05-13T17:00:00", more: "" },
];

export default function InboundPutaway() {

  const [selectedPutawayRowId, setSelectedPutawayRowId] = useState<string | null>(null);
  const [scanValue, setScanValue] = useState("");
  const [openMenuRowId, setOpenMenuRowId] = useState<string | null>(null);
  const menuAnchorRef = useRef<HTMLElement | null>(null);

  const [hiddenSkus, setHiddenSkus] = useState<string[]>([]);
  const [hiddenRowIds, setHiddenRowIds] = useState<string[]>([]);
  const [interruptedSkus, setInterruptedSkus] = useState<string[]>([]);

  const [showCompletedNotification, setShowCompletedNotification] = useState(false);
  const [showInterruptedNotification, setShowInterruptedNotification] = useState(false);
  const [rowActionNotification, setRowActionNotification] = useState<{
    intent: "success" | "warning" | "danger";
    title: string;
    message: string;
  } | null>(null);

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

  function startPutaway(row: typeof INITIAL_ROWS[number]) {
    setSelectedPutawayRowId(String(row.id));
    window.location.assign(`/inbound/putaway-product?sku=${row.sku}`);
  }

  function handleConfirm() {
    const row = exactItemMatch ?? visibleRows.find(item => String(item.id) === selectedPutawayRowId);
    if (!row) return;
    startPutaway(row);
  }

  const columns: DataTableColumn[] = [
    {
      key: "actions",
      label: "Actions",
      filterable: false,
      width: 118,
      renderCell: (_value, row) => (
        <Button
          size="sm"
          variant="secondary"
          leadingIcon="download"
          onClick={(event) => {
            event.stopPropagation();
            startPutaway(row as typeof INITIAL_ROWS[number]);
          }}
        >
          Putaway
        </Button>
      ),
    },
    { key: "asnLineKey", label: "ASN line key", sortable: false, filterable: false, width: 190 },
    { key: "itemKey", label: "Item key", sortable: false, filterable: false, width: 110 },
    { key: "item", label: "Item name", sortable: false, filterable: false, width: 270, minWidth: 250, wrap: true },
    { key: "remainingQuantity", label: "Remaining quantity", sortable: false, filterable: false, width: 122, align: "right", wrap: true },
    { key: "status", label: "Status", filterable: false, width: 118, renderCell: (value) => renderStatusTag(String(value)) },
    {
      key: "more",
      label: "",
      align: "right",
      filterable: false,
      width: 48,
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
    .filter(row => !hiddenSkus.includes(row.sku) && !hiddenRowIds.includes(String(row.id)))
    .map((row, index) => ({
      ...row,
      actions: "",
      remainingQuantity: [12, 84, 34, 97, 51, 45, 18, 60, 26, 39, 11, 72, 8, 55][index] ?? row.quantity,
      status: interruptedSkus.includes(row.sku) ? "Interrupted" : row.status,
    }));

  const searchMatches = useMemo(() => {
    const q = scanValue.trim();
    if (!q) return [];
    const normalized = q.toUpperCase();
    return visibleRows.filter(
      row =>
        String(row.id) === q ||
        row.itemKey.toUpperCase().includes(normalized) ||
        row.sku.toUpperCase().includes(normalized)
    );
  }, [scanValue, visibleRows]);

  const exactItemMatch = searchMatches.find(row => {
    const q = scanValue.trim();
    return String(row.id) === q || row.itemKey.toUpperCase() === q.toUpperCase() || row.sku.toUpperCase() === q.toUpperCase();
  }) ?? null;

  const hasSearch = scanValue.trim().length > 0;
  const hasNoResult = hasSearch && searchMatches.length === 0;
  const canConfirm = Boolean(exactItemMatch || selectedPutawayRowId);

  function handleRowAction(actionId: string) {
    if (!openMenuRowId) return;

    const row = visibleRows.find(item => String(item.id) === openMenuRowId);
    if (!row) return;

    setHiddenRowIds(ids => Array.from(new Set([...ids, openMenuRowId])));
    if (selectedPutawayRowId === openMenuRowId) setSelectedPutawayRowId(null);
    setOpenMenuRowId(null);

    if (actionId === "complete") {
      setRowActionNotification({
        intent: "success",
        title: "Inbound line completed",
        message: `${row.itemKey} has been completed.`,
      });
      return;
    }

    if (actionId === "cancel") {
      setRowActionNotification({
        intent: "warning",
        title: "Inbound line canceled",
        message: `${row.itemKey} has been canceled.`,
      });
      return;
    }

    if (actionId === "delete") {
      setRowActionNotification({
        intent: "danger",
        title: "Inbound line deleted",
        message: `${row.itemKey} has been deleted.`,
      });
    }
  }

  const filteredRows = useMemo(() => {
    if (hasSearch) return searchMatches;
    return visibleRows;
  }, [visibleRows, searchMatches, hasSearch]);

  return (
    <PageLayout>
      <PageSection>
        <div className="putaway-list">
          <ScanInput
            value={scanValue}
            onChange={(e) => setScanValue(e.target.value)}
            placeholder="Look for items to put away..."
            onSubmit={handleConfirm}
            showButton={false}
            error={hasNoResult ? "No result." : undefined}
            isDisabled={!canConfirm}
          />
        </div>

        <DataTableCore
          rowIdKey="id"
          columns={columns}
          rows={filteredRows}
          showHeader={false}
          onRowClick={(row) => setSelectedPutawayRowId(String(row.id))}
        />

        <DropdownMenu
          open={openMenuRowId !== null}
          anchorRef={menuAnchorRef}
          items={[
            { id: "complete", label: "Complete" },
            { id: "cancel", label: "Cancel" },
            { id: "delete", label: "Delete", intent: "danger" },
          ]}
          onClose={() => setOpenMenuRowId(null)}
          onSelect={handleRowAction}
        />
      </PageSection>

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

      {rowActionNotification && (
        <Notification
          intent={rowActionNotification.intent}
          title={rowActionNotification.title}
          message={rowActionNotification.message}
          onClose={() => setRowActionNotification(null)}
        />
      )}

      <footer className="product-page__footer putaway-list__footer">
        <div className="product-page__footer-left">
          <Button
            variant="ghost"
            intent="danger"
            leadingIcon="chevronLeftStroke"
            onClick={() => window.location.assign("/inbound/putaway")}
          >
            Exit
          </Button>
        </div>
        <div className="product-page__footer-center" />
        <div className="product-page__footer-right" />
      </footer>
    </PageLayout>
  );
}
