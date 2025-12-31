import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function Dashboard() {
  return <h1>Dashboard</h1>;
}
