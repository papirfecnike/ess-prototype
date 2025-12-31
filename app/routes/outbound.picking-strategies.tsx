import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function OutboundPickingStrategies() {
  return (
    <div className="page">
      <h1>Picking strategies</h1>
      <p> insights and trends.</p>
    </div>
  );
}
