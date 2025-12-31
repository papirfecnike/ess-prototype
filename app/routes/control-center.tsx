import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function ControlCenter() {
  return <h1>Control center</h1>;
}
