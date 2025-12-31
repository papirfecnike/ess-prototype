import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function Inventory() {
  return <h1>Inventory</h1>;
}
