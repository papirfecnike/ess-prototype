export type SearchItem = {
  label: string;
  description?: string;
  route: string;
  keywords?: string[];
};

export const searchIndex: SearchItem[] = [
  {
    label: "Putaway table",
    description: "Inbound · Putaway",
    route: "/inbound/putaway-table",
    keywords: ["putaway", "inbound", "table"],
  },
  {
    label: "Picking table",
    description: "Outbound · Picking",
    route: "/outbound/picking-table",
    keywords: ["picking", "outbound"],
  },
  {
    label: "Version history",
    description: "Configuration",
    route: "/configuration/version-history",
    keywords: ["version", "history", "changelog"],
  },
  {
    label: "System settings",
    description: "Configuration",
    route: "/configuration/system-settings",
    keywords: ["settings", "system"],
  },
];
