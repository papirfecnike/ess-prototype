import type { LoaderFunction } from "react-router";
import { useState } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";

import { Card } from "@/components/ui/card/Card";
import { Icon } from "@/components/ui/icon/Icon";
import { Button } from "@/components/ui/button/Button";
import { Select } from "@/components/ui/select/Select";

import { SelectableDataTable } from "@/components/data/SelectableDataTable";
import type { DataTableColumn, DataTableRow } from "@/components/data/DataTableCore";

import { BarChart, LineChart } from "@mui/x-charts";

export const loader: LoaderFunction = async () => null;

type Row = DataTableRow & {
  id: number;
  productId: string;
  name: string;
  quantity: number;
  fillRate: string;
  locations: number;
  saved: number;
};

export default function InsightsSpaceOptimization() {

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [target, setTarget] = useState<string | null>("compress");
  const [locationFilter, setLocationFilter] = useState<string | null>("all");

const rows: Row[] = [
  {id: 1, productId: "WD750", name: "Bisgaard Winter Boots - Pixie - Khaki", quantity: 1240, fillRate: "32%", locations: 18, saved: 9,},
  {id: 2, productId: "WF773", name: "Name It Jumpsuit - NkfRoka - Burgundy", quantity: 980, fillRate: "41%", locations: 16, saved: 8,},
  {id: 3, productId: "BW975", name: "Minymo Cardigan - Knitted - Woodrose", quantity: 427, fillRate: "27%", locations: 11, saved: 9,},
  {id: 4, productId: "WC551", name: "Minymo Cardigan w. Teddy - Parisian Night", quantity: 650, fillRate: "48%", locations: 9, saved: 4,},
  {id: 5, productId: "WF685", name: "adidas Performance Shoes - Advantage 2.0", quantity: 730, fillRate: "36%", locations: 13, saved: 5,},
  {id: 6, productId: "WF681", name: "adidas Performance Shoes - Advantage 2.0 - Ftwwht/Cwhite/Legink", quantity: 2100, fillRate: "27%", locations: 21, saved: 12,},
  {id: 7, productId: "BM841", name: "adidas Performance Shoes - Run 70s 2.0 EL C - Navy/White", quantity: 521, fillRate: "49%", locations: 27, saved: 3,},
  {id: 8, productId: "WH768", name: "Name It Blouse - Rib - Noos - NmfKab - Lavender Gray", quantity: 302, fillRate: "19%", locations: 52, saved: 17,},
];

  const columns: DataTableColumn[] = [
    { key: "productId", label: "Product ID" },
    { key: "name", label: "Product name" },
    { key: "quantity", label: "Quantity" },
    { key: "fillRate", label: "Avg. fill rate" },
    { key: "locations", label: "Distinct compartments" },
    { key: "saved", label: "Compartments saved" },
  ];

  const tableTitle = target === "compress" ? "Compartments to compress" : "Deadstock removal";

  const categories = ["1/1", "1/2", "1/4A (horizontal)", "1/4B (vertical)", "1/8", "1/16"];

  const afterCompression = [52000, 42000, 36000, 48000, 30000, 16000];
  const beforeCompression = [60000, 50000, 45000, 56000, 40000, 25000];

  const beforeDelta = beforeCompression.map((v, i) => v - afterCompression[i]);

  return (
    <PageLayout
      title="Space optimization"
      subtitle="Optimize storage by identifying underused compartments and suggesting compression and removal."
    >

      <PageSection>
  <div className="layout-grid-4">

    <Card
      variant="metric"
      title={
        <>
          Potential by compressing
          <Icon name="info" size="xs" />
        </>
      }
      value="9 876"
      subValue="9 876"
      footer={
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Icon name="barcode" size="sm" />
          All compartments
        </div>
      }
    />

    <Card
      variant="metric"
      title={
        <>
          Potential by reducing deadstock
          <Icon name="info" size="xs" />
        </>
      }
      value="8 765"
      subValue="8 765"
      footer={
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Icon name="barcode" size="sm" />
          All compartments
        </div>
      }
    />

    <Card
      variant="metric"
      title={
        <>
          Avg. compartment fill rate
          <Icon name="info" size="xs" />
        </>
      }
      value="58.84%"
      trend="↑ 5% vs. yesterday"
    />

    <Card
      variant="metric"
      title={
        <>
          Used compartments
          <Icon name="info" size="xs" />
        </>
      }
      value="61.11%"
      trend="↑ 0.3% vs. yesterday"
    />

  </div>
</PageSection>

      <PageSection>
        <SelectableDataTable
          rowIdKey="id"
          columns={columns}
          rows={rows}
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
          tableTitle={tableTitle}
          headerActions={
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <Select
                label="Optimization target"
                value={target}
                onChange={setTarget}
                options={[
                  { value: "compress", label: "Compartments to compress" },
                  { value: "remove", label: "Deadstock removal" },
                ]}
              />
              <Button variant="secondary" size="sm" leadingIcon="download">
                Export
              </Button>
            </div>
          }
        />
      </PageSection>

      {/* STACKED BAR CHART */}
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
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    fontSize: "var(--font-section-title)",
                    fontWeight: "var(--font-weight-bold)",
                  }}
                >
                  Potential for saving compartments/bins
                </div>
                <Icon name="info" size="xs" />
              </div>

              <span style={{ fontSize: "var(--font-size-s)", color: "var(--color-text-muted)" }}>
                Data updates every NN minutes
              </span>
            </div>

            <Button variant="secondary" size="sm" leadingIcon="download">
              Export
            </Button>
          </div>

          <div style={{ padding: 16 }}>
            <BarChart
              height={360}
              xAxis={[{
                scaleType: "band",
                data: categories,
                label: "Compartment type",
              }]}
              yAxis={[{ label: "Potential amount of saving" }]}
              series={[
                {
                  label: "After compression",
                  data: afterCompression,
                  stack: "total",
                  color: "#0e7d9c",
                },
                {
                  label: "Before compression",
                  data: beforeDelta,
                  stack: "total",
                  color: "#753ca4",
                },
              ]}
            />
          </div>

        </Card>
      </PageSection>

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
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            fontSize: "var(--font-section-title)",
            fontWeight: "var(--font-weight-bold)",
          }}
        >
          Compartment utilization trend
        </div>
        <Icon name="info" size="xs" />
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>

        <div style={{ width: 240 }}>
          <Select
            label="Selected date range"
            value="range1"
            options={[
              { value: "range1", label: "29.07.2025 · 03.08.2026" },
              { value: "range2", label: "22.07.2025 · 28.07.2025" },
            ]}
            onChange={() => {}}
          />
        </div>

        <div style={{ width: 240 }}>
          <Select
            label="All compartments"
            value={locationFilter}
            onChange={setLocationFilter}
            options={[
              { value: "all", label: "All compartments" },
              { value: "zoneA", label: "Zone A" },
            ]}
          />
        </div>

        <Button variant="secondary" size="sm" leadingIcon="download">
          Export
        </Button>

      </div>
    </div>

    <div style={{ padding: 16 }}>
      <div style={{ padding: 16 }}>
        <LineChart
          height={360}
          margin={{ top: 20, bottom: 50, left: 60, right: 20 }}
          xAxis={[
            {
              scaleType: "point",
              data: [
                "29.07",
                "30.07",
                "31.07",
                "01.08",
                "02.08",
                "03.08",
                "04.08",
                "05.08",
              ],
              label: "Date",
            },
          ]}
          yAxis={[
            {
              label: "Fill rate",
              min: 85,
              max: 100,
            },
          ]}
          series={[
            {
              data: [92, 93, 97, 95, 98, 94, 96, 100],
              color: "#bab2cb",
              area: true,
              curve: "monotoneX",
            },
          ]}
        />
      </div>
    </div>

  </Card>
</PageSection>

    </PageLayout>
  );
}

function MetricCard({
  title,
  value,
  sub,
  highlight,
  trend,
  footer,
}: {
  title: string;
  value: string;
  sub?: string;
  highlight?: boolean;
  trend?: string;
  footer?: React.ReactNode;
}) {
  return (
    <Card className="layout-card-fill">
      <div
        style={{
          padding: "var(--space-4)",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          border: highlight ? "1px solid var(--color-success)" : undefined,
          borderRadius: "var(--radius-m)",
          background: highlight ? "var(--callout-success-bgcolor)" : undefined,
          height: "100%",
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
            color: highlight ? "var(--color-success)" : "var(--color-text)",
            display: "inline-flex",
            alignItems: "baseline",
            gap: 6,
          }}
        >
          {value}
          {sub && (
            <span style={{ fontSize: 14, color: "var(--color-text-muted)" }}>
              / {sub}
            </span>
          )}
        </div>

        {trend && (
          <div style={{ fontSize: 13, color: "var(--color-success)" }}>
            {trend}
          </div>
        )}

        {footer && (
          <div style={{ fontSize: "var(--font-size-s)", color: "var(--color-text-muted)", marginTop: 2 }}>
            {footer}
          </div>
        )}
      </div>
    </Card>
  );
}