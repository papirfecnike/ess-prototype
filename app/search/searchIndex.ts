export type SearchItem = {
  label: string;
  description?: string;
  route: string;
  keywords?: string[];
};

export const searchIndex: SearchItem[] = [
  {
    label: "Insights",
    description: "Productivity",
    route: "/insights/productivity",
    keywords: ["Bin", "presentation", "Orders", "Average pick time", "Avg", "Productivity overview", "distribution" ],
  },
  {
    label: "Insights",
    description: "Port performance",
    route: "/insights/port-performance",
    keywords: ["Open", "port", "Picks", "Putaways", "Ops./Port", "Tasks", "added", "Robot", "utilization", "performance" ],
  },
  {
    label: "Insights",
    description: "Staff performance",
    route: "/insights/staff-performance",
    keywords: ["efficiency", "analysis", "ports", "Open", "Orders", "completed", "Bin", "Avg", "pick time", "score", "Performance", "analysis", "Staff", "ranking", "User", "details", "trend" ],
  },
  {
    label: "Insights",
    description: "Storage utilization",
    route: "/insights/storage-utilization",
    keywords: ["Total", "capacity", "storage", "utilization", "Dead", "stock", "Available", "space", "Zones", "capacity", "location", "breakdown", "Staff", "ranking", "User", "details", "trend" ],
  },
  {
    label: "Putaway",
    description: "Inbound · Putaway",
    route: "/inbound/putaway-table",
    keywords: ["putaway", "inbound", "progress", "1/1", "1/2", "sku", "status", "assigned", "date", "432171", "432171", "432171", "WA874", "Hust and Claire Dynevest – HCEmily – Pale Mauve", "BX962", "Name It Dynevest - NmfMylane - Woodrose m. Sløyfebånd", "BV122", "Billieblush Dynevest – Peach" ],
  },
  {
    label: "Picking",
    description: "Outbound · Picking",
    route: "/outbound/picking-table",
    keywords: ["picking", "outbound", "Picklist", "Multi", "Single", "Retail", "Order #", "progress", "sku", "status", "assigned", "date", "9305204753", "2784741146", "WA874", "Hust and Claire Dynevest – HCEmily – Pale Mauve", "BX962", "Name It Dynevest - NmfMylane - Woodrose m. Sløyfebånd", "BV122", "Billieblush Dynevest – Peach" ],
  },
  {
    label: "Inspection",
    description: "Inventory · Inspection",
    route: "/inventory/inspection-table",
    keywords: ["inspection", "inventory", "Compression", "progress", "sku", "status", "assigned", "date", "9876", "9877", "9878", "WA874", "Hust and Claire Dynevest – HCEmily – Pale Mauve", "BX962", "Name It Dynevest - NmfMylane - Woodrose m. Sløyfebånd", "BV122", "Billieblush Dynevest – Peach" ],
  },
  {
    label: "Control center",
    description: "Control center · Integration",
    route: "/control-center/integration-logs",
    keywords: ["control", "integration", "log", "9876", "9877", "9878", "WA874", "Hust and Claire Dynevest – HCEmily – Pale Mauve", "BX962", "Name It Dynevest - NmfMylane - Woodrose m. Sløyfebånd", "BV122", "Billieblush Dynevest – Peach" ],
  },
  {
    label: "Configuration",
    description: "Configuration · Version history",
    route: "/configuration/version-history",
    keywords: ["version", "history", "changelog", "Save", "configuration", "Load", "Deploy", "Apply", "Stable", "Production" ],
  },
  {
    label: "Profile",
    description: "Profile · Personal information",
    route: "/profile",
    keywords: ["Personal", "information", "Full", "name", "Email", "Phone", "Groups", "Responsibilities" ],
  },
  {
    label: "Profile",
    description: "Profile · System preferences",
    route: "profile/system-preferences",
    keywords: ["System", "preferences", "Region", "settings", "language", "Timezone", "Email", "Push", "Critical", "alert", "notifications", "Workflow", "update" ],
  },
  {
    label: "Profile",
    description: "Profile · Security",
    route: "profile/security",
    keywords: ["Password", "security", "Authentication", "Account", "Active", "session", "recovery", "auth", "multi", "Timezone", "Email", "Push", "Critical", "alert", "notifications", "Workflow", "update" ],
  },
];
