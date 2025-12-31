import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function ControlIntLogs() {
  return (
    <div className="page">
      <h1>Integration logs</h1>
      <p>Placeholder content</p>
    </div>
  );
}
