import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function Inbound() {
  return <h1>Inbound</h1>;
}
