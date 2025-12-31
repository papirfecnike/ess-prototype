import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function ConfigInbound() {
  return (
    <div className="page">
      <h1>Inbound configuration</h1>
      <p>Placeholder content</p>
    </div>
  );
}
