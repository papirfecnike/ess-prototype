import type { LoaderFunction } from "react-router";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";
import { Card } from "@/components/ui/card/Card";
import { ExpandableDataTable } from "@/components/data/ExpandableDataTable";
import type { DataTableColumn } from "@/components/data/DataTableCore";
import { Tag } from "@/components/ui/tag/Tag";
import { Icon } from "@/components/ui/icon/Icon";

import { BarChart, PieChart, LineChart } from "@mui/x-charts";

export const loader: LoaderFunction = async () => null;

function renderStatusTag(status: string) {
  switch (status) {
    case "In progress":
      return <Tag label={status} variant="warning" />;

    case "Prepared":
      return <Tag label={status} variant="default" />;

    case "Waiting":
      return <Tag label={status} variant="danger" />;

    case "Completed":
      return <Tag label={status} variant="success" />;

    default:
      return <Tag label={status} />;
  }
}

export default function InsightsSysHealth() {

    const columns: DataTableColumn[] = [
      { key: "id", label: "PO", sortable: true },
      { key: "product", label: "Product", sortable: true },
      { key: "sku", label: "SKU", sortable: true },
      { key: "progress", label: "Progress", sortable: true },
  
      {
        key: "status",
        label: "Status",
        align: "center",
        renderCell: (value) =>
          renderStatusTag(String(value)),
      },
  
      { key: "operator", label: "Assigned operator", align: "center" },
      { key: "workstation", label: "Workstation", align: "center" },
      { key: "date", label: "Date", align: "center" },
  
      {
        key: "events",
        label: "Events",
        align: "center",
        renderCell: () => (
          <button
            type="button"
            className="btn--ghost"
            aria-label="View history"
            onClick={() => {
              console.log("open history");
            }}
          >
            <Icon name="history" size="sm" />
          </button>
        ),
      },
    ];
  
    /* =========================
       ROWS
       ========================= */
  
    const rows = [
      {
        id: 432170,
        product: "Bisgaard Winter Boots - Pixie - Khaki",
        sku: "WD750",
        progress: "2/3",
        status: "In progress",
        operator: "c.newman",
        workstation: "Port 01",
        date: "08-Jan-2026",
        events: "x",
      },
      {
        id: 432171,
        product: "Name It Jumpsuit - NkfRoka - Burgundy",
        sku: "WF773",
        progress: "5/11",
        status: "In progress",
        operator: "s.taylor",
        workstation: "Port 04",
        date: "08-Jan-2026",
        events: "x",
      },
      {
        id: 432174,
        product: "adidas Performance Shoes - Advantage 2.0",
        sku: "WF685",
        progress: "0/3",
        status: "Prepared",
        operator: "s.pittmann",
        workstation: "Port 02",
        date: "n/a",
        events: "x",
      },
      {
        id: 432175,
        product: "adidas Performance Shoes - VL Court 3.0 K",
        sku: "BS970",
        progress: "0/3",
        status: "Waiting",
        operator: "d.haugen",
        workstation: "Port 03",
        date: "n/a",
        events: "x",
      },
      {
        id: 432177,
        product: "Name It Blouse - Rib - Lavender Gray",
        sku: "WH768",
        progress: "11/11",
        status: "Completed",
        operator: "a.kovach",
        workstation: "Port 09",
        date: "08-Nov-2025",
        events: "x",
      },
    ];
  
  
  return (
    <PageLayout
      title="Replenishment"
      subtitle="Monitor stock levels and manage inventory replenishment"
    >
      {/* TOP WIDGETS */}
      <PageSection>
        <div className="layout-grid-4">
          <Card className="layout-card-fill">
            <div className="card-header">
              <Icon name="database" />
              <h3>System uptime</h3>
            </div>

            <div className="layout-stack">
              <strong style={{ fontSize: 28, color: "#07930A" }}>99.2%</strong>
              <span>Last 24 hours</span>
            </div>
          </Card>

          <Card className="layout-card-fill">
            <div className="card-header">
              <Icon name="archive" />
              <h3>Robot uptime</h3>
            </div>

            <div className="layout-stack">
              <strong style={{ fontSize: 28, color: "#07930A" }}>97.8%</strong>
              <span>Avg. across fleet</span>
            </div>
          </Card>

          <Card className="layout-card-fill">
            <div className="card-header">
              <Icon name="alertTriangle" />
              <h3>Port uptime</h3>
            </div>

            <div className="layout-stack">
              <strong style={{ fontSize: 28, color: "#07930A" }}>96.4%</strong>
              <span>Avg. across ports</span>
            </div>
          </Card>

          <Card className="layout-card-fill">
            <div className="card-header">
              <Icon name="inbox" />
              <h3>Active alerts</h3>
            </div>

            <div className="layout-stack">
              <strong style={{ fontSize: 28, color: "#CA1520" }}>4</strong>
              <span>Require attention</span>
            </div>
          </Card>
        </div>
      </PageSection>

      <PageSection>
<Card className="card--full-height">
  <div className="card-header">
    <Icon name="activity" />
    <h3>Storage by location</h3>
  </div>

  <div className="card-content">
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

      </PageSection>
    </PageLayout>
  );
}
