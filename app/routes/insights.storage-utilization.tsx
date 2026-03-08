import type { LoaderFunction } from "react-router";
import { useState } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";

import { Card } from "@/components/ui/card/Card";
import { Icon } from "@/components/ui/icon/Icon";
import { Button } from "@/components/ui/button/Button";
import { Select } from "@/components/ui/select/Select";

import {
  SelectableDataTable,
} from "@/components/data/SelectableDataTable";

import type {
  DataTableColumn,
  DataTableRow,
} from "@/components/data/DataTableCore";

import {
  BarChart,
  LineChart,
} from "@mui/x-charts";

export const loader: LoaderFunction = async () => null;

/* =========================
   TYPES
   ========================= */

type Row = DataTableRow & {
  id: number;
  productId: string;
  name: string;
  quantity: number;
  fillRate: string;
  locations: number;
  saved: number;
};

/* =========================
   COMPONENT
   ========================= */

export default function InsightsSpaceOptimization() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [target, setTarget] = useState<string | null>("compress");
  const [locationFilter, setLocationFilter] = useState<string | null>("all");

  /* =========================
     TABLE DATA
     ========================= */

  const rows: Row[] = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    productId: "Label",
    name: "Label",
    quantity: 100,
    fillRate: "Label",
    locations: 5,
    saved: 2,
  }));

  const columns: DataTableColumn[] = [
    { key: "productId", label: "Product ID" },
    { key: "name", label: "Product Name" },
    { key: "quantity", label: "Quantity" },
    { key: "fillRate", label: "Average fill rate" },
    { key: "locations", label: "Distinct locations" },
    { key: "saved", label: "Location saved" },
  ];

  /* =========================
     RENDER
     ========================= */

  return (
    <PageLayout
      title="Space optimization"
      subtitle="Optimize storage by identifying underused locations and suggesting compression and removal."
    >
      {/* METRICS */}
      <PageSection>
        <div className="layout-grid-4">

          <Card className="layout-card-fill">
            <div className="card-header">
              <Icon name="database" />
              <h3>Potential by compressing</h3>
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "baseline",
                gap: 6,
              }}
            >
              <strong style={{ fontSize: 28 }}>9 876</strong>
              <span style={{ color: "var(--color-text-muted)" }}>
                / 9 876
              </span>
            </div>
          </Card>


          <Card className="layout-card-fill">
            <div className="card-header">
              <Icon name="database" />
              <h3>Potential by reducing deadstock</h3>
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "baseline",
                gap: 6,
              }}
            >
              <strong style={{ fontSize: 28 }}>8 765</strong>
              <span style={{ color: "var(--color-text-muted)" }}>
                / 8 765
              </span>
            </div>
          </Card>

          <Card className="layout-card-fill">
            <div className="card-header">
              <Icon name="database" />
              <h3>Avg. location fill rate</h3>
            </div>

            <div className="layout-stack">
              <strong style={{ fontSize: 28, color: "#07930A" }}>58.84%</strong>
              <span>↑ 5% vs. yesterday</span>
            </div>
          </Card>

          <Card className="layout-card-fill">
            <div className="card-header">
              <Icon name="database" />
              <h3>Used location</h3>
            </div>

            <div className="layout-stack">
              <strong style={{ fontSize: 28 }}>61.11%</strong>
              <span>↑ 0.3% vs. yesterday</span>
            </div>
          </Card>
        </div>
      </PageSection>

      {/* TABLE */}
      <PageSection>
        <Card>
          {/* HEADER */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "var(--space-4)",
              borderBottom: "1px solid var(--color-table-border)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-2)",
              }}
            >
              <Icon name="info" />
              <strong>Locations to compress</strong>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <Select
                label="Optimization target"
                value={target}
                onChange={setTarget}
                options={[
                  { value: "compress", label: "Locations to compress" },
                  { value: "remove", label: "Deadstock removal" },
                ]}
              />

              <Button
                variant="secondary"
                leadingIcon="download"
              >
                Export
              </Button>
            </div>
          </div>

          {/* SEARCH */}
          <div
            style={{
              padding: "var(--space-4)",
              borderBottom: "1px solid var(--color-table-border)",
              display: "flex",
              gap: 8,
            }}
          >
            <input
              placeholder="Search for something"
              style={{
                flex: 1,
                height: 36,
                padding: "0 12px",
                borderRadius: 8,
                border: "1px solid var(--color-input-border)",
              }}
            />

            <Button variant="secondary">Search</Button>
          </div>

          {/* TABLE */}
          <SelectableDataTable
            rowIdKey="id"
            columns={columns}
            rows={rows}
            selectedRows={selectedRows}
            onSelectionChange={setSelectedRows}
          />
        </Card>
      </PageSection>

      {/* BAR CHART */}
      <PageSection>
        <Card>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "var(--space-4)",
              borderBottom: "1px solid var(--color-table-border)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Icon name="info" />
              <strong>Potential for saving locations/bins</strong>
            </div>

            <Button variant="secondary" leadingIcon="download">
              Export
            </Button>
          </div>

          <div style={{ height: 320, padding: 16 }}>
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: ["1/1", "1/2", "1/4", "1/8", "1/16"],
                },
              ]}
              series={[
                {
                  label: "After compression",
                  data: [52000, 42000, 36000, 30000, 16000],
                },
                {
                  label: "Before compression",
                  data: [60000, 50000, 45000, 40000, 25000],
                },
              ]}
            />
          </div>
        </Card>
      </PageSection>

      {/* LINE CHART */}
      <PageSection>
        <Card>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "var(--space-4)",
              borderBottom: "1px solid var(--color-table-border)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Icon name="info" />
              <strong>Location utilization trend</strong>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <Select
                label="All Locations"
                value={locationFilter}
                onChange={setLocationFilter}
                options={[
                  { value: "all", label: "All Locations" },
                  { value: "zoneA", label: "Zone A" },
                ]}
              />

              <Button variant="secondary" leadingIcon="download">
                Export
              </Button>
            </div>
          </div>

          <div style={{ height: 320, padding: 16 }}>
            <LineChart
              xAxis={[
                {
                  scaleType: "point",
                  data: ["DD", "DD", "DD", "DD", "DD", "DD", "DD", "DD"],
                },
              ]}
              series={[
                {
                  label: "Fill rate",
                  data: [92, 93, 97, 95, 98, 94, 96, 100],
                },
              ]}
            />
          </div>
        </Card>
      </PageSection>
    </PageLayout>
  );
}

/* =========================
   METRIC CARD
   ========================= */

function MetricCard({
  title,
  value,
  sub,
  highlight,
  trend,
}: {
  title: string;
  value: string;
  sub?: string;
  highlight?: boolean;
  trend?: string;
}) {
  return (
    <Card className="layout-card-fill">
      <div
        style={{
          padding: "var(--space-4)",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          border: highlight
            ? "1px solid var(--color-success)"
            : undefined,
          borderRadius: "var(--radius-m)",
          background: highlight
            ? "var(--callout-success-bgcolor)"
            : undefined,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: "var(--font-default)",
            color: "var(--color-text-muted)",
          }}
        >
          {title}
          <Icon name="info" size="xs" />
        </div>

        <div
          style={{
            fontSize: 28,
            fontWeight: "var(--font-weight-bold)",
            color: highlight
              ? "var(--color-success)"
              : "var(--color-text)",
          }}
        >
          {value}
          {sub && (
            <span
              style={{
                fontSize: 14,
                color: "var(--color-text-muted)",
                marginLeft: 6,
              }}
            >
              / {sub}
            </span>
          )}
        </div>

        {trend && (
          <div
            style={{
              fontSize: 13,
              color: "var(--color-success)",
            }}
          >
            {trend}
          </div>
        )}
      </div>
    </Card>
  );
}