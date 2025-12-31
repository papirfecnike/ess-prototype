import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function InventoryInspection() {
  return (
    <div className="page">
      <h1>Inspection</h1>
      <p>Perform inspection</p>
    </div>
  );
}
