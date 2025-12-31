import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function InsightsPortPerformance() {
  return (
    <div className="page">
      <h1>Port performance</h1>
      <p>Port insights and trends.</p>
    </div>
  );
}
