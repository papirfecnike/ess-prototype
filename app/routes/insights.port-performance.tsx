import type { LoaderFunction } from "react-router";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";
import { Card } from "@/components/ui/card/Card";
import { Icon } from "@/components/ui/icon/Icon";

import { BarChart, LineChart } from "@mui/x-charts";

export const loader: LoaderFunction = async () => null;

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
            color: "#137897",
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
            data: labels,
          },
        ]}
        series={[
          {
            label: "Trend",
            data: trendData,
            curve: "monotoneX",
            color: "#bcda16ff",
          },
        ]}
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

/* =========================
   PAGE
   ========================= */

export default function InsightsPortPerformance() {
  return (
    <PageLayout
      title="Port performance"
      subtitle="Analyze operational productivity and efficiency metrics"
    >
      {/* TOP WIDGETS */}
      <PageSection>
        <div className="layout-grid-6">
          <Card className="layout-card-fill">
            <div className="card-header">
              <Icon name="database" />
              <h3>Open ports</h3>
            </div>
            <div className="layout-stack">
              <strong style={{ fontSize: 28, color: "#07930A" }}>6</strong>
              <span>Weekly average</span>
            </div>
          </Card>

          <Card className="layout-card-fill">
            <div className="card-header">
              <Icon name="archive" />
              <h3>Picking ports</h3>
            </div>
            <div className="layout-stack">
              <strong style={{ fontSize: 28, color: "#07930A" }}>4</strong>
              <span>Daily average</span>
            </div>
          </Card>

          <Card className="layout-card-fill">
            <div className="card-header">
              <Icon name="inbox" />
              <h3>Picks</h3>
            </div>
            <div className="layout-stack">
              <strong style={{ fontSize: 28, color: "#CA1520" }}>161</strong>
              <span>-9% efficiency decrease</span>
            </div>
          </Card>

          <Card className="layout-card-fill">
            <div className="card-header">
              <Icon name="alertTriangle" />
              <h3>Putaways</h3>
            </div>
            <div className="layout-stack">
              <strong style={{ fontSize: 28, color: "#07930A" }}>34</strong>
              <span>No. of orders being put away</span>
            </div>
          </Card>

          <Card className="layout-card-fill">
            <div className="card-header">
              <Icon name="archive" />
              <h3>Ops./Port</h3>
            </div>
            <div className="layout-stack">
              <strong style={{ fontSize: 28, color: "#07930A" }}>32.4</strong>
              <span>Daily average</span>
            </div>
          </Card>

          <Card className="layout-card-fill">
            <div className="card-header">
              <Icon name="archive" />
              <h3>Tasks added</h3>
            </div>
            <div className="layout-stack">
              <strong style={{ fontSize: 28, color: "#07930A" }}>92</strong>
              <span>+24 since last week</span>
            </div>
          </Card>
        </div>
      </PageSection>

      {/* SIMPLE BAR */}
      <PageSection>
        <Card>
          <div className="card-header">
            <Icon name="barChart" />
            <h3>Robot utilization</h3>
          </div>

          <div style={{ height: 320 }}>
            <BarChart
              height={320}
              xAxis={[
                {
                  scaleType: "band",
                  data: ["Zone A", "Zone B", "Zone C", "Zone D", "Zone E"],
                },
              ]}
              series={[
                { label: "Used", data: [2000, 1300, 2100, 1400, 1600], color: "#137897", },
                { label: "Free", data: [400, 500, 200, 600, 300], color: "#49b1d1ff", },
              ]}
            />
          </div>
        </Card>
      </PageSection>

      {/* BAR + TREND */}
      <PageSection>
        <Card>
          <div className="card-header">
            <Icon name="barChart" />
            <h3>Open ports performance</h3>
          </div>

          <BarWithTrendChart />
        </Card>
      </PageSection>
    </PageLayout>
  );
}
