import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function OutboundOrderBatching() {
  return (
    <div className="page">
      <h1>Order batching</h1>
      <p> insights and trends.</p>
    </div>
  );
}
