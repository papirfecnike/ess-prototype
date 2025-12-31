import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function ControlMaintenance() {
  return (
    <div className="page">
      <h1>Maintenance</h1>
      <p>Placeholder content</p>
    </div>
  );
}
