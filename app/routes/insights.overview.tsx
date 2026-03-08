import type { LoaderFunction } from "react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";
import { Card } from "@/components/ui/card/Card";
import { Button } from "@/components/ui/button/Button";
import { Callout } from "@/components/ui/callout/Callout";
import { Icon } from "@/components/ui/icon/Icon";

export const loader: LoaderFunction = async () => null;

export default function InsightsOverview() {
  return (
    <PageLayout
      title="Insights overview"
      subtitle="Real-time warehouse analytics and performance insights"
    >
      <PageSection>
        {/* WIDTH WRAPPER */}
        <div
          style={{
            width: "33%",
            minWidth: 320,
            maxWidth: 520,
          }}
        >
          <Card>
            {/* HEADER */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "var(--space-5)",
                borderBottom: "1px solid var(--color-table-border)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-3)",
                }}
              >
                <Icon name="info" size="md" />

                <div
                  style={{
                    fontSize: "var(--font-h3)",
                    fontWeight: "var(--font-weight-bold)",
                  }}
                >
                  Space optimization
                </div>
              </div>

              <Button
                variant="ghost"
                trailingIcon="chevronRightStroke"
              >
                View more
              </Button>
            </div>

            {/* BODY */}
            <div
              style={{
                padding: "var(--space-5)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-4)",
              }}
            >
              {/* FILL RATE */}
              <Callout intent="success">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-2)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--space-2)",
                      fontSize: "var(--font-default)",
                      fontWeight: "var(--font-weight-medium)",
                    }}
                  >
                    Avg. location fill rate

                    <span
                      title="Average percentage of storage capacity currently used across warehouse locations."
                      style={{ display: "inline-flex" }}
                    >
                      <Icon name="info" size="xs" />
                    </span>
                  </div>

                  <div
                    style={{
                      fontSize: 36,
                      fontWeight: "var(--font-weight-bold)",
                      color: "var(--color-success)",
                    }}
                  >
                    58.54%
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--space-2)",
                      color: "var(--color-success)",
                      fontSize: "var(--font-default)",
                    }}
                  >
                    <Icon name="arrowUpward" size="sm" />
                    5% vs. yesterday
                  </div>
                </div>
              </Callout>

              {/* POTENTIAL */}
              <Callout intent="default">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-2)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--space-2)",
                      fontSize: "var(--font-default)",
                      fontWeight: "var(--font-weight-medium)",
                    }}
                  >
                    Potential by compressing

                    <span
                      title="Estimated number of additional storage locations that could be freed by consolidating inventory."
                      style={{ display: "inline-flex" }}
                    >
                      <Icon name="info" size="xs" />
                    </span>
                  </div>

                  <div
                    style={{
                      fontSize: 36,
                      fontWeight: "var(--font-weight-bold)",
                    }}
                  >
                    9 876
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--space-2)",
                      color: "var(--color-text-muted)",
                      fontSize: "var(--font-default)",
                    }}
                  >
                    <Icon name="barcode" size="sm" />
                    All locations
                  </div>
                </div>
              </Callout>
            </div>
          </Card>
        </div>
      </PageSection>
    </PageLayout>
  );
}