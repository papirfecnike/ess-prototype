import type { LoaderFunction } from "react-router";
import { useState, useMemo } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";

import { ReorderDataTable } from "@/components/data/ReorderDataTable";
import type {
  DataTableColumn,
  DataTableRow,
} from "@/components/data/DataTableCore";

import { Icon } from "@/components/ui/icon/Icon";
import { Button } from "@/components/ui/button/Button";
import { Toggle } from "@/components/ui/toggle/Toggle";

export const loader: LoaderFunction = async () => null;

/* =========================
   TYPES
   ========================= */

type PrioritizationRow = DataTableRow & {
  id: number;
  priority: number;
  rulename: string;
  condition: string;
  action: string;
  active: string; // DataTableRow miatt string
};

/* =========================
   COMPONENT
   ========================= */

export default function ConfigurationPrioritization() {
  /* =========================
     STATE
     ========================= */

  const [baseRows, setBaseRows] = useState<
    Omit<PrioritizationRow, "priority" | "id">[]
  >([
    {
      rulename: "Express Orders",
      condition: "Order Type = Express",
      action: "Move to front of queue",
      active: "true",
    },
    {
      rulename: "Large Volume Orders",
      condition: "Item Count > 50",
      action: "Assign to dedicated picker",
      active: "true",
    },
    {
      rulename: "VIP Customers",
      condition: "Customer Tier = VIP",
      action: "Priority picking",
      active: "true",
    },
    {
      rulename: "Time-Sensitive",
      condition: "Ship By Date < 24h",
      action: "Expedite processing",
      active: "true",
    },
    {
      rulename: "Hazmat Items",
      condition: "Contains Hazmat = Yes",
      action: "Route to certified handlers",
      active: "true",
    },
  ]);

  /* =========================
     ROWS WITH PRIORITY
     ========================= */

    const rows: PrioritizationRow[] = useMemo(
      () =>
        baseRows.map((row, index) => ({
          ...row,
          id: index + 1,
          priority: index + 1,
        })) as PrioritizationRow[],
      [baseRows]
    );

  /* =========================
     REORDER
     ========================= */

  function moveRow(index: number, direction: "up" | "down") {
    setBaseRows((prev) => {
      const next = [...prev];

      const target =
        direction === "up" ? index - 1 : index + 1;

      if (target < 0 || target >= next.length) {
        return prev;
      }

      [next[index], next[target]] = [
        next[target],
        next[index],
      ];

      return next;
    });
  }

  /* =========================
     ACTIVE COUNT
     ========================= */

  const activeCount = rows.filter(
    (r) => r.active === "true"
  ).length;

  /* =========================
     COLUMNS
     ========================= */

  const columns: DataTableColumn[] = [
  {
    key: "rulename",
    label: "Rule name",
    renderCell: (value) => (
      <strong>{String(value)}</strong>
    ),
  },
  {
    key: "condition",
    label: "Condition",
  },
  {
    key: "action",
    label: "Action",
  },
  {
    key: "actions",
    label: "",
    align: "right",
    renderCell: (_value, row) => (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 12,
          width: "100%",
        }}
      >
        <Toggle
          checked={row.active === "true"}
          onCheckedChange={() => {}}
          title=""
        />

        <button
          type="button"
          className="btn--ghost"
          aria-label="Edit"
        >
          <Icon name="edit" size="sm" />
        </button>
      </div>
    ),
  },
];

  /* =========================
     RENDER
     ========================= */

  return (
    <PageLayout
      title="Prioritization"
      subtitle="Define and adjust processing order for inbound tasks"
    >
      <PageSection>
        <ReorderDataTable
          rowIdKey="id"
          columns={columns}
          rows={rows}
          onMoveRow={moveRow}
        />
      </PageSection>
    </PageLayout>
  );
}