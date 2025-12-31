import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function Configuration() {
  return <h1>Configuration</h1>;
}
