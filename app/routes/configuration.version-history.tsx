import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function ConfigVersioning() {
  return (
    <div className="page">
      <h1>Version control</h1>
      <p>Placeholder content</p>
    </div>
  );
}
