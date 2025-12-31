import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function ConfigAutoStore() {
  return (
    <div className="page">
      <h1>AutoStore configuration</h1>
      <p>Placeholder content</p>
    </div>
  );
}
