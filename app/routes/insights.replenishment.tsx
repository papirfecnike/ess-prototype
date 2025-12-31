import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function InsightsReplenishment() {
  return (
    <div className="page">
      <h1>Replenishment</h1>
      <p>Replenishment insights and trends.</p>
    </div>
  );
}
