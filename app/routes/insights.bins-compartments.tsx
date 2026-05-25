import type { LoaderFunction } from "react-router";
import { useMemo, useState } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";
import { Card } from "@/components/ui/card/Card";
import { Button } from "@/components/ui/button/Button";
import { Icon } from "@/components/ui/icon/Icon";
import { Select } from "@/components/ui/select/Select";
import { InsightsExportDialog } from "@/components/insights/InsightsExportDialog";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import "@/styles/insights-storage.css";

export const loader: LoaderFunction = async () => null;

type Client = "all" | "client1" | "client2";
type Activity = "all" | "picks" | "putaways" | "inspections";
type DateRange = "today" | "lastWeek" | "lastMonth" | "lastSixMonths" | "lastYear";
type LocationFilter = "all" | "bins" | "compartments";

const clientData = {
  all: {
    used: "99.82%",
    usedBins: "6 508",
    freeBins: "12",
    totalBins: "6 520",
    usedByType: [76, 99, 87, 91, 88],
    freeByType: [24, 1, 13, 9, 12],
    distribution: [52, 21, 12, 8, 7],
    trend: [80, 94, 95, 88, 92, 87, 88, 100],
  },
  client1: {
    used: "94.21%",
    usedBins: "3 118",
    freeBins: "44",
    totalBins: "3 162",
    usedByType: [70, 94, 82, 86, 90],
    freeByType: [30, 6, 18, 14, 10],
    distribution: [42, 25, 14, 11, 8],
    trend: [76, 86, 92, 87, 89, 85, 91, 96],
  },
  client2: {
    used: "91.64%",
    usedBins: "2 044",
    freeBins: "81",
    totalBins: "2 125",
    usedByType: [68, 88, 79, 82, 86],
    freeByType: [32, 12, 21, 18, 14],
    distribution: [38, 26, 16, 9, 11],
    trend: [72, 82, 84, 81, 87, 83, 85, 93],
  },
};

const binTypes = ["1/1", "1/2 A", "1/4 B", "1/8 B", "1/16"];

export default function InsightsBinsCompartments() {
  const [client, setClient] = useState<Client>("all");
  const [activity, setActivity] = useState<Activity>("all");
  const [dateRange, setDateRange] = useState<DateRange>("today");
  const [locationFilter, setLocationFilter] = useState<LocationFilter>("all");
  const [exportOpen, setExportOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<string | null>(null);
  const baseData = clientData[client];
  const activityFactor = activity === "picks" ? 0.94 : activity === "putaways" ? 0.72 : activity === "inspections" ? 0.52 : 1;
  const locationFactor = locationFilter === "bins" ? 0.98 : locationFilter === "compartments" ? 0.9 : 1;
  const dateFactor = dateRange === "today" ? 1 : dateRange === "lastWeek" ? 0.96 : dateRange === "lastMonth" ? 0.9 : dateRange === "lastSixMonths" ? 0.86 : 0.82;
  const transform = (values: number[]) => values.map(value => Math.max(1, Math.round(value * activityFactor * locationFactor * dateFactor)));
  const data = {
    ...baseData,
    used: `${Math.min(99.98, Number.parseFloat(baseData.used) * activityFactor * locationFactor).toFixed(2)}%`,
    usedBins: Math.round(Number(baseData.usedBins.replace(/\s/g, "")) * activityFactor * locationFactor).toLocaleString("nb-NO").replace(/\u00a0/g, " "),
    freeBins: Math.max(1, Math.round(Number(baseData.freeBins.replace(/\s/g, "")) / Math.max(activityFactor * locationFactor, 0.3))).toLocaleString("nb-NO").replace(/\u00a0/g, " "),
    totalBins: baseData.totalBins,
    usedByType: transform(baseData.usedByType),
    freeByType: baseData.freeByType.map((value, index) => Math.max(1, 100 - transform(baseData.usedByType)[index])),
    distribution: transform(baseData.distribution),
    trend: transform(baseData.trend),
  };

  const pieSeries = useMemo(() => [
    {
      data: binTypes.map((label, index) => ({
        id: label,
        label,
        value: data.distribution[index],
      })),
      innerRadius: 0,
    },
  ], [data]);

  return (
    <PageLayout
      title="Bins and compartments"
      subtitle="Overview of storage capacity in AutoStore"
      headerActions={
        <div className="insights-toolbar__selectors">
          <Select
            label="Client"
            value={client}
            searchable={false}
            onChange={(value) => setClient((value ?? "all") as Client)}
            options={[
              { value: "all", label: "All clients" },
              { value: "client1", label: "3PL client 1" },
              { value: "client2", label: "3PL client 2" },
            ]}
          />
          <Select
            label="Activities"
            value={activity}
            searchable={false}
            onChange={(value) => setActivity((value ?? "all") as Activity)}
            options={[
              { value: "all", label: "All activities" },
              { value: "picks", label: "Picks" },
              { value: "putaways", label: "Putaways" },
              { value: "inspections", label: "Inspections" },
            ]}
          />
        </div>
      }
    >
      <PageSection>
        <div className="insights-card-grid insights-card-grid--top bins-capacity-metrics">
          <Metric title="Used capacity" value={data.used} icon="barChart" />
          <Metric title="Used bins" value={data.usedBins} icon="barcode" />
          <Metric title="Free bins" value={data.freeBins} icon="checkCircle" />
          <Metric title="Total bins" value={data.totalBins} icon="rule" />
        </div>
      </PageSection>

      <PageSection>
        <div className="bins-capacity-grid">
          <Card>
            <div className="insights-panel-header">
              <h3>Bins utilization</h3>
              <Button variant="secondary" size="sm" leadingIcon="download" onClick={() => setExportOpen(true)}>Export</Button>
            </div>
            <div style={{ height: 460, padding: "var(--padding-l)" }}>
              <BarChart
                xAxis={[{ scaleType: "band", data: binTypes }]}
                yAxis={[{ min: 0, max: 100 }]}
                series={[
                  { label: "Used", data: data.usedByType, stack: "capacity", color: "#87cdb8" },
                  { label: "Free", data: data.freeByType, stack: "capacity", color: "#b781d8" },
                ]}
              />
            </div>
          </Card>

          <Card>
            <div className="insights-panel-header">
              <h3>Compartment type distribution</h3>
              <Button variant="secondary" size="sm" leadingIcon="download" onClick={() => setExportOpen(true)}>Export</Button>
            </div>
            <div style={{ height: 460, padding: "var(--padding-l)" }}>
              <PieChart series={pieSeries} />
            </div>
          </Card>
        </div>
      </PageSection>

      <PageSection>
        <Card className="bins-capacity-trend-card">
          <div className="insights-panel-header">
            <h3>Used capacity trend</h3>
            <div className="insights-panel-actions">
              <Select
                label="Selected date range"
                value={dateRange}
                searchable={false}
                onChange={(value) => setDateRange((value ?? "today") as DateRange)}
                options={[
                  { value: "today", label: "Today" },
                  { value: "lastWeek", label: "Last week" },
                  { value: "lastMonth", label: "Last month" },
                  { value: "lastSixMonths", label: "Last 6 months" },
                  { value: "lastYear", label: "Last year" },
                ]}
              />
              <Select
                label="Locations"
                value={locationFilter}
                searchable={false}
                onChange={(value) => setLocationFilter((value ?? "all") as LocationFilter)}
                options={[
                  { value: "all", label: "All locations" },
                  { value: "bins", label: "Bins" },
                  { value: "compartments", label: "Compartments" },
                ]}
              />
              <Button variant="secondary" size="sm" leadingIcon="download" onClick={() => setExportOpen(true)}>Export</Button>
            </div>
          </div>
          <div className="bins-capacity-trend-area">
            <LineChart
              xAxis={[{ scaleType: "point", data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"] }]}
              yAxis={[{ min: 80, max: 100 }]}
              series={[{ data: data.trend, area: true, color: "#87cdb8", curve: "monotoneX" }]}
            />
          </div>
        </Card>
      </PageSection>

      <InsightsExportDialog isOpen={exportOpen} format={exportFormat} onFormatChange={setExportFormat} onClose={() => setExportOpen(false)} />
    </PageLayout>
  );
}

function Metric({ title, value, icon }: { title: string; value: string; icon: "barChart" | "barcode" | "checkCircle" | "rule" }) {
  return (
    <Card
      variant="metric"
      className="insights-metric insights-metric--neutral"
      title={<><Icon name={icon} size="sm" /> {title}</>}
      value={value}
    />
  );
}
