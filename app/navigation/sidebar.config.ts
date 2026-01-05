export type SidebarItem = {
  label: string;
  path: string;
};

export type SidebarSection = {
  basePath: string;
  items: SidebarItem[];
};

export const sidebarConfig: SidebarSection[] = [
  {
    basePath: "insights",
    items: [
      { label: "Overview", path: "" },
      { label: "Productivity", path: "productivity" },
      { label: "Port performance", path: "port-performance" },
      { label: "Staff performance", path: "staff-performance" },
      { label: "Storage utilization", path: "storage-utilization" },
      { label: "Replenishment", path: "replenishment" },
      { label: "System health", path: "system-health" },
    ],
  },
  {
    basePath: "inbound",
    items: [
      { label: "Overview", path: "" },
      { label: "Putaway", path: "putaway" },
    ],
  },
  {
    basePath: "outbound",
    items: [
      { label: "Overview", path: "" },
      { label: "Picking", path: "picking" },
      { label: "Order batching", path: "order-batching" },
      { label: "Picking strategies", path: "picking-strategies" },
      { label: "Printing", path: "printing" },
    ],
  },
  {
    basePath: "inventory",
    items: [
      { label: "Overview", path: "" },
      { label: "Inspection", path: "inspection" },
    ],
  },
  {
    basePath: "control-center",
    items: [
      { label: "Warehouse layout", path: "warehouse-layout" },
      { label: "Alert monitoring", path: "alert-monitoring" },
      { label: "Orders & tracking", path: "orders-tracking" },
      { label: "eOperator console", path: "eoperator-console" },
      { label: "Maintenance", path: "maintenance" },
      { label: "Integration logs", path: "integration-logs" },
      { label: "System logs", path: "system-logs" },
      { label: "Material handling logs", path: "material-handling-logs" },
    ],
  },
  {
    basePath: "configuration",
    items: [
      { label: "User management", path: "user-management" },
      { label: "Language settings", path: "language-settings" },
      { label: "System settings", path: "system-settings" },
      { label: "Inbound", path: "inbound" },
      { label: "Outbound", path: "outbound" },
      { label: "Inventory", path: "inventory" },
      { label: "AutoStore", path: "autostore" },
      { label: "General setup", path: "general-setup" },
      { label: "Modules", path: "modules" },
      { label: "Orchestration", path: "orchestration" },
      { label: "Version history", path: "version-history" },
    ],
  },
  {
    basePath: "profile",
    items: [
      { label: "Personal information", path: "" },
      { label: "System preferences", path: "system-preferences" },
      { label: "Security", path: "security" },
    ],
  },
];
