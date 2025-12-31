import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function ConfigModules() {
  return (
    <div className="page">
      <h1>Modules configuration</h1>
      <p>Placeholder content</p>
    </div>
  );
}
