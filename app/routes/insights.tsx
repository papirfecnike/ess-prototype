import { Outlet } from "react-router";
import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function Insights() {
  return <Outlet />;
}