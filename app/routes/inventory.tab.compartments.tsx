import { useMemo, useState } from "react";

import { SelectableDataTable } from "@/components/data/SelectableDataTable";
import type { DataTableColumn } from "@/components/data/DataTableCore";

import { Tag } from "@/components/ui/tag/Tag";

function renderReasonTag(reason: string) {
  switch (reason) {
    case "Count mismatch":
      return <Tag label={reason} variant="danger" />;

    case "Expired":
      return <Tag label={reason} variant="danger" />;

    case "Missing":
      return <Tag label={reason} variant="danger" />;

    case "Wrong location":
      return <Tag label={reason} variant="warning" />;

    case "Damaged":
      return <Tag label={reason} variant="danger" />;

    default:
      return reason;
  }
}

export default function CompartmentsTab() {

  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const columns: DataTableColumn[] = [
    { key: "product", label: "Product" },
    { key: "compartment", label: "Compartment ID" },
    { key: "bin", label: "Bin ID" },
    { key: "stock", label: "Stock quantity" },

    {
      key: "reason",
      label: "Reason codes",
      renderCell: (v) => renderReasonTag(String(v)),
    },

    { key: "tasks", label: "Existing tasks" },
  ];

  const rows = [
    {
      id: 1,
      product: "Bisgaard Winter Boots - Pixie - Khaki",
      compartment: "AS-786544-01",
      bin: "AS-786544",
      stock: 10,
      reason: "-",
      tasks: "INV-2026.001",
    },

    {
      id: 2,
      product: "Minymo Cardigan - Knitted - Woodrose",
      compartment: "AS-786598-02",
      bin: "AS-786598",
      stock: 3,
      reason: "Count mismatch",
      tasks: "INV-2026.001",
    },
    {
      id: 3,
      product: "Minymo Cardigan w. Teddy - Parisian Night",
      compartment: "AS-723541-03",
      bin: "AS-723541",
      stock: 12,
      reason: "-",
      tasks: "INV-2026.001",
    },

    {
      id: 4,
      product: "-",
      compartment: "-",
      bin: "-",
      stock: 8,
      reason: "Expired",
      tasks: " ",
    },
    {
      id: 5,
      product: "adidas Performance Shoes - Advantage 2.0 - Ftwwht/Cblack/Legink",
      compartment: "AS-799501-04",
      bin: "AS-799501",
      stock: 11,
      reason: "Missing",
      tasks: "INV-2026.001",
    },
    {
      id: 6,
      product: "-",
      compartment: "-",
      bin: "-",
      stock: 7,
      reason: "Damaged",
      tasks: " ",
    },
    {
      id: 7,
      product: "-",
      compartment: "-",
      bin: "-",
      stock: 9,
      reason: "Wrong location",
      tasks: " ",
    },
  ];

  const filteredRows = useMemo(() => rows, []);

  return (
    <SelectableDataTable
      rowIdKey="id"
      columns={columns}
      rows={filteredRows}
      selectedRows={selectedRows}
      onSelectionChange={setSelectedRows}
    />
  );
}