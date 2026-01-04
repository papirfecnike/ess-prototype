import type { LoaderFunction } from "react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";
import { EmptyState } from "@/components/ui/empty-state/EmptyState";
import { useNavigate } from "react-router";
import { Outlet } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function InventoryRoute() {
  const navigate = useNavigate();

  return <Outlet />;
}