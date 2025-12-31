import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function ConfigInventory() {
  return (
    <div className="page">
      <h1>Inventory configuration</h1>
      <p>Placeholder content</p>
    </div>
  );
}
