import type { LoaderFunction } from "react-router";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";

import { Card } from "@/components/ui/card/Card";
import { Tag } from "@/components/ui/tag/Tag";
import { ProgressBar } from "@/components/ui/progress-bar/ProgressBar";
import { DataTableCore } from "@/components/data/DataTableCore";

import type {
  DataTableColumn,
  DataTableRow,
} from "@/components/data/DataTableCore";
import "@/styles/configuration-bins.css";

export const loader: LoaderFunction = async () => {
  return null;
};

/* =========================
   ROW TYPE
   ========================= */

type BinRow = DataTableRow & {
  id: string;
  location: string;
  zone: string;
  type: string;
  capacity: string;
  fillLevel: number;
  status: string;
};

/* =========================
   COMPONENT
   ========================= */

export default function ConfigurationBins() {


  /* =========================
     TABLE DATA
     ========================= */

  const rows: BinRow[] = [
    {
      id: "bin-a01-01",
      location: "BIN-A01-01",
      zone: "A",
      type: "Standard",
      capacity: "80 units",
      fillLevel: 65,
      status: "Occupied",
    },
    {
      id: "bin-a01-02",
      location: "BIN-A01-02",
      zone: "A",
      type: "Oversized",
      capacity: "40 units",
      fillLevel: 20,
      status: "Available",
    },
    {
      id: "bin-b03-07",
      location: "BIN-B03-07",
      zone: "B",
      type: "Hazmat",
      capacity: "30 units",
      fillLevel: 90,
      status: "Maintenance",
    },
    {
      id: "bin-c02-11",
      location: "BIN-C02-11",
      zone: "C",
      type: "Temperature-controlled",
      capacity: "60 units",
      fillLevel: 45,
      status: "Reserved",
    },
  ];

  const availableCount = rows.filter(row => row.status === "Available").length;
  const occupiedCount = rows.filter(row => row.status === "Occupied").length;
  const avgFill = Math.round(rows.reduce((sum, row) => sum + row.fillLevel, 0) / rows.length);

  /* =========================
     COLUMNS
     ========================= */

  const columns: DataTableColumn[] = [
    {
      key: "location",
      label: "Compartment",
      sortable: true,
      width: 220,
    },
    {
      key: "zone",
      label: "Zone",
      align: "left",
      width: 120,
    },
    {
      key: "type",
      label: "Type",
      align: "left",
      width: 230,
      renderCell: (value) => {
        const label = String(value);

        const colorMap: Record<string, string> = {
          Standard: "var(--color-greyblue)",
          Oversized: "var(--color-purple)",
          Hazmat: "var(--color-danger)",
          "Temperature-controlled": "var(--color-lightblue)",
        };

        return (
          <Tag
            label={label}
            color={colorMap[label]}
          />
        );
      },
    },
    {
      key: "capacity",
      label: "Capacity",
      align: "left",
      width: 150,
    },
    {
      key: "fillLevel",
      label: "Fill level",
      align: "left",
      width: 240,
      renderCell: (value) => {
        const percentage = Number(value);

        return (
          <div className="bins-fill">
            <ProgressBar value={percentage} />
            <span>{percentage}%</span>
          </div>
        );
      },
    },
    {
      key: "status",
      label: "Status",
      align: "left",
      width: 160,
      renderCell: (value) => {
        const label = String(value);

        const colorMap: Record<string, string> = {
          Occupied: "#DC2626",
          Available: "#16A34A",
          Maintenance: "#F59E0B",
          Reserved: "#2563EB",
        };

        return (
          <Tag
            label={label}
            color={colorMap[label]}
          />
        );
      },
    },
  ];

  /* =========================
     RENDER
     ========================= */

  return (
    <PageLayout
      title="Bins"
      subtitle="Overview of bin capacity and utilization"
    >
      <PageSection>
        {/* =========================
            KPI CARDS
            ========================= */}
        <div className="bins-live-grid">
          <Card className="bins-live-card">
            <div className="bins-live-card__header">
              <h3>Total bins</h3>
              <Tag label="Live" variant="success" />
            </div>
            <strong>{rows.length}</strong>
            <span>4 zones monitored</span>
          </Card>

          <Card className="bins-live-card">
            <div className="bins-live-card__header">
              <h3>Available</h3>
              <Tag label="+2 today" variant="default" />
            </div>
            <strong>{availableCount}</strong>
            <span>Ready for allocation</span>
          </Card>

          <Card className="bins-live-card">
            <div className="bins-live-card__header">
              <h3>Occupied</h3>
              <Tag label="Stable" variant="outlined" />
            </div>
            <strong>{occupiedCount}</strong>
            <span>Currently storing stock</span>
          </Card>

          <Card className="bins-live-card">
            <div className="bins-live-card__header">
              <h3>Avg. fill rate</h3>
              <Tag label="Optimal" variant="success" />
            </div>
            <strong>{avgFill}%</strong>
            <span>Average live utilization across active compartments</span>
          </Card>
        </div>

        {/* =========================
            TABLE
            ========================= */}
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
