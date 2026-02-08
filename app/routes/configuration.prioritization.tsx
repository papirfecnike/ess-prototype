import type { LoaderFunction } from "react-router";
import { useState, useMemo } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";

import { ReorderDataTable } from "@/components/data/ReorderDataTable";
import type { DataTableColumn, DataTableRow } from "@/components/data/DataTableCore";

import { Tag } from "@/components/ui/tag/Tag";
import { Icon } from "@/components/ui/icon/Icon";
import { Button } from "@/components/ui/button/Button";

export const loader: LoaderFunction = async () => {
  return null;
};

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

type PrioritizationRow = DataTableRow & {
  id: number;
  priority: number;
};

export default function ConfigurationPrioritization() {
  /* =========================
     STATE
     ========================= */

  const [baseRows, setBaseRows] = useState<
    Omit<PrioritizationRow, "priority" | "id">[]
  >([
    {
      rulename: "Express orders",
      condition: "Order type = express",
      action: "Move to front of queue",
      status: "In progress",
      more: "",
    },
    {
      rulename: "Large volume orders",
      condition: "Item Count > 50",
      action: "Assign to dedicated picker",
      status: "In progress",
      more: "",
    },
    {
      rulename: "VIP customers",
      condition: "Customer tier = VIP",
      action: "Priority picking",
      status: "In progress",
      more: "",
    },
    {
      rulename: "Time-sensitive",
      condition: "Ship By Date < 24h",
      action: "Expedite processing",
      status: "In progress",
      more: "",
    },
    {
      rulename: "Hazmat items",
      condition: "Contains hazmat = yes",
      action: "Route to certified handlers",
      status: "In progress",
      more: "",
    },
  ]);

  const rows: PrioritizationRow[] = useMemo(
    () =>
      baseRows.map((row, index) => ({
        ...row,
        id: index + 1,
        priority: index + 1,
      })),
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
     COLUMNS
     ========================= */

  const columns: DataTableColumn[] = [
    { key: "priority", label: "#", align: "center" },
    { key: "rulename", label: "Rule name", sortable: true },
    { key: "condition", label: "Condition", sortable: true },
    { key: "action", label: "Action", sortable: true },
    {
      key: "status",
      label: "Status",
      align: "center",
      renderCell: (value) =>
        renderStatusTag(String(value)),
    },
    {
      key: "more",
      label: "",
      align: "right",
      renderCell: () => (
        <button
          type="button"
          className="btn--ghost"
          aria-label="More"
        >
          <Icon name="moreVert" size="sm" />
        </button>
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
        {/* TABLE HEADER ACTION */}

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
