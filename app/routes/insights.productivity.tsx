import type { LoaderFunction } from "react-router";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";
import { Card } from "@/components/ui/card/Card";
import { Icon } from "@/components/ui/icon/Icon";

import { BarChart, PieChart, LineChart } from "@mui/x-charts";

export const loader: LoaderFunction = async () => null;

export default function InsightsSProductivity() {
  return (
    <PageLayout
      title="Productivity"
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
              <h3>Average pick time</h3>
            </div>

            <div className="layout-stack">
              <strong style={{ fontSize: 28, color: "#CA1520" }}>32.1 s</strong>
              <span>+12.3s fall</span>
            </div>
          </Card>

          <Card className="layout-card-fill">
            <div className="card-header">
              <Icon name="alertTriangle" />
              <h3>94%</h3>
            </div>

            <div className="layout-stack">
              <strong style={{ fontSize: 28, color: "#07930A" }}>94%</strong>
              <span>Excellent performance</span>
            </div>
          </Card>
        </div>
      </PageSection>

      {/* BAR CHART */}
      <PageSection>
        <Card>
          <div className="card-header">
            <Icon name="barChart" />
            <h3>Productivity overview</h3>
          </div>

          <div style={{ height: 320 }}>
            <LineChart
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

      {/* PIE + LINE */}
      <PageSection>
        <div className="card-header">
          <Card>
            <div className="card-header">
            <Icon name="barChart" />
              <h3>Bin distribution by grid level</h3>
            </div>

            <div style={{ height: 260 }}>
              <BarChart
                series={[
                { label: "Used", data: [2000, 1300, 2100, 1400, 1600], color: "#137897", },
                { label: "Free", data: [400, 500, 200, 600, 300], color: "#49b1d1ff", },
              ]}
              />
            </div>
          </Card>

          
        </div>
      </PageSection>
    </PageLayout>
  );
}
