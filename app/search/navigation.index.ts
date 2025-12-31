import type { SearchResult } from "./search.types";

export const navigationIndex: SearchResult[] = [
  // MAIN NAV
  {
    id: "nav-dashboard",
    title: "Dashboard",
    route: "/dashboard",
    section: "global",
    type: "main-nav",
  },
  {
    id: "nav-insights",
    title: "Insights",
    route: "/insights",
    section: "insights",
    type: "main-nav",
  },
  {
    id: "nav-inbound",
    title: "Inbound",
    route: "/inbound",
    section: "inbound",
    type: "main-nav",
  },
  {
    id: "nav-outbound",
    title: "Outbound",
    route: "/outbound",
    section: "outbound",
    type: "main-nav",
  },
  {
    id: "nav-inventory",
    title: "Inventory",
    route: "/inventory",
    section: "inventory",
    type: "main-nav",
  },

  // SIDEBAR – INSIGHTS
  {
    id: "nav-insights-productivity",
    title: "Productivity",
    route: "/insights/productivity",
    section: "insights",
    type: "sub-nav",
  },
  {
    id: "nav-insights-system-health",
    title: "System health",
    route: "/insights/system-health",
    section: "insights",
    type: "sub-nav",
  },

  // SIDEBAR – OUTBOUND
  {
    id: "nav-outbound-picking",
    title: "Picking",
    route: "/outbound/picking",
    section: "outbound",
    type: "sub-nav",
  },
];
