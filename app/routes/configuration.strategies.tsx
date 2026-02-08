import type { LoaderFunction } from "react-router";
import { useState, useMemo } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";

import { Button } from "@/components/ui/button/Button";
import { Chip } from "@/components/ui/chip/Chip";
import { Card } from "@/components/ui/card/Card";
import { Tag } from "@/components/ui/tag/Tag";
import { Toggle } from "@/components/ui/toggle/Toggle";
import { Icon } from "@/components/ui/icon/Icon";

export const loader: LoaderFunction = async () => {
  return null;
};

type StrategyType = "Picking" | "Putaway" | "Replenishment";

type Strategy = {
  id: string;
  title: string;
  type: StrategyType;
  icon: Parameters<typeof Icon>[0]["name"];
  description: React.ReactNode;
  enabledKey: string;
};

export default function ConfigurationStrategies() {
  /* =========================
     STATE
     ========================= */

  const [activeFilter, setActiveFilter] =
    useState<"All" | StrategyType>("All");

  const [enabledStrategies, setEnabledStrategies] = useState<
    Record<string, boolean>
  >({
    expressPicking: true,
    bulkPutaway: false,
    autoReplenishment: true,
    vipHandling: true,
  });

  /* =========================
     STRATEGY DATA
     ========================= */

  const strategies: Strategy[] = [
    {
      id: "wavePicking",
      title: "Wave picking",
      type: "Picking",
      icon: "forklift",
      enabledKey: "expressPicking",
      description: (
        <>
          Batch orders into waves based on zone and priority.
          <ul>
            <li>Group by zone</li>
            <li>Prioritize by ship date</li>
            <li>Max 50 orders per wave</li>
          </ul>
        </>
      ),
    },
    {
      id: "zonePutaway",
      title: "Zone-based putaway",
      type: "Putaway",
      icon: "barChart",
      enabledKey: "bulkPutaway",
      description: (
        <>
          Assign bins based on product category and velocity.
          <ul>
            <li>Fast movers near ports</li>
            <li>Group by category</li>
            <li>Balance bin utilization</li>
          </ul>
        </>
      ),
    },
    {
      id: "autoReplenishment",
      title: "Auto replenishment",
      type: "Replenishment",
      icon: "refresh",
      enabledKey: "autoReplenishment",
      description: (
        <>
          Trigger replenishment when bin levels drop below threshold.
          <ul>
            <li>Min. level: 20%</li>
            <li>Replenish during off-peak</li>
            <li>Fast movers first</li>
          </ul>
        </>
      ),
    },
    {
      id: "batchPicking",
      title: "Batch picking",
      type: "Picking",
      icon: "profile",
      enabledKey: "vipHandling",
      description: (
        <>
          Pick multiple orders simultaneously by location.
          <ul>
            <li>Max. 8 orders per batch</li>
            <li>Route optimization</li>
            <li>Similar item grouping</li>
          </ul>
        </>
      ),
    },
    {
      id: "abcSlotting",
      title: "ABC slotting",
      type: "Putaway",
      icon: "profile",
      enabledKey: "vipHandling",
      description: (
        <>
          Organize inventory by velocity.
          <ul>
            <li>A items: golden zone</li>
            <li>B items: secondary zone</li>
            <li>C items: deep storage</li>
          </ul>
        </>
      ),
    },
  ];

  /* =========================
     FILTERED STRATEGIES
     ========================= */

  const visibleStrategies = useMemo(
    () =>
      activeFilter === "All"
        ? strategies
        : strategies.filter((s) => s.type === activeFilter),
    [activeFilter, strategies]
  );

  /* =========================
     RENDER
     ========================= */

  return (
    <PageLayout
      title="Strategies"
      subtitle="Define and manage warehouse processing strategies"
    >
      <PageSection>
        {/* FILTER BAR */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <div style={{ display: "flex", gap: 8 }}>
            {(["All", "Picking", "Putaway", "Replenishment"] as const).map(
              (f) => (
                <Chip
                  key={f}
                  isActive={activeFilter === f}
                  onClick={() => setActiveFilter(f)}
                >
                  {f}
                </Chip>
              )
            )}
          </div>

          <Button variant="secondary" size="sm">
            Add strategy
          </Button>
        </div>

        {/* STRATEGY CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 16,
          }}
        >
          {visibleStrategies.map((s) => (
            <Card key={s.id}>
              {/* HEADER */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    whiteSpace: "nowrap",
                  }}
                >
                  <Icon name={s.icon} size="sm" />
                  <strong>{s.title}</strong>
                  <Tag
                    label={s.type}
                    color={
                      s.type === "Picking"
                        ? "#818E0B"
                        : s.type === "Putaway"
                        ? "#641397"
                        : "#25C9E6"
                    }
                  />
                </div>

                <Toggle
                  checked={enabledStrategies[s.enabledKey]}
                  onCheckedChange={(v) =>
                    setEnabledStrategies((prev) => ({
                      ...prev,
                      [s.enabledKey]: v,
                    }))
                  }
                  title=""
                />
              </div>

              {/* CONTENT */}
              <div>{s.description}</div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 12,
              }}
            >
            <Button
              variant="secondary"
              size="sm"
              style={{
                display: "inline-flex",
                alignSelf: "flex-end",
              }}
            >
              Edit
            </Button>
            </div>

            </Card>
          ))}
        </div>
      </PageSection>
    </PageLayout>
  );
}
