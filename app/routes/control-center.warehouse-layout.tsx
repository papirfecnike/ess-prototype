import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function ControlWarehouseLayout() {
  return (
    <div className="page">
      <h1>Warehouse layout</h1>
      <p>Placeholder content</p>
    </div>
  );
}
