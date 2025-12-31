import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function ConfigGeneralSetup() {
  return (
    <div className="page">
      <h1>General setup</h1>
      <p>Placeholder content</p>
    </div>
  );
}
