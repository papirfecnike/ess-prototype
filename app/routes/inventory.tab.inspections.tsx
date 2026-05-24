import { useMemo, useState } from "react";

import { DataTableCore } from "@/components/data/DataTableCore";
import type { DataTableColumn, DataTableRow } from "@/components/data/DataTableCore";

import { Tag } from "@/components/ui/tag/Tag";
import { Chip } from "@/components/ui/chip/Chip";

function renderStatus(status: string) {
  switch (status) {
    case "Scheduled": return <Tag label={status} variant="default" />;
    case "In progress": return <Tag label={status} variant="warning" />;
    case "Completed": return <Tag label={status} variant="success" />;
    case "Paused": return <Tag label={status} variant="danger" />;
    default: return status;
  }
}

function renderReasonTag(reason: string) {
  switch (reason) {
    case "Count mismatch": return <Tag label={reason} variant="mismatch" />;
    case "Expired": return <Tag label={reason} variant="expired" />;
    case "Missing": return <Tag label={reason} variant="missing" />;
    case "Wrong compartment": return <Tag label={reason} variant="location" />;
    case "Damaged": return <Tag label={reason} variant="damaged" />;
    default: return reason;
  }
}

export default function InspectionsTab() {

  const [activeReasons, setActiveReasons] = useState<string[]>([]);

  const columns: DataTableColumn[] = [
    { key: "inspection", label: "Inspection ID", width: 150 },
    { key: "status", label: "Status", width: 120, renderCell: (v) => renderStatus(String(v)) },
    { key: "bins", label: "Connected bins", width: 130 },
    { key: "reason", label: "Reason codes", width: 230, renderCell: (v) => renderReasonTag(String(v)) },
    { key: "prepared", label: "Prepared", width: 100 },
    { key: "origin", label: "Origin", width: 130 },
    { key: "created", label: "Created", width: 130 },
  ];

  const rows: DataTableRow[] = [
    { id: 1, inspection: "INV-2026.007", status: "Scheduled", bins: "2 bins", reason: "-", prepared: "9/10", origin: "Manual", created: "18-Feb-2026" },
    { id: 2, inspection: "INV-2026.006", status: "In progress", bins: "2 bins", reason: "Count mismatch", prepared: "3/12", origin: "Deviation", created: "16-Feb-2026" },
    { id: 3, inspection: "INV-2026.006", status: "Completed", bins: "1 bin", reason: "-", prepared: "10/14", origin: "Inventory count", created: "13-Feb-2026" },
    { id: 4, inspection: "INV-2026.005", status: "In progress", bins: "3 bins", reason: "Wrong compartment", prepared: "3/12", origin: "Deviation", created: "12-Feb-2026" },
    { id: 5, inspection: "INV-2026.004", status: "Paused", bins: "1 bin", reason: "Expired", prepared: "10/17", origin: "Inventory count", created: "13-Feb-2026" },
    { id: 6, inspection: "INV-2026.003", status: "In progress", bins: "2 bins", reason: "Damaged", prepared: "4/19", origin: "Manual", created: "11-Feb-2026" },
    { id: 7, inspection: "INV-2026.002", status: "In progress", bins: "4 bins", reason: "-", prepared: "1/9", origin: "Manual", created: "10-Feb-2026" },
  ];

  function toggleReason(reason: string) {
    setActiveReasons(prev =>
      prev.includes(reason) ? prev.filter(r => r !== reason) : [...prev, reason]
    );
  }

  const filteredRows = useMemo(() => {
    if (activeReasons.length === 0) return rows;
    return rows.filter(row => activeReasons.includes(String(row.reason)));
  }, [rows, activeReasons]);

  const reasonStats = useMemo(() => {
    const map: Record<string, number> = {};
    rows.forEach(row => {
      if (row.reason === "-") return;
      const key = String(row.reason);
      map[key] = (map[key] ?? 0) + 1;
    });
    return Object.entries(map);
  }, [rows]);

  const detailsContent = (
    <>
      <div className="data-table__text">REASON CODES</div>
      <div className="data-table__chips">
        {reasonStats.map(([reason, count]) => (
          <Chip key={reason} isActive={activeReasons.includes(reason)} onClick={() => toggleReason(reason)}>
            {reason} ({count})
          </Chip>
        ))}
      </div>
    </>
  );

  return (
    <DataTableCore
      rowIdKey="id"
      columns={columns}
      rows={filteredRows}
      detailsContent={detailsContent}
    />
  );
}
