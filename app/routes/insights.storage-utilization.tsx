import type { LoaderFunction } from "react-router";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";
import { Card } from "@/components/ui/card/Card";
import { Icon } from "@/components/ui/icon/Icon";

import { BarChart, PieChart, LineChart } from "@mui/x-charts";

export const loader: LoaderFunction = async () => null;

export default function InsightsStorageUtilization() {
  return (
    <PageLayout
      title="Storage utilization"
      subtitle="Monitor storage capacity, distribution and optimization"
    >
      {/* TOP WIDGETS */}
      <PageSection>
        <div className="layout-grid-4">
          <Card className="layout-card-fill">
            <div className="card-header">
              <Icon name="database" />
              <h3>Total capacity</h3>
            </div>

            <div className="layout-stack">
              <strong style={{ fontSize: 28 }}>79.6%</strong>
              <span>8 199 / 10 300 bins</span>
            </div>
          </Card>

          <Card className="layout-card-fill">
            <div className="card-header">
              <Icon name="archive" />
              <h3>Dead stock</h3>
            </div>

            <div className="layout-stack">
              <strong style={{ fontSize: 28, color: "#0a8f08" }}>342</strong>
              <span>3.3% of inventory</span>
            </div>
          </Card>

          <Card className="layout-card-fill">
            <div className="card-header">
              <Icon name="inbox" />
              <h3>Available space</h3>
            </div>

            <div className="layout-stack">
              <strong style={{ fontSize: 28, color: "#ed6c02" }}>
                2101
              </strong>
              <span>Bins remaining</span>
            </div>
          </Card>

          <Card className="layout-card-fill">
            <div className="card-header">
              <Icon name="alertTriangle" />
              <h3>Zones at capacity</h3>
            </div>

            <div className="layout-stack">
              <strong style={{ fontSize: 28, color: "#d32f2f" }}>
                1
              </strong>
              <span>Zone C (91%)</span>
            </div>
          </Card>
        </div>
      </PageSection>

      {/* BAR CHART */}
      <PageSection>
        <Card>
          <div className="card-header">
            <Icon name="barChart" />
            <h3>Storage by location</h3>
          </div>

          <div style={{ height: 320 }}>
            <BarChart
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
        <div className="layout-grid-2">
          <Card>
            <div className="card-header">
              <Icon name="pieChart" />
              <h3>Dead stock breakdown</h3>
            </div>

            <div style={{ height: 260 }}>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 186, label: "Slow moving", color: "#137897" },
                      { id: 1, value: 98, label: "Damaged", color: "#59a409ff" },
                      { id: 2, value: 12, label: "Obsolete", color: "#640473ff" },
                    ],
                  },
                ]}
              />
            </div>
          </Card>

          <Card>
            <div className="card-header">
              <Icon name="activity" />
              <h3>Storage utilization trend</h3>
            </div>

            <div style={{ height: 260 }}>
              <LineChart
                xAxis={[
                  {
                    scaleType: "point",
                    data: [
                      "Day 1",
                      "Day 3",
                      "Day 5",
                      "Day 7",
                      "Day 9",
                      "Day 11",
                      "Day 13",
                      "Day 15",
                    ],
                  },
                ]}
                series={[
                  {
                    label: "Utilization %",
                    data: [82, 74, 71, 83, 75, 88, 80, 84],
                  },
                ]}
              />
            </div>
          </Card>
        </div>
      </PageSection>
    </PageLayout>
  );
}
