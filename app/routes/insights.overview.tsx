import type { LoaderFunction } from "react-router";
import { useNavigate } from "react-router";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";
import { Card } from "@/components/ui/card/Card";
import { Button } from "@/components/ui/button/Button";
import { Icon } from "@/components/ui/icon/Icon";
import { BarChart } from "@mui/x-charts";
import "@/styles/insights-storage.css";

export const loader: LoaderFunction = async () => null;
const autoStoreLogo = "https://companieslogo.com/img/orig/AUTO.OL-e481afbe.png?t=1720244490";

export default function InsightsOverview() {
  const navigate = useNavigate();

  return (
    <PageLayout
      title="Storage utilization"
      subtitle="Monitor storage capacity, distribution, and optimization opportunities"
    >
      <PageSection>
        <div className="insights-card-grid insights-card-grid--3">
          <Card className="insights-overview-card">
            <div className="insights-panel-header">
              <div className="insights-kpi__title">
                <img className="insights-autostore-icon" src={autoStoreLogo} alt="" />
                <strong>AutoStore productivity</strong>
              </div>
              <Button variant="ghost" size="sm" trailingIcon="chevronRightStroke" onClick={() => navigate("/insights/productivity")}>
                View more
              </Button>
            </div>
            <div className="insights-overview-card__body">
              <div className="insights-overview-card__metric">
                <span>All activities</span>
                <strong>8978</strong>
                <span>↑ 27%</span>
              </div>
              <div className="insights-overview-card__mini-grid">
                <div className="insights-overview-card__metric">
                  <span>Picks</span>
                  <strong>3918</strong>
                  <span>↑ 35%</span>
                </div>
                <div className="insights-overview-card__metric is-danger">
                  <span>Putaway</span>
                  <strong>163</strong>
                  <span>↓ 48%</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="insights-overview-card">
            <div className="insights-panel-header">
              <div className="insights-kpi__title">
                <Icon name="barcode" size="md" />
                <strong>Bins and compartments</strong>
              </div>
              <Button variant="ghost" size="sm" trailingIcon="chevronRightStroke" onClick={() => navigate("/insights/bins-compartments")}>
                View more
              </Button>
            </div>
            <div style={{ height: 320, padding: "var(--padding-l)" }}>
              <BarChart
                xAxis={[{ scaleType: "band", data: ["Bins", "Compartments"] }]}
                yAxis={[{ min: 0, max: 100 }]}
                series={[
                  { label: "Used", stack: "capacity", data: [58, 82], color: "#87cdb8" },
                  { label: "Free", stack: "capacity", data: [42, 18], color: "#b781d8" },
                ]}
              />
            </div>
          </Card>

          <Card className="insights-overview-card">
            <div className="insights-panel-header">
              <div className="insights-kpi__title">
                <Icon name="compress" size="md" />
                <strong>Space optimization</strong>
              </div>
              <Button variant="ghost" size="sm" trailingIcon="chevronRightStroke" onClick={() => navigate("/insights/space-optimization")}>
                View more
              </Button>
            </div>
            <div className="insights-overview-card__body">
              <div className="insights-overview-card__metric">
                <span>Avg. location fill rate</span>
                <strong>58.54%</strong>
                <span>↑ 5% vs. yesterday</span>
              </div>
              <div className="insights-overview-card__metric">
                <span>Potential by compressing</span>
                <strong>9 876</strong>
                <span>All locations</span>
              </div>
            </div>
          </Card>
        </div>
      </PageSection>
    </PageLayout>
  );
}
