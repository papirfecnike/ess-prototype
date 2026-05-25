import type { LoaderFunction } from "react-router";
import { useState, useMemo, useRef } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";

import { SelectableDataTable } from "@/components/data/SelectableDataTable";
import type { DataTableColumn } from "@/components/data/DataTableCore";
import { Tag } from "@/components/ui/tag/Tag";
import { Chip } from "@/components/ui/chip/Chip";
import { Icon } from "@/components/ui/icon/Icon";
import { DropdownMenu } from "@/components/ui/menu/DropdownMenu";
import { Notification } from "@/components/ui/notification/Notification";

export const loader: LoaderFunction = async () => null;

function renderStatusTag(status: string) {
  switch (status) {
    case "In progress": return <Tag label={status} variant="warning" />;
    case "Created": return <Tag label={status} variant="default" />;
    case "Prepared": return <Tag label={status} variant="default" />;
    case "Waiting": return <Tag label={status} variant="danger" />;
    case "Completed": return <Tag label={status} variant="success" />;
    default: return <Tag label={status} />;
  }
}

const ROWS = [
  { id: "3243435343589343", asnLineKey: "3243435343589343", itemKey: "WD750", item: "Bisgaard Winter Boots - Pixie - Khaki", processedQty: "2/4", quantity: 156, unit: "pcs", status: "In progress", received: "2026-05-12T09:00:00", completed: "2026-05-13T17:00:00", more: "" },
  { id: "8935485439112037", asnLineKey: "8935485439112037", itemKey: "WF773", item: "Name It Jumpsuit - NkfRoka - Burgundy", processedQty: "6/9", quantity: 132, unit: "pcs", status: "In progress", received: "2026-05-12T09:00:00", completed: "2026-05-13T17:00:00", more: "" },
  { id: "2390922102145343", asnLineKey: "2390922102145343", itemKey: "BW975", item: "Minymo Cardigan - Knitted - Woodrose", processedQty: "2/3", quantity: 99, unit: "pcs", status: "In progress", received: "2026-05-12T09:00:00", completed: "2026-05-13T17:00:00", more: "" },
  { id: "9027340034389584", asnLineKey: "9027340034389584", itemKey: "WC551", item: "Minymo Cardigan w. Teddy - Parisian Night", processedQty: "4/5", quantity: 78, unit: "pcs", status: "In progress", received: "2026-05-12T09:00:00", completed: "2026-05-13T17:00:00", more: "" },
  { id: "9842914301435320", asnLineKey: "9842914301435320", itemKey: "AR759", item: "adidas Originals Shoes - Gazelle W - Half blue/Ftwwht/Cblack", processedQty: "0/3", quantity: 287, unit: "pcs", status: "Created", received: "2026-05-12T09:00:00", completed: "2026-05-13T17:00:00", more: "" },
  { id: "9432983201238544", asnLineKey: "9432983201238544", itemKey: "WF681", item: "adidas Performance Shoes - Advantage 2.0 - Ftwwht/Cwhite/Legink", processedQty: "0/4", quantity: 13, unit: "pcs", status: "Created", received: "2026-05-12T09:00:00", completed: "2026-05-13T17:00:00", more: "" },
  { id: "4536344213018892", asnLineKey: "4536344213018892", itemKey: "II811", item: "Name It T-shirt - 2-Pack - NkfVotia - Pink Drink/Double Cream", processedQty: "0/2", quantity: 238, unit: "pcs", status: "Created", received: "2026-05-12T09:00:00", completed: "2026-05-13T17:00:00", more: "" },
  { id: "9123002132189012", asnLineKey: "9123002132189012", itemKey: "WH768", item: "Name It Blouse - Rib - Noos - NmfKab - Lavender Gray", processedQty: "8/8", quantity: 129, unit: "pcs", status: "Completed", received: "2026-05-12T09:00:00", completed: "2026-05-13T17:00:00", more: "" },
  { id: "4983012135534132", asnLineKey: "4983012135534132", itemKey: "WC240", item: "Wheat Boxers - 2-Pack - Louis - Blue Multi Stripe", processedQty: "4/4", quantity: 225, unit: "pcs", status: "Completed", received: "2026-05-12T09:00:00", completed: "2026-05-13T17:00:00", more: "" },
  { id: "4322130442532411", asnLineKey: "4322130442532411", itemKey: "WI810", item: "Molo Collegegenser - Maxi - Multi Kronblader", processedQty: "6/6", quantity: 215, unit: "pcs", status: "Completed", received: "2026-05-12T09:00:00", completed: "2026-05-13T17:00:00", more: "" },
];

export default function InboundPutaway() {

  const [activeStatuses, setActiveStatuses] = useState<string[]>([]);
  const [openMenuRowId, setOpenMenuRowId] = useState<string | null>(null);
  const [hiddenRowIds, setHiddenRowIds] = useState<string[]>([]);
  const [rowActionNotification, setRowActionNotification] = useState<{
    intent: "success" | "warning" | "danger";
    title: string;
    message: string;
  } | null>(null);
  const menuAnchorRef = useRef<HTMLElement | null>(null);

  const columns: DataTableColumn[] = [
    { key: "asnLineKey", label: "ASN line key", sortable: true, filterable: true, width: 190 },
    { key: "itemKey", label: "Item key", sortable: true, filterable: true, width: 130 },
    { key: "item", label: "Item", sortable: true, filterable: true, width: 320 },
    { key: "processedQty", label: "Processed quantity", filterable: false, width: 130, align: "right" },
    { key: "quantity", label: "Quantity", sortable: true, filterable: false, width: 100, align: "right" },
    { key: "unit", label: "Unit", filterable: false, width: 80, align: "center" },
    { key: "status", label: "Status", filterable: true, filterType: "multiSelect", width: 130, renderCell: (value) => renderStatusTag(String(value)) },
    { key: "received", label: "Received", sortable: true, filterable: true, filterType: "date", width: 145 },
    { key: "completed", label: "Completed", sortable: true, filterable: true, filterType: "date", width: 145 },
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

  const visibleRows = useMemo(
    () => ROWS.filter(row => !hiddenRowIds.includes(String(row.id))),
    [hiddenRowIds]
  );

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
  }, [activeStatuses, visibleRows]);

  function handleRowAction(actionId: string) {
    if (!openMenuRowId) return;

    const row = visibleRows.find(item => String(item.id) === openMenuRowId);
    if (!row) return;

    setHiddenRowIds(ids => Array.from(new Set([...ids, openMenuRowId])));
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

  return (
    <PageLayout title="Putaway" subtitle="Handling and placement of inbound goods">
      <PageSection>
        <SelectableDataTable
          rowIdKey="id"
          columns={columns}
          rows={filteredRows}
          selectable={false}
          detailsContent={detailsContent}
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

      {rowActionNotification && (
        <Notification
          intent={rowActionNotification.intent}
          title={rowActionNotification.title}
          message={rowActionNotification.message}
          onClose={() => setRowActionNotification(null)}
        />
      )}
    </PageLayout>
  );
}
