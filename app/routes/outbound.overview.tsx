import type { LoaderFunction } from "react-router";
import { useMemo, useState } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";
import { DataTableCore } from "@/components/data/DataTableCore";
import type { DataTableColumn, DataTableRow } from "@/components/data/DataTableCore";
import { TabBar } from "@/components/ui/tab/TabBar";
import { Tag } from "@/components/ui/tag/Tag";
import { Icon } from "@/components/ui/icon/Icon";

import "@/styles/outbound-overview.css";

export const loader: LoaderFunction = async () => null;

type ViewMode = "picklists" | "lines";

type PicklistRow = DataTableRow & {
  picklist: string;
  received: string;
  picked: string;
  pickedBy: string;
  priority: number;
  priorityName: string;
  status: string;
  additionalData1: string;
  additionalData2: string;
};

type PicklistLineRow = DataTableRow & {
  id: string;
  picklistKey: string;
  picklistLineKey: string;
  itemKey: string;
  itemName: string;
  pickingQuantity: number;
  pickedQuantity: number;
  status: string;
};

function renderStatusTag(status: string) {
  switch (status) {
    case "In progress":
      return <Tag label={status} variant="warning" />;
    case "Picked":
      return <Tag label={status} color="#73bd8a" />;
    case "Created":
      return <Tag label={status} variant="default" />;
    case "Canceled":
      return <Tag label={status} variant="danger" />;
    case "Completed":
      return <Tag label={status} variant="success" />;
    default:
      return <Tag label={status} />;
  }
}

const PICKLIST_ROWS: PicklistRow[] = [
  { picklist: "9305204751", received: "2026-05-11T13:45:30", picked: "2026-05-11T15:00:00", pickedBy: "2026-05-12T09:00:00", priority: 1, priorityName: "DHL", status: "In progress", additionalData1: "Custom data", additionalData2: "Custom data" },
  { picklist: "9305204752", received: "2026-05-11T13:45:30", picked: "2026-05-11T15:00:00", pickedBy: "2026-05-12T09:00:00", priority: 2, priorityName: "PostNord", status: "Created", additionalData1: "Custom data", additionalData2: "Custom data" },
  { picklist: "9305204753", received: "2026-05-11T13:45:30", picked: "2026-05-11T15:00:00", pickedBy: "2026-05-12T09:00:00", priority: 3, priorityName: "Custom prio", status: "In progress", additionalData1: "Custom data", additionalData2: "Custom data" },
  { picklist: "9305204754", received: "2026-05-11T13:45:30", picked: "2026-05-11T15:00:00", pickedBy: "2026-05-12T09:00:00", priority: 4, priorityName: "DHL nightly", status: "Picked", additionalData1: "Custom data", additionalData2: "Custom data" },
  { picklist: "9305204755", received: "2026-05-11T13:45:30", picked: "", pickedBy: "2026-05-12T09:00:00", priority: 5, priorityName: "UPS", status: "Created", additionalData1: "Custom data", additionalData2: "Custom data" },
  { picklist: "9305204756", received: "2026-05-11T13:45:30", picked: "", pickedBy: "2026-05-12T09:00:00", priority: 6, priorityName: "UPS 24h", status: "Canceled", additionalData1: "Custom data", additionalData2: "Custom data" },
  { picklist: "7837876120", received: "2026-05-11T13:45:30", picked: "", pickedBy: "2026-05-12T09:00:00", priority: 7, priorityName: "Regular", status: "Created", additionalData1: "Custom data", additionalData2: "Custom data" },
  { picklist: "5823483200", received: "2026-05-11T13:45:30", picked: "03-Nov-2025 17:00", pickedBy: "2026-05-12T09:00:00", priority: 8, priorityName: "Bring", status: "Completed", additionalData1: "Custom data", additionalData2: "Custom data" },
  { picklist: "4212102002", received: "2026-05-11T13:45:30", picked: "03-Nov-2025 17:00", pickedBy: "2026-05-12T09:00:00", priority: 9, priorityName: "Posten", status: "Completed", additionalData1: "Custom data", additionalData2: "Custom data" },
  { picklist: "3123193800", received: "2026-05-11T13:45:30", picked: "03-Nov-2025 17:00", pickedBy: "2026-05-12T09:00:00", priority: 10, priorityName: "Posten Express", status: "Completed", additionalData1: "Custom data", additionalData2: "Custom data" },
];

const LINE_TEMPLATES = [
  { itemKey: "WD750-01", itemName: "Bisgaard Winter Boots - Pixie - Khaki", pickingQuantity: 2, pickedQuantity: 1, status: "In progress" },
  { itemKey: "WD306-04", itemName: "Bisgaard Winter Boots - Barefoot - Helmut - Tex - Dark Brown", pickingQuantity: 4, pickedQuantity: 2, status: "In progress" },
  { itemKey: "WY909-08", itemName: "Mikk-Line Beanie - 2 Layers - Stone Blue", pickingQuantity: 6, pickedQuantity: 3, status: "Picked" },
  { itemKey: "BB282-01", itemName: "Mikk-Line Beanie - 2-layer - Lavender Aura w. Glitter", pickingQuantity: 3, pickedQuantity: 0, status: "Created" },
  { itemKey: "WU211-01", itemName: "Racing Kids Headband w. Bow - 2-layer - Purple", pickingQuantity: 7, pickedQuantity: 0, status: "Created" },
  { itemKey: "DD167-01", itemName: "Name It Leggings - Rib - NbfJasmine - Jester Rod", pickingQuantity: 4, pickedQuantity: 0, status: "Created" },
  { itemKey: "DD210-02", itemName: "Little Dutch Dukke - Julia - 35 cm", pickingQuantity: 2, pickedQuantity: 0, status: "Created" },
  { itemKey: "DD165-01", itemName: "Name It Leggings - NbfHilary - Mauve Morgen", pickingQuantity: 4, pickedQuantity: 0, status: "Created" },
  { itemKey: "II366-01", itemName: "Reima Votter - Ermet - Navy", pickingQuantity: 6, pickedQuantity: 0, status: "Created" },
  { itemKey: "WP465-01", itemName: "Color Kids Votter m. Fleece - PU - Purple Rose", pickingQuantity: 3, pickedQuantity: 0, status: "Created" },
  { itemKey: "WY871-01", itemName: "Hummel Fotballsko - Hattrick MG Jr - Rosa Flamme", pickingQuantity: 4, pickedQuantity: 0, status: "Created" },
  { itemKey: "WZ199-01", itemName: "Name It Gymnastikkdrakt - NmfDaisy - Romantikk Rose", pickingQuantity: 6, pickedQuantity: 0, status: "Created" },
  { itemKey: "WZ200-01", itemName: "Name It Gymnastikkdrakt - NmfDaisy - Chocolate Martini", pickingQuantity: 3, pickedQuantity: 0, status: "Created" },
];

const PICKLIST_LINE_ROWS: PicklistLineRow[] = PICKLIST_ROWS.flatMap((picklist, picklistIndex) => {
  const start = picklistIndex % LINE_TEMPLATES.length;
  const count = picklist.picklist === "9305204752" ? 5 : 4 + (picklistIndex % 3);

  return Array.from({ length: count }, (_, lineIndex) => {
    const template = LINE_TEMPLATES[(start + lineIndex) % LINE_TEMPLATES.length];
    const lineKey = `${picklist.picklist}${lineIndex + 1}`;

    return {
      id: lineKey,
      picklistKey: picklist.picklist,
      picklistLineKey: lineKey,
      ...template,
    };
  });
});

function rowMenuButton() {
  return (
    <button type="button" className="btn--ghost outbound-overview__row-action" aria-label="Actions" onClick={(event) => event.stopPropagation()}>
      <Icon name="moreVert" size="sm" />
    </button>
  );
}

function DetailItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="outbound-details__item">
      <span className="outbound-details__label">{label}</span>
      <span className="outbound-details__value">{value}</span>
    </div>
  );
}

export default function OutboundOverview() {
  const [view, setView] = useState<ViewMode>("picklists");
  const [selectedPicklist, setSelectedPicklist] = useState<PicklistRow | null>(null);
  const [selectedLine, setSelectedLine] = useState<PicklistLineRow | null>(null);
  const [linePicklistFilter, setLinePicklistFilter] = useState<string | null>(null);

  const picklistColumns: DataTableColumn[] = [
    {
      key: "picklist",
      label: "Picklist #",
      sortable: true,
      filterable: true,
      width: 140,
      renderCell: (value) => (
        <button
          type="button"
          className="outbound-overview__link"
          onClick={(event) => {
            event.stopPropagation();
            setLinePicklistFilter(String(value));
            setSelectedPicklist(null);
            setSelectedLine(null);
            setView("lines");
          }}
        >
          {String(value)}
        </button>
      ),
    },
    { key: "received", label: "Received", sortable: true, filterable: false, width: 160 },
    { key: "picked", label: "Picked", sortable: true, filterable: true, filterType: "date", width: 150 },
    { key: "pickedBy", label: "Picked by", sortable: true, filterable: false, width: 160 },
    { key: "priority", label: "Priority #", sortable: true, filterable: false, width: 90, align: "right" },
    { key: "priorityName", label: "Priority name", sortable: true, filterable: false, width: 140 },
    { key: "status", label: "Status", filterable: true, filterType: "multiSelect", width: 140, renderCell: (value) => renderStatusTag(String(value)) },
    { key: "additionalData1", label: "Additional data 1", filterable: false, width: 150 },
    { key: "additionalData2", label: "Additional data 2", filterable: false, width: 150 },
    { key: "actions", label: "", filterable: false, width: 48, align: "right", renderCell: rowMenuButton },
  ];

  const lineColumns: DataTableColumn[] = [
    { key: "picklistKey", label: "Picklist key", sortable: true, filterable: true, width: 140 },
    { key: "picklistLineKey", label: "Picklist line key", sortable: true, filterable: true, width: 150 },
    { key: "itemKey", label: "Item key", sortable: true, filterable: true, width: 120 },
    { key: "itemName", label: "Item name", sortable: true, filterable: true, width: 320, minWidth: 250, wrap: true },
    { key: "pickingQuantity", label: "Picking quantity", sortable: true, filterable: false, width: 140, align: "right" },
    { key: "pickedQuantity", label: "Picked quantity", sortable: true, filterable: false, width: 130, align: "right" },
    { key: "status", label: "Status", filterable: true, filterType: "multiSelect", width: 130, renderCell: (value) => renderStatusTag(String(value)) },
    { key: "actions", label: "", filterable: false, width: 48, align: "right", renderCell: rowMenuButton },
  ];

  const lineRows = useMemo(() => {
    if (!linePicklistFilter) return PICKLIST_LINE_ROWS;
    return PICKLIST_LINE_ROWS.filter(row => row.picklistKey === linePicklistFilter);
  }, [linePicklistFilter]);

  const activePicklist = selectedPicklist ?? (
    selectedLine ? PICKLIST_ROWS.find(row => row.picklist === selectedLine.picklistKey) ?? null : null
  );
  const drawerOpen = Boolean(selectedPicklist || selectedLine);

  function closeDrawer() {
    setSelectedPicklist(null);
    setSelectedLine(null);
  }

  return (
    <PageLayout title="Picklists" subtitle="Overview of all outbound operations and customer orders">
      <PageSection>
        <TabBar
          activeTab={view}
          onChange={(tab) => {
            setView(tab as ViewMode);
            closeDrawer();
            if (tab === "picklists") setLinePicklistFilter(null);
          }}
          tabs={[
            { id: "picklists", label: "Picklist view" },
            { id: "lines", label: "Line view" },
          ]}
        />
      </PageSection>

      <PageSection>
        {view === "picklists" ? (
          <DataTableCore
            rowIdKey="picklist"
            columns={picklistColumns}
            rows={PICKLIST_ROWS}
            onRowClick={(row) => {
              setSelectedLine(null);
              setSelectedPicklist(row as PicklistRow);
            }}
          />
        ) : (
          <DataTableCore
            rowIdKey="id"
            columns={lineColumns}
            rows={lineRows}
            onRowClick={(row) => {
              setSelectedPicklist(null);
              setSelectedLine(row as PicklistLineRow);
            }}
          />
        )}
      </PageSection>

      {drawerOpen && <button type="button" aria-label="Close details" className="outbound-details__scrim" onClick={closeDrawer} />}

      <aside className={["outbound-details", drawerOpen ? "is-open" : ""].join(" ")} aria-hidden={!drawerOpen}>
        <div className="outbound-details__header">
          <h2>Details</h2>
          <button type="button" className="outbound-details__close" aria-label="Close details" onClick={closeDrawer}>
            <Icon name="closeStroke" size="md" />
          </button>
        </div>

        {selectedPicklist && (
          <>
            <h3 className="outbound-details__section-title">Picklist overview</h3>
            <div className="outbound-details__card">
              <div className="outbound-details__item-row">
                <DetailItem label="PICKLIST #" value={selectedPicklist.picklist} />
                {renderStatusTag(selectedPicklist.status)}
              </div>
              <DetailItem label="RECEIVED" value="03-Nov-2025 15:29:17" />
              <DetailItem label="PICKED" value="03-Nov-2025 17:00" />
              <div className="outbound-details__grid outbound-details__grid--three outbound-details__meta-row">
                <DetailItem label="PICKED BY" value="11-Apr-2026 21:00" />
                <DetailItem label="PRIORITY #" value={selectedPicklist.priority} />
                <DetailItem label="PRIORITY NAME" value={selectedPicklist.priorityName} />
              </div>
              <DetailItem label="ADDITIONAL DATA 1" value="Random info" />
              <DetailItem label="ADDITIONAL DATA 1" value="Random info" />
            </div>

            <div className="outbound-details__divider" />

            <div className="outbound-details__section-header">
              <h3 className="outbound-details__section-title">Picklist lines</h3>
              <button
                type="button"
                className="outbound-details__link"
                onClick={() => {
                  setLinePicklistFilter(selectedPicklist.picklist);
                  closeDrawer();
                  setView("lines");
                }}
              >
                Line overview <Icon name="chevronRightStroke" size="sm" />
              </button>
            </div>

            <div className="outbound-details__card">
              <div className="outbound-details__line-table outbound-details__line-table--picklist">
                <span className="outbound-details__label">ITEM KEY</span>
                <span className="outbound-details__label">ITEM NAME</span>
                {PICKLIST_LINE_ROWS.filter(row => row.picklistKey === selectedPicklist.picklist).slice(0, 5).map(line => (
                  <div className="outbound-details__line-row" key={line.id}>
                    <span>{line.itemKey}</span>
                    <span>{line.itemName}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {selectedLine && activePicklist && (
          <>
            <h3 className="outbound-details__section-title">Picklist line overview</h3>
            <div className="outbound-details__card">
              <div className="outbound-details__item-row">
                <DetailItem label="PICKLIST KEY" value={selectedLine.picklistKey} />
                {renderStatusTag(selectedLine.status)}
              </div>
              <DetailItem label="PICKLIST LINE KEY" value={selectedLine.picklistLineKey} />
              <DetailItem label="ITEM KEY" value={selectedLine.itemKey} />
              <DetailItem label="ITEM NAME" value={selectedLine.itemName} />
              <div className="outbound-details__grid outbound-details__qty-row">
                <DetailItem label="PICKING QTY" value={selectedLine.pickingQuantity} />
                <DetailItem label="PICKED QTY" value={selectedLine.pickedQuantity} />
              </div>
            </div>

            <div className="outbound-details__divider" />

            <h3 className="outbound-details__section-title">Related picklist details</h3>
            <div className="outbound-details__card">
              <div className="outbound-details__item-row">
                <DetailItem label="PICKLIST #" value={activePicklist.picklist} />
                {renderStatusTag(activePicklist.status)}
              </div>
              <DetailItem label="RECEIVED" value="03-Nov-2025 15:29:17" />
              <DetailItem label="PICKED" value="03-Nov-2025 17:00" />
              <div className="outbound-details__grid outbound-details__grid--three outbound-details__meta-row">
                <DetailItem label="PICKED BY" value="11-Apr-2026 21:00" />
                <DetailItem label="PRIORITY #" value={activePicklist.priority} />
                <DetailItem label="PRIORITY NAME" value={activePicklist.priorityName} />
              </div>
              <DetailItem label="ADDITIONAL DATA 1" value="Random info" />
              <DetailItem label="ADDITIONAL DATA 1" value="Random info" />
            </div>
          </>
        )}
      </aside>
    </PageLayout>
  );
}
