import type { LoaderFunction } from "react-router";
import { useMemo, useState } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";
import { Card } from "@/components/ui/card/Card";
import { Button } from "@/components/ui/button/Button";
import { Icon } from "@/components/ui/icon/Icon";
import { Select } from "@/components/ui/select/Select";
import { InsightsExportDialog } from "@/components/insights/InsightsExportDialog";
import { BarChart } from "@mui/x-charts";
import "@/styles/insights-storage.css";

export const loader: LoaderFunction = async () => null;

type Client = "all" | "client1" | "client2";
type Activity = "all" | "picks" | "putaways" | "inspections";

const timeLabels = ["7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

const datasets: Record<Client, Record<Activity, { values: number[]; putaways: number[]; inspections: number[]; total: string; orders: string; orderLines: string; items: string; trend: string; danger?: boolean }>> = {
  all: {
    all: { values: [650, 570, 535, 655, 558, 595, 570, 600, 510, 555], putaways: [135, 135, 135, 135, 135, 135, 190, 135, 135, 12], inspections: [38, 8, 84, 60, 80, 40, 14, 92, 16, 14], total: "10 000", orders: "50", orderLines: "58.84%", items: "500 000", trend: "↑ 27% higher than last week" },
    picks: { values: [650, 570, 535, 655, 558, 595, 570, 600, 510, 555], putaways: [], inspections: [], total: "3 918", orders: "50", orderLines: "58.84%", items: "500 000", trend: "↑ 35% higher than last week" },
    putaways: { values: [], putaways: [135, 135, 135, 135, 135, 135, 190, 135, 135, 12], inspections: [], total: "168", orders: "50", orderLines: "58.84%", items: "500 000", trend: "↓ 48% lower than last week", danger: true },
    inspections: { values: [], putaways: [], inspections: [42, 12, 118, 24, 32, 12, 16, 24, 14, 66], total: "20", orders: "50", orderLines: "58.84%", items: "500 000", trend: "↑ 10% higher than last week" },
  },
  client1: {
    all: { values: [450, 340, 385, 342, 392, 360, 445, 478, 390, 360], putaways: [50, 98, 63, 63, 92, 136, 190, 136, 136, 12], inspections: [155, 62, 54, 28, 6, 12, 160, 18, 12, 70], total: "7 654", orders: "43", orderLines: "62.54%", items: "198 123", trend: "↑ 18% higher than last week" },
    picks: { values: [450, 340, 385, 342, 392, 360, 445, 478, 390, 360], putaways: [], inspections: [], total: "2 904", orders: "43", orderLines: "62.54%", items: "198 123", trend: "↑ 22% higher than last week" },
    putaways: { values: [], putaways: [50, 98, 63, 63, 92, 136, 190, 136, 136, 12], inspections: [], total: "112", orders: "43", orderLines: "62.54%", items: "198 123", trend: "↓ 12% lower than last week", danger: true },
    inspections: { values: [], putaways: [], inspections: [42, 12, 118, 24, 32, 12, 16, 24, 14, 66], total: "11", orders: "12", orderLines: "63.92%", items: "10 987", trend: "↑ 10% higher than last week" },
  },
  client2: {
    all: { values: [520, 340, 385, 342, 392, 360, 445, 478, 390, 360], putaways: [50, 96, 32, 48, 12, 44, 92, 60, 24, 12], inspections: [145, 62, 54, 28, 6, 12, 160, 18, 12, 70], total: "8 987", orders: "71", orderLines: "62.98%", items: "9 755", trend: "↑ 19% higher than last week" },
    picks: { values: [520, 340, 385, 342, 392, 360, 445, 478, 390, 360], putaways: [], inspections: [], total: "3 211", orders: "71", orderLines: "62.98%", items: "9 755", trend: "↑ 28% higher than last week" },
    putaways: { values: [], putaways: [82, 70, 65, 55, 64, 74, 100, 82, 70, 34], inspections: [], total: "130", orders: "71", orderLines: "62.98%", items: "9 755", trend: "↓ 8% lower than last week", danger: true },
    inspections: { values: [], putaways: [], inspections: [42, 12, 82, 60, 78, 40, 14, 90, 16, 14], total: "20", orders: "71", orderLines: "62.98%", items: "9 755", trend: "↑ 10% higher than last week" },
  },
};

const activityLabels: Record<Activity, string> = {
  all: "All activities",
  picks: "Picks",
  putaways: "Putaways",
  inspections: "Inspections",
};

export default function InsightsProductivity() {
  const [client, setClient] = useState<Client>("all");
  const [activity, setActivity] = useState<Activity>("all");
  const [exportOpen, setExportOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<string | null>(null);
  const data = datasets[client][activity];

  const series = useMemo(() => {
    if (activity === "all") {
      return [
        { label: "Picks", data: data.values, stack: "total", color: "#2b7dad" },
        { label: "Putaways", data: data.putaways, stack: "total", color: "#87cdb8" },
        { label: "Inspections/Inventories", data: data.inspections, stack: "total", color: "#b781d8" },
      ];
    }
    const color = activity === "picks" ? "#2b7dad" : activity === "putaways" ? "#87cdb8" : "#b781d8";
    const values = activity === "picks" ? data.values : activity === "putaways" ? data.putaways : data.inspections;
    return [{ label: activityLabels[activity], data: values, color }];
  }, [activity, data]);
  const activityIcon = activity === "picks" ? "upload" : activity === "putaways" ? "download" : activity === "inspections" ? "filter" : "warehouse";

  return (
    <PageLayout
      title="AutoStore productivity"
      subtitle="Overview with bin presentations for a selected time period"
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
            label="Activity"
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
        <div className="insights-card-grid insights-card-grid--top">
          <Kpi title={activityLabels[activity]} value={data.total} trend={data.trend} danger={data.danger} icon={activityIcon} />
          <Kpi title="Orders" value={data.orders} trend={data.danger ? "↑ 28% lower than last week" : "↑ 23% higher than last week"} danger={data.danger && client === "client1"} icon="orders" />
          <Kpi title="Orderlines" value={data.orderLines} trend="↑ 23% higher than last week" sub="Avg. order size: 3" icon="listAlt" />
          <Kpi title="Items" value={data.items} trend={client === "client2" ? "↑ 37% higher than last week" : "↑ 23% higher than last week"} sub="Avg. items per orderlines: 5" icon="checklist" />
        </div>
      </PageSection>

      <PageSection>
        <Card className="insights-chart-card">
          <div className="insights-panel-header">
            <div className="insights-panel-title">
              <h3>Bin presentations today in {activityLabels[activity].toLowerCase()} <Icon name="info" size="sm" /></h3>
              <span>Data updates every 5 minutes</span>
            </div>
            <Button variant="secondary" size="sm" leadingIcon="download" onClick={() => setExportOpen(true)}>
              Export
            </Button>
          </div>
          <div className="insights-chart-area">
            <BarChart xAxis={[{ scaleType: "band", data: timeLabels }]} yAxis={[{ min: 0, max: 900 }]} series={series} />
          </div>
        </Card>
      </PageSection>

      <InsightsExportDialog isOpen={exportOpen} format={exportFormat} onFormatChange={setExportFormat} onClose={() => setExportOpen(false)} />
    </PageLayout>
  );
}

function Kpi({ title, value, trend, icon, danger, sub }: { title: string; value: string; trend: string; icon: "warehouse" | "orders" | "listAlt" | "checklist" | "upload" | "download" | "filter"; danger?: boolean; sub?: string }) {
  return (
    <Card
      variant="metric"
      className={["insights-metric", danger ? "is-danger" : ""].join(" ")}
      title={<><Icon name={icon} size="sm" /> {title}</>}
      value={value}
      trend={trend}
      footer={sub}
    />
  );
}
