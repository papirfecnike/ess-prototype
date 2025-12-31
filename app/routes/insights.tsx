import type { LoaderFunction } from "react-router";
import { Outlet } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function InsightsRoute() {
  return <Outlet />;
}
