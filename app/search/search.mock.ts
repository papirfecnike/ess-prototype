import type { SearchResult } from "./search.types";

export const mockSearchData: SearchResult[] = [
  {
    id: "inv-1",
    title: "Inventory overview",
    route: "/inventory",
    section: "inventory",
  },
  {
    id: "cc-logs",
    title: "System logs",
    route: "/control-center/system-logs",
    section: "control-center",
  },
];
