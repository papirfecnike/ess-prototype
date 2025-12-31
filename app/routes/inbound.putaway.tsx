import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function InboundPutaway() {
  return (
    <div className="page">
      <h1>Putaway</h1>
      <p> insights and trends.</p>
    </div>
  );
}
