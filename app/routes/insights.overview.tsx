import type { LoaderFunction } from "react-router";
import { Outlet } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function InsightsOverview() {
  return (
    <div className="page">
      <h1>Insights – Overview</h1>
      <p>High-level performance metrics.</p>
    </div>
  );
}