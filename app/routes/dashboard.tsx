import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function Dashboard() {
  return (
    <div className="page">
      <h1>Dashboard</h1>
      <p>Placeholder content</p>
    </div>
  );
}
