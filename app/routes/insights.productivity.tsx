import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function InsightsProductivity() {
  return (
    <div className="page">
      <h1>Productivity</h1>
      <p>Productivity insights and trends.</p>
    </div>
  );
}
