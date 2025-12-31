import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function ConfigOrchestration() {
  return (
    <div className="page">
      <h1>Orchestration</h1>
      <p>Placeholder content</p>
    </div>
  );
}
