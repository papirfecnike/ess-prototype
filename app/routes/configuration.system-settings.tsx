import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function ConfigSystem() {
  return (
    <div className="page">
      <h1>System settings</h1>
      <p>Placeholder content</p>
    </div>
  );
}
