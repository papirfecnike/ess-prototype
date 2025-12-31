import type { LoaderFunction } from "react-router";
import { PageLayout } from "app/components/page/PageLayout";
import { PageSection } from "app/components/page/PageSection";
import { Card } from "app/components/data/Card";
import { Table } from "app/components/data/Table";
import { Widget } from "app/components/data/Widget";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function InboundOverview() {
  return (
    <PageLayout
    title="Inbound"
    subtitle="Monitoring incoming goods"
    >
    <PageSection title="Today">
        <div className="grid grid-3">
        <Card title="Arrivals" value="128" />
        <Card title="Delayed" value="7" meta="last 24h" />
        <Card title="Dock utilization" value="82%" />
        </div>
    </PageSection>

    <PageSection title="Putaway status">
        <Widget title="Average putaway time" />
    </PageSection>

    <PageSection>
        <Table
        columns={[
            { key: "id", label: "Shipment" },
            { key: "status", label: "Status" },
            { key: "eta", label: "ETA" },
        ]}
        rows={[
            { id: "IN-1023", status: "In progress", eta: "14:20" },
            { id: "IN-1024", status: "Delayed", eta: "16:00" },
        ]}
        />
    </PageSection>
    </PageLayout>
  );
}