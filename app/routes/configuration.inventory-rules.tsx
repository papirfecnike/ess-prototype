import type { LoaderFunction } from "react-router";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";

import { DataTableCore } from "@/components/data/DataTableCore";
import type {
  DataTableColumn,
  DataTableRow,
} from "@/components/data/DataTableCore";

import { Tag } from "@/components/ui/tag/Tag";
import { Icon } from "@/components/ui/icon/Icon";
import { Toggle } from "@/components/ui/toggle/Toggle";

export const loader: LoaderFunction = async () => null;

/* =========================
   TYPE TAG
   ========================= */

function renderType(type: string) {
  switch (type) {
    case "reorder":
      return <Tag label="reorder" variant="default" />;
    case "expiration":
      return <Tag label="expiration" variant="danger" />;
    case "allocation":
      return <Tag label="allocation" variant="default" />;
    case "cycle-count":
      return <Tag label="cycle-count" variant="success" />;
    default:
      return <Tag label={type} />;
  }
}

/* =========================
   DATA
   ========================= */

type RuleRow = DataTableRow & {
  id: number;
  name: string;
  type: string;
  condition: string;
  action: string;
  threshold: number;
  active: string;
};

const rows: RuleRow[] = [
  {
    id: 1,
    name: "Automatic Reorder",
    type: "reorder",
    condition: "Stock Level < Reorder Point",
    action: "Create purchase order",
    threshold: 20,
    active: "true",
  },
  {
    id: 2,
    name: "Expiration Alert",
    type: "expiration",
    condition: "Days Until Expiry < 30",
    action: "Flag for priority sale",
    threshold: 30,
    active: "true",
  },
  {
    id: 3,
    name: "High-Velocity Allocation",
    type: "allocation",
    condition: "Turnover Rate > 10/month",
    action: "Allocate to front zones",
    threshold: 10,
    active: "true",
  },
  {
    id: 4,
    name: "Weekly Cycle Count",
    type: "cycle-count",
    condition: "Days Since Last Count > 7",
    action: "Schedule cycle count",
    threshold: 7,
    active: "true",
  },
  {
    id: 5,
    name: "Overstock Management",
    type: "allocation",
    condition: "Stock Level > Max Capacity * 0.9",
    action: "Move to overflow storage",
    threshold: 90,
    active: "true",
  },
  {
    id: 6,
    name: "Dead Stock Identification",
    type: "allocation",
    condition: "No Movement > 180 days",
    action: "Flag for clearance",
    threshold: 180,
    active: "false",
  },
];

/* =========================
   COLUMNS
   ========================= */

const columns: DataTableColumn[] = [
  {
    key: "name",
    label: "Rule name",
    width: 260,
    renderCell: (value) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Icon name="warning" size="sm" />
        <span>{String(value)}</span>
      </div>
    ),
  },
  {
    key: "type",
    label: "Type",
    width: 150,
    renderCell: (value) => renderType(String(value)),
  },
  {
    key: "condition",
    label: "Condition",
    width: 230,
  },
  {
    key: "action",
    label: "Action",
    width: 240,
  },
  {
    key: "threshold",
    label: "Threshold",
    width: 105,
    align: "right",
  },
  {
    key: "active",
    label: "Active rule",
    width: 118,
    wrap: true,
    align: "left",
    renderCell: (value) => (
      <Toggle
        checked={value === "true"}
        onCheckedChange={() => {}}
        title=""
      />
    ),
  },
];

/* =========================
   COMPONENT
   ========================= */

export default function ConfigurationInventoryRules() {
  return (
    <PageLayout
      title="Inventory rules"
      subtitle="Configure automation rules for stock handling and replenishment"
    >
      <PageSection>
        <DataTableCore
          rowIdKey="id"
          columns={columns}
          rows={rows}
          showCustomize={false}
          showActiveFilters={false}
        />
      </PageSection>
    </PageLayout>
  );
}
