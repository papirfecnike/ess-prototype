import { useNavigate } from "react-router";

import { PageHeader } from "@/components/layout/PageHeader";
import { PageSection } from "@/components/layout/PageSection";
import { Card } from "@/components/ui/card/Card";
import { Button } from "@/components/ui/button/Button";
import { Tag } from "@/components/ui/tag/Tag";

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
              <Card>
                <h3>Putaway tasks</h3>
                <div className="dashboard-stack">
                  <Button
                    variant="secondary"
                    onClick={() => navigate("/inbound/putaway-table")}
                  >
                    Putaway 1/1
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => navigate("/inbound/putaway-table")}
                  >
                    Putaway 1/2
                  </Button>
                </div>
              </Card>

              <Card>
                <h3>Picking tasks</h3>
                <div className="dashboard-stack">
                  <Button variant="secondary">Retail</Button>
                  <Button variant="secondary">Single</Button>
                  <Button variant="secondary">Multi</Button>
                </div>
              </Card>

              <Card>
                <h3>Operations</h3>
                <div className="dashboard-stack">
                  <Button variant="secondary">Compression</Button>
                  <Button variant="secondary">Inspection</Button>
                </div>
              </Card>
            </div>

            {/* CENTER COLUMN */}
            <div className="dashboard-column">
              <div className="dashboard-kpis">
                <Card>
                  <strong className="dashboard-kpi-value">18 / 24</strong>
                  <div className="dashboard-kpi-label">
                    Orders processed today
                  </div>
                </Card>

                <Card>
                  <strong className="dashboard-kpi-value">35 / 45</strong>
                  <div className="dashboard-kpi-label">
                    Orders shipped today
                  </div>
                </Card>

                <Card>
                  <strong className="dashboard-kpi-value">12,540</strong>
                  <div className="dashboard-kpi-label">
                    Total items in stock
                  </div>
                </Card>
              </div>

              <div className="dashboard-recent">
                <Card>
                  <h3>Warehouse map</h3>

                  <div className="dashboard-map">
                    <img
                      src={warehouseMap}
                      alt="Warehouse map"
                      className="dashboard-map-image"
                    />
                  </div>
                </Card>

                <Card>
                  <h3>Recent activities</h3>

                  <div className="dashboard-activity-list">
                    <div className="dashboard-activity">
                      <Tag variant="success" label="Inbound" />
                      <span>Order IB-2024-055 completed</span>
                    </div>

                    <div className="dashboard-activity">
                      <Tag variant="warning" label="Inventory" />
                      <span>Low stock alert for 3 items</span>
                    </div>

                    <div className="dashboard-activity">
                      <Tag variant="default" label="Research" />
                      <span>Weekly analysis report created</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            
          </div>
        </div>
      </PageSection>
    </main>
  );
}
