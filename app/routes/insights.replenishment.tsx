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

export default function InsightsReplenishment() {

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
              <h3>Need replenishment</h3>
            </div>

            <div className="layout-stack">
              <strong style={{ fontSize: 28, color: "#CA1520" }}>23</strong>
              <span>Require immediate attention</span>
            </div>
          </Card>

          <Card className="layout-card-fill">
            <div className="card-header">
              <Icon name="archive" />
              <h3>Imbalanced stock</h3>
            </div>

            <div className="layout-stack">
              <strong style={{ fontSize: 28, color: "#CA1520" }}>8</strong>
              <span>Over/understock items</span>
            </div>
          </Card>

          <Card className="layout-card-fill">
            <div className="card-header">
              <Icon name="alertTriangle" />
              <h3>Critical items</h3>
            </div>

            <div className="layout-stack">
              <strong style={{ fontSize: 28, color: "#CA1520" }}>94%</strong>
              <span>Stock out in ≤2 days</span>
            </div>
          </Card>

          <Card className="layout-card-fill">
            <div className="card-header">
              <Icon name="inbox" />
              <h3>High priority</h3>
            </div>

            <div className="layout-stack">
              <strong style={{ fontSize: 28, color: "#CA1520" }}>2</strong>
              <span>Stock out in 3-5 days</span>
            </div>
          </Card>
        </div>
      </PageSection>

      <PageSection>
        <ExpandableDataTable
          headerVariant="warehouseSelect"
          rowIdKey="id"
          columns={columns}
          rows={rows}
          renderExpandedRow={(row) => (
            <table>
              <thead>
                <tr>
                  <th>Production ID</th>
                  <th>Location type</th>
                  <th>Location ID</th>
                  <th>Location capacity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>WD750-01</td>
                  <td>1/4 bin</td>
                  <td>AS-326437-04-01</td>
                  <td>12/80</td>
                  <td>In progress</td>
                </tr>
                <tr>
                  <td>WD750-01</td>
                  <td>1/4 bin</td>
                  <td>AS-322439-04-04</td>
                  <td>30/80</td>
                  <td>Prepared</td>
                </tr>
              </tbody>
            </table>
          )}

        />
      </PageSection>
    </PageLayout>
  );
}
