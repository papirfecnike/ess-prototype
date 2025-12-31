import type { SearchResult } from "./search.types";

export const contentIndex: SearchResult[] = [
  {
    id: "inv-overview",
    title: "Inventory overview",
    description: "Stock levels and status",
    route: "/inventory",
    section: "inventory",
    type: "content",
  },
  {
    id: "cc-system-logs",
    title: "System logs",
    description: "All system events",
    route: "/control-center/system-logs",
    section: "control-center",
    type: "content",
  },
];
