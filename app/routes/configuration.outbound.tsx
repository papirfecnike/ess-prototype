import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function ConfigOutbound() {
  return (
    <div className="page">
      <h1>Outbound configuration</h1>
      <p>Placeholder content</p>
    </div>
  );
}
