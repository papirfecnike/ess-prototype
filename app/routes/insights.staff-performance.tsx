import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function InsightsStaffPerf() {
  return (
    <div className="page">
      <h1>Staff performance</h1>
      <p>Staff insights and trends.</p>
    </div>
  );
}
