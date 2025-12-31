import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function Outbound() {
  return <h1>Outbound</h1>;
}
