import { useNavigate } from "react-router";

import { PageHeader } from "@/components/layout/PageHeader";
import { PageSection } from "@/components/layout/PageSection";
import { Card } from "@/components/ui/card/Card";
import { Button } from "@/components/ui/button/Button";
import { Tag } from "@/components/ui/tag/Tag";
import { Icon } from "@/components/ui/icon/Icon";

import warehouseMap from "@/assets/warehousemap.png";

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <main className="dashboard-title">
      <PageHeader title="Warehouse operations dashboard" />

      <PageSection>
        <div className="dashboard-root">
          <div className="dashboard-grid">
            {/* LEFT COLUMN */}
            <div className="dashboard-column">
              <Card variant="darkHeader">
                <h3>Putaway tasks</h3>
                <div className="dashboard-stack">
                  <Button
                    variant="context"
                    onClick={() => navigate("/inbound/putaway-table")}
                  >
                    Putaway 1/1
                  </Button>
                  <Button
                    variant="context"
                    onClick={() => navigate("/inbound/putaway-table")}
                  >
                    Putaway 1/2
                  </Button>
                </div>
              </Card>

              <Card variant="darkHeader">
                <h3>Picking tasks</h3>
                <div className="dashboard-stack">
                  <Button
                    variant="context"
                    onClick={() => navigate("/outbound/picking-table")}
                  >
                    Retail
                  </Button>
                  <Button
                    variant="context"
                    onClick={() => navigate("/outbound/picking-table")}
                  >
                    Single
                  </Button>
                  <Button
                    variant="context"
                    onClick={() => navigate("/outbound/picking-table")}
                  >
                    Multi
                  </Button>
                </div>
              </Card>

              <Card variant="darkHeader">
                <h3>Operations</h3>
                <div className="dashboard-stack">
                  <Button
                    variant="context"
                    onClick={() => navigate("/inventory/inspection-table")}
                  >
                    Compression
                  </Button>
                  <Button
                    variant="context"
                    onClick={() => navigate("/inventory/inspection-table")}
                  >
                    Inspection
                  </Button>
                </div>
              </Card>
            </div>

            {/* MAIN CONTENT */}
            <div className="dashboard-column">
              <div className="dashboard-main-grid">
                {/* KPI 1 */}
                <Card>
                  <div className="dashboard-card-header">
                    <strong className="dashboard-kpi-value">Orders completed</strong>
                  </div>

                  <div className="layout-stack">
                    <strong style={{ fontSize: 28, color: "#137897" }}>12,456</strong>
                    <span>On track for daily goal</span>
                  </div>
                </Card>

                {/* KPI 2 */}
                <Card>
                  <div className="dashboard-card-header">
                    <strong className="dashboard-kpi-value">Picking</strong>
                    <Tag variant="danger" label="Needs attention" />
                  </div>

                  <div className="layout-stack">
                    <strong style={{ fontSize: 28, color: "#CA1520" }}>161</strong>
                    <span style={{ color: "#CA1520" }}>-9% efficiency decrease</span>
                  </div>
                </Card>

                {/* KPI 3 */}
                <Card>
                  <div className="dashboard-card-header">
                    <strong className="dashboard-kpi-value">Putaway</strong>
                  </div>

                  <div className="layout-stack">
                    <strong style={{ fontSize: 28, color: "#137897" }}>34</strong>
                    <span>No. of orders being put away</span>
                  </div>
                </Card>

                {/* MAP – spans 2 columns */}
                <Card className="dashboard-map-card">
                  <h3>Warehouse map</h3>
                  <div className="dashboard-map">
                    <img
                      src={warehouseMap}
                      alt="Warehouse map"
                      className="dashboard-map-image"
                    />
                  </div>
                </Card>

                {/* RECENT – 1 column */}
                <div className="recent-activities">
                  <div className="recent-activities__header">
                    <Icon name="history" size="sm" />
                    <h3>Recent activities</h3>
                  </div>

                  <div className="recent-activities__list">
                    <div className="recent-activity">
                      <div className="recent-activity__icon success">
                        <Icon name="checkCircle" size="sm" />
                      </div>

                      <div className="recent-activity__content">
                        <span className="recent-activity__time">15 mins ago</span>
                        <strong>Order IB-2024-055 completed</strong>
                      </div>

                      <Tag variant="inbound" label="Inbound" />
                    </div>

                    <div className="recent-activity">
                      <div className="recent-activity__icon success">
                        <Icon name="checkCircle" size="sm" />
                      </div>

                      <div className="recent-activity__content">
                        <span className="recent-activity__time">22 mins ago</span>
                        <strong>Order IB-2024-055 dispatched</strong>
                      </div>

                      <Tag variant="outbound" label="Outbound" />
                    </div>

                    <div className="recent-activity">
                      <div className="recent-activity__icon warning">
                        <Icon name="warning" size="sm" />
                      </div>

                      <div className="recent-activity__content">
                        <span className="recent-activity__time">3 hours ago</span>
                        <strong>Low stock alert for 3 items</strong>
                      </div>

                      <Tag variant="inventory" label="Inventory" />
                    </div>

                    <div className="recent-activity">
                      <div className="recent-activity__icon neutral">
                        <Icon name="barChart" size="sm" />
                      </div>

                      <div className="recent-activity__content">
                        <span className="recent-activity__time">5 hours ago</span>
                        <strong>Weekly analysis report created</strong>
                      </div>

                      <Tag variant="research" label="Research" />
                    </div>
                  </div>
                </div>

              </div>
            </div>
            
          </div>
        </div>
      </PageSection>
    </main>
  );
}
