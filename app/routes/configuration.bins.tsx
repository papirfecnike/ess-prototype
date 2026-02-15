import type { LoaderFunction } from "react-router";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";

import { Card } from "@/components/ui/card/Card";
import { Tag } from "@/components/ui/tag/Tag";
import { ProgressBar } from "@/components/ui/progress-bar/ProgressBar";

import {
  ReorderDataTable,
} from "@/components/data/ReorderDataTable";

import type {
  DataTableColumn,
  DataTableRow,
} from "@/components/data/DataTableCore";

export const loader: LoaderFunction = async () => {
  return null;
};

/* =========================
   ROW TYPE
   ========================= */

type BinRow = DataTableRow & {
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
      location: "BIN-A01-01",
      zone: "A",
      type: "Standard",
      capacity: "80 units",
      fillLevel: 65,
      status: "Occupied",
    },
    {
      location: "BIN-A01-02",
      zone: "A",
      type: "Oversized",
      capacity: "40 units",
      fillLevel: 20,
      status: "Available",
    },
    {
      location: "BIN-B03-07",
      zone: "B",
      type: "Hazmat",
      capacity: "30 units",
      fillLevel: 90,
      status: "Maintenance",
    },
    {
      location: "BIN-C02-11",
      zone: "C",
      type: "Temperature-controlled",
      capacity: "60 units",
      fillLevel: 45,
      status: "Reserved",
    },
  ];

  /* =========================
     COLUMNS
     ========================= */

  const columns: DataTableColumn[] = [
    {
      key: "location",
      label: "Location",
      sortable: true,
    },
    {
      key: "zone",
      label: "Zone",
      align: "center",
    },
    {
      key: "type",
      label: "Type",
      align: "center",
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
      align: "right",
    },
    {
      key: "fillLevel",
      label: "Fill level",
      align: "center",
      renderCell: (value) => {
        const percentage = Number(value);

        return (
          <div style={{ minWidth: 140 }}>
            <ProgressBar value={percentage} />
            <div
              style={{
                fontSize: 12,
                marginTop: 4,
                textAlign: "right",
              }}
            >
              {percentage}%
            </div>
          </div>
        );
      },
    },
    {
      key: "status",
      label: "Status",
      align: "center",
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <Card>
            <h3>Total bins</h3>
            <div style={{ fontSize: 32, fontWeight: 700, marginTop: 8 }}>
              8
            </div>
          </Card>

          <Card>
            <h3>Available</h3>
            <div style={{ fontSize: 32, fontWeight: 700,marginTop: 8 }}>
              1
            </div>
          </Card>

          <Card>
            <h3>Occupied</h3>
            <div style={{ fontSize: 32, fontWeight: 700,marginTop: 8 }}>
              5
            </div>
          </Card>

          <Card>
            <h3>Avg. fill rate</h3>
            <div style={{ fontSize: 32, fontWeight: 700, marginTop: 8 }}>
              39%
            </div>
          </Card>
        </div>

        {/* =========================
            TABLE
            ========================= */}
        <ReorderDataTable
          enableReorder={false}
          rowIdKey="id"
          columns={columns}
          rows={rows}
          onMoveRow={() => {
          }}
        />
      </PageSection>
    </PageLayout>
  );
}
