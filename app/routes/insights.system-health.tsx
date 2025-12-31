import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function InsightsSysHealth() {
  return (
    <div className="page">
      <h1>System health</h1>
      <p>System insights and trends.</p>
    </div>
  );
}
