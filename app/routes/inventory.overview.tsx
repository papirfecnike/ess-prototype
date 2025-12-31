import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function InventoryOverview() {
  return (
    <div className="page">
      <h1>Overview</h1>
      <p> Overview of inspected items</p>
    </div>
  );
}
