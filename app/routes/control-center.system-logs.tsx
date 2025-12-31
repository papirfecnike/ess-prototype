import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function ControlSystemLogs() {
  return (
    <div className="page">
      <h1>System logs</h1>
      <p>Placeholder content</p>
    </div>
  );
}
