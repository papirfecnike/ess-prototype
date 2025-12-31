import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function InboundOverview() {
  return (
    <div className="page">
      <h1>Overview</h1>
      <p> insights and trends.</p>
    </div>
  );
}
