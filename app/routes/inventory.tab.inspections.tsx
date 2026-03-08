import { useState } from "react";

import { SelectableExpandableDataTable } from "@/components/data/SelectableExpandableDataTable";
import type {
  DataTableColumn,
  DataTableRow,
} from "@/components/data/DataTableCore";

import { Tag } from "@/components/ui/tag/Tag";

/* =========================
   STATUS RENDER
========================= */

function renderStatus(status: string) {
  switch (status) {
    case "Scheduled":
      return <Tag label={status} variant="default" />;

    case "In progress":
      return <Tag label={status} variant="warning" />;

    case "Completed":
      return <Tag label={status} variant="success" />;

    case "Paused":
      return <Tag label={status} variant="danger" />;

    default:
      return status;
  }
}

/* =========================
   REASON TAG (same as compartments)
========================= */

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

/* =========================
   EXPANDED ROW CONTENT
========================= */

function renderExpandedInspectionRow() {
  return (
    <div className="inspection-expanded">
      <table className="inspection-expanded__table">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Product</th>
            <th>Status</th>
            <th>Bin ID</th>
            <th>Compartment ID</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td>Minymo Cardigan - Knitted - Woodrose</td>
            <td>{renderStatus("In progress")}</td>
            <td>AS-786598</td>
            <td>AS-786598-01</td>
          </tr>

          <tr>
            <td></td>
            <td></td>
            <td>Minymo Cardigan w. Teddy - Parisian Night</td>
            <td>{renderStatus("In progress")}</td>
            <td>AS-723541</td>
            <td>AS-723541-03</td>
          </tr>

          <tr>
            <td></td>
            <td></td>
            <td>
              Labeladidas Performance Shoes - Advantage 2.0 -
              Ftwwht/Cblack/Legink
            </td>
            <td>{renderStatus("In progress")}</td>
            <td>AS-799501</td>
            <td>AS-799501-04</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/* =========================
   COMPONENT
========================= */

export default function InspectionsTab() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const columns: DataTableColumn[] = [
    {
      key: "inspection",
      label: "Inspection ID",
    },
    {
      key: "status",
      label: "Status",
      renderCell: (v) => renderStatus(String(v)),
    },
    {
      key: "bins",
      label: "Connected bins",
    },
    {
      key: "reason",
      label: "Reason codes",
      renderCell: (v) => renderReasonTag(String(v)),
    },
    {
      key: "prepared",
      label: "Prepared",
    },
    {
      key: "origin",
      label: "Origin",
    },
    {
      key: "created",
      label: "Created",
    },
  ];

  const rows: DataTableRow[] = [
    {
      id: 1,
      inspection: "INV-2026.007",
      status: "Scheduled",
      bins: "2 bins",
      reason: "-",
      prepared: "9/10",
      origin: "Manual",
      created: "18-Feb-2026",
    },
    {
      id: 2,
      inspection: "INV-2026.006",
      status: "In progress",
      bins: "2 bins",
      reason: "Count mismatch",
      prepared: "3/12",
      origin: "Deviation",
      created: "16-Feb-2026",
    },
    {
      id: 3,
      inspection: "INV-2026.006",
      status: "Completed",
      bins: "1 bin",
      reason: "-",
      prepared: "10/14",
      origin: "Inventory count",
      created: "13-Feb-2026",
    },
    {
      id: 4,
      inspection: "INV-2026.005",
      status: "In progress",
      bins: "3 bins",
      reason: "Wrong location",
      prepared: "3/12",
      origin: "Deviation",
      created: "12-Feb-2026",
    },
    {
      id: 5,
      inspection: "INV-2026.004",
      status: "Paused",
      bins: "1 bin",
      reason: "Expired",
      prepared: "10/17",
      origin: "Inventory count",
      created: "13-Feb-2026",
    },
    {
      id: 6,
      inspection: "INV-2026.003",
      status: "In progress",
      bins: "2 bins",
      reason: "Damaged",
      prepared: "4/19",
      origin: "Manual",
      created: "11-Feb-2026",
    },
    {
      id: 7,
      inspection: "INV-2026.002",
      status: "In progress",
      bins: "4 bins",
      reason: "-",
      prepared: "1/9",
      origin: "Manual",
      created: "10-Feb-2026",
    },
  ];

  return (
    <SelectableExpandableDataTable
      rowIdKey="id"
      columns={columns}
      rows={rows}
      selectedRows={selectedRows}
      onSelectionChange={setSelectedRows}
      expandedRows={expandedRows}
      onExpandChange={setExpandedRows}
      renderExpandedRow={renderExpandedInspectionRow}
    />
  );
}