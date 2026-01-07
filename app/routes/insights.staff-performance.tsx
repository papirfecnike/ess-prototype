import type { LoaderFunction } from "react-router";
import { useState } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";
import { Card } from "@/components/ui/card/Card";
import { Icon } from "@/components/ui/icon/Icon";
import { Select } from "@/components/ui/select/Select";
import { SelectableDataTable } from "@/components/data/SelectableDataTable";
import type { DataTableColumn } from "@/components/data/DataTableCore";
import "@/styles/layouts.css";

import { BarChart, LineChart, ScatterChart } from "@mui/x-charts";

export const loader: LoaderFunction = async () => null;

const EMPLOYEES = [
  "Christopher Newmann",
  "Sia Taylor",
  "Paal Ramazotti",
  "Ivan D. Hoffmann",
  "Sarah Pittmann",
  "Daniel Haugen",
  "Frida Rickman",
  "Alan Kovach",
  "Jon Brathen",
  "Ted Thomanson",
  "Jane Smith",
  "Emma Garcia",
  "Sid Davis",
  "John Merrywood",
  "Tom Wilson",
];

const TREND_LABELS = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);

const TREND_DATA = TREND_LABELS.map((_, i) =>
  Math.round(60 + Math.sin(i / 4) * 20 + i * 0.8)
); 

/* =========================
   BAR + TREND CHART
   ========================= */

function BarWithTrendChart() {
  const labels = Array.from({ length: 50 }, (_, i) => `T${i + 1}`);

  const barData = labels.map(
    () => Math.floor(Math.random() * 1000) + 200
  );

  const trendData = barData.map((_, i, arr) => {
    const slice = arr.slice(Math.max(0, i - 4), i + 1);
    return Math.round(
      slice.reduce((a, b) => a + b, 0) / slice.length
    );
  });

  return (
    <div style={{ position: "relative", height: 320 }}>
      <BarChart
        height={320}
        xAxis={[
          {
            scaleType: "band",
            data: labels,
          },
        ]}
        series={[
          {
            label: "Operations",
            data: barData, 
            color: "#137897"
          },
        ]}
        sx={{
          "& .MuiChartsAxis-bottom": {
            display: "none",
          },
        }}
      />

      <LineChart
        height={320}
        xAxis={[
          {
            scaleType: "point",
            data: TREND_LABELS,
          },
        ]}
        series={[
          {
            label: "Trend",
            data: TREND_DATA,
            curve: "monotoneX",
            color: "#137897"
          },
        ]}
      />

    </div>
  );
}

/* =========================
   TABLE DATA
   ========================= */

const columns: DataTableColumn[] = [
  { key: "rank", label: "Rank" },
  { key: "name", label: "Name" },
  { key: "kpi", label: "KPI" },
  { key: "category", label: "Category" },
];

const rows = [
  {
    id: "1",
    rank: 1,
    name: "Jane Smith",
    kpi: "92",
    category: "Best performers",
  },
  {
    id: "2",
    rank: 2,
    name: "Emma Garcia",
    kpi: "90",
    category: "High efficiency",
  },
  {
    id: "3",
    rank: 3,
    name: "Sid Davis",
    kpi: "89",
    category: "High efficiency",
  },
  {
    id: "4",
    rank: 4,
    name: "John Merrywood",
    kpi: "88",
    category: "High efficiency",
  },
  {
    id: "5",
    rank: 5,
    name: "Tom Wilson",
    kpi: "87",
    category: "High efficiency",
  },
];

/* =========================
   PAGE
   ========================= */

export default function InsightsStaffPerformance() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  return (
    <PageLayout
      title="Staff performance"
      subtitle="Analyze operational productivity and efficiency metrics"
    >
      {/* TOP WIDGETS */}
      <PageSection>
        <div className="layout-grid-4">
          <Card className="layout-card-fill">
            <div className="card-header">
              <Icon name="database" />
              <h3>Bin presentation / hour</h3>
            </div>
            <div className="layout-stack">
              <strong style={{ fontSize: 28, color: "#07930A" }}>156</strong>
              <span>+12% from last hour</span>
            </div>
          </Card>

          <Card className="layout-card-fill">
            <div className="card-header">
              <Icon name="archive" />
              <h3>Orders completed</h3>
            </div>
            <div className="layout-stack">
              <strong style={{ fontSize: 28, color: "#07930A" }}>89</strong>
              <span>On track for daily goal</span>
            </div>
          </Card>

          <Card className="layout-card-fill">
            <div className="card-header">
              <Icon name="inbox" />
              <h3>Avg. pick time</h3>
            </div>
            <div className="layout-stack">
              <strong style={{ fontSize: 28, color: "#CA1520" }}>161</strong>
              <span>-12.3s fall</span>
            </div>
          </Card>

          <Card className="layout-card-fill">
            <div className="card-header">
              <Icon name="alertTriangle" />
              <h3>Efficiency score</h3>
            </div>
            <div className="layout-stack">
              <strong style={{ fontSize: 28, color: "#07930A" }}>97%</strong>
            </div>
          </Card>
        </div>
      </PageSection>

      {/* SCATTER */}
      <PageSection>
        <Card>
          <div className="card-header">
            <Icon name="barChart" />
            <h3>Performance analysis</h3>
          </div>

          <div style={{ height: 320 }}>
            <ScatterChart
              height={320}
              xAxis={[{ label: "Time", min: 0, max: 100 }]}
              yAxis={[{ label: "Performance", min: 0, max: 200 }]}
              series={[
                {
                  label: "Events",
                  data: [
                    { x: 5, y: 120 },
                    { x: 12, y: 135 },
                    { x: 18, y: 110 },
                    { x: 25, y: 150 },
                    { x: 35, y: 165 },
                    { x: 50, y: 140 },
                    { x: 65, y: 175 },
                    { x: 80, y: 160 },
                  ],
                  color: "#137897",
                },
              ]}
            />
          </div>
        </Card>
      </PageSection>

      {/* TABLE + CHART */}
      <PageSection>
        <div className="layout-grid-2">
          <Card className="layout-card-fill">
            <div className="card-header">
              <Icon name="barChart" />
              <h3>Staff ranking</h3>
            </div>

            <div className="table--no-header-footer">
              <SelectableDataTable
                rowIdKey="id"
                columns={columns}
                rows={rows}
                selectedRows={selectedRows}
                onSelectionChange={setSelectedRows}
              />
            </div>
          </Card>

          <Card className="layout-card-fill">
            <div className="card-header">
              <Icon name="barChart" />
              <h3>User details</h3>
            </div>

            <div className="layout-stack">
              <Select
                label="Select employee"
                value={null}
                onChange={() => {}}
                options={EMPLOYEES.map(name => ({
                  value: name,
                  label: name,
                }))}
              />
            </div>
          </Card>
        </div>
      </PageSection>

      <PageSection>
        <Card>
          <div className="card-header">
            <Icon name="barChart" />
            <h3>Performance trends</h3>
          </div>

          <div style={{ height: 320 }}>
            <LineChart
              height={320}
              xAxis={[
                {
                  scaleType: "point",
                  data: TREND_LABELS,
                },
              ]}
              series={[
                {
                  label: "Trend",
                  data: TREND_DATA,
                  curve: "monotoneX",
                  color: "#137897",
                },
              ]}
            />

          </div>
        </Card>
      </PageSection>
    </PageLayout>
  );
}
