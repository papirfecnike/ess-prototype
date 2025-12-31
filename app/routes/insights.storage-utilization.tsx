import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function InsightsStorage() {
  return (
    <div className="page">
      <h1>Storage utilization</h1>
      <p>Storage insights and trends.</p>
    </div>
  );
}
