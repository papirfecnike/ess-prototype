import type { LoaderFunction } from "react-router";
import { useNavigate } from "react-router";

import { PageSection } from "@/components/layout/PageSection";
import { EmptyState } from "@/components/ui/empty-state/EmptyState";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function InventoryOverview() {
  const navigate = useNavigate();

  return (
    <PageSection>
      <EmptyState
        onAction={() => navigate("/inventory/inspection")}
      />
    </PageSection>
  );
}
