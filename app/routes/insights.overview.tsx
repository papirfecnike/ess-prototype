import type { LoaderFunction } from "react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";
import { Card } from "@/components/ui/card/Card";
import { Icon } from "@/components/ui/icon/Icon";
import { Callout } from "@/components/ui/callout/Callout";
import { LineChart } from "@mui/x-charts";

export const loader: LoaderFunction = async () => null;

export default function InsightsOverview() {
  return (
    <PageLayout
      title="Insights overview"
      subtitle="High-level operational performance"
    >
      {/* TOP WIDGETS */}
      <PageSection>
        <div className="layout-grid-4">
          <MetricCard
            title="Today’s throughput"
            value="1287"
            description="Orders processed today"
          />

          <MetricCard
            title="Active robots"
            value="55 / 60"
            description="Orders shipped today"
          />

          <MetricCard
            title="Storage utilization"
            value="99%"
            description="Total items in stock"
          />

          <MetricCard
            title="Active ports"
            value="5 / 8"
            description="Analyses completed this week"
          />
        </div>
      </PageSection>

      {/* PERFORMANCE ISSUES */}
      <PageSection>
        <Card>
          <div className="card-header">
            <Icon name="warning" />
            <strong>Performance issues</strong>
          </div>

          <div className="layout-stack">
            <Callout
              intent="danger"
              title="Robot capacity constraint"
              action={{
                label: "Maintenance",
                trailingIcon: "chevronRightStroke",
              }}
            >
              Detected 12 minutes ago
            </Callout>

            <Callout
              intent="danger"
              title="Storage near capacity"
              action={{
                label: "View details",
                trailingIcon: "chevronRightStroke",
              }}
            >
              Detected 12 minutes ago
            </Callout>

            <Callout
              intent="warning"
              title="Suboptimal port usage"
              action={{
                label: "Optimize",
                trailingIcon: "chevronRightStroke",
              }}
            >
              Detected 12 minutes ago
            </Callout>
          </div>
        </Card>
      </PageSection>

      
    </PageLayout>
  );
}

/* =========================
   METRIC CARD
   ========================= */

function MetricCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <Card className="layout-card-fill">
      <div className="card-header">
        <strong>{title}</strong>
      </div>

      <div className="layout-stack">
        <strong style={{ fontSize: 32, color: "#07930A" }}>
          {value}
        </strong>
        <span>{description}</span>
      </div>
    </Card>
  );
}
