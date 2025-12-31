import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function OutboundPrinting() {
  return (
    <div className="page">
      <h1>Printing</h1>
      <p> insights and trends.</p>
    </div>
  );
}
