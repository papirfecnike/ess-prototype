export type SidebarItem = {
  label: string;
  path: string;
  icon: string;
};

export type SidebarGroup = {
  title: string;
  items: SidebarItem[];
};

export type SidebarSection = {
  basePath: string;
  groups?: SidebarGroup[];
  items?: SidebarItem[]; // backward compatibility
};

export const sidebarConfig: SidebarSection[] = [
  {
    basePath: "insights",
    groups: [
      {
        title: "Analytics",
        items: [
          { label: "Overview", path: "", icon: "barChart" },
          { label: "Productivity", path: "productivity", icon: "rocket" },
          { label: "Port performance", path: "port-performance", icon: "barChart" },
        ],
      },
      {
        title: "Operations",
        items: [
          { label: "Staff performance", path: "staff-performance", icon: "profile" },
          { label: "Storage utilization", path: "storage-utilization", icon: "barChart" },
          { label: "Replenishment", path: "replenishment", icon: "refresh" },
        ],
      },
      {
        title: "System monitoring",
        items: [
          { label: "System health", path: "system-health", icon: "warning" },
        ],
      },
    ],
  },

  {
    basePath: "inbound",
    items: [
      { label: "Overview", path: "", icon: "barChart" },
      { label: "Putaway", path: "putaway", icon: "forklift" },
    ],
  },
  {
    basePath: "outbound",
    items: [
      { label: "Overview", path: "", icon: "barChart" },
      { label: "Picking", path: "picking", icon: "forklift" },
      { label: "Order batching", path: "order-batching", icon: "barChart" },
      { label: "Picking strategies", path: "picking-strategies", icon: "settings" },
      { label: "Printing", path: "printing", icon: "print" },
    ],
  },
  {
    basePath: "inventory",
    items: [
      { label: "Overview", path: "", icon: "barChart" },
      { label: "Inspection", path: "inspection", icon: "checkCircle" },
    ],
  },

  {
    basePath: "control-center",
    groups: [
      {
        title: "Monitoring",
        items: [
          { label: "Warehouse layout", path: "warehouse-layout", icon: "widthNormal" },
          { label: "Alert monitoring", path: "alert-monitoring", icon: "warning" },
          { label: "Orders & tracking", path: "orders-tracking", icon: "barChart" },
        ],
      },
      {
        title: "Equipment",
        items: [
          { label: "eOperator console", path: "eoperator-console", icon: "profile" },
          { label: "Maintenance", path: "maintenance", icon: "settings" },
        ],
      },
      {
        title: "Logging",
        items: [
          { label: "Integration logs", path: "integration-logs", icon: "history" },
          { label: "System logs", path: "system-logs", icon: "history" },
          { label: "Material handling logs", path: "material-handling-logs", icon: "forklift" },
        ],
      },
    ],
  },


  {
    basePath: "configuration",
    groups: [
      {
        title: "Administration",
        items: [
          { label: "User management", path: "user-management", icon: "profile" },
          { label: "Language settings", path: "language-settings", icon: "settings" },
          { label: "System settings", path: "system-settings", icon: "settings" },
        ],
      },
      {
        title: "Workflow",
        items: [
          { label: "Inbound", path: "inbound", icon: "forklift" },
          { label: "Outbound", path: "outbound", icon: "forklift" },
          { label: "Inventory", path: "inventory", icon: "barChart" },
        ],
      },
      {
        title: "Configuration",
        items: [
          { label: "AutoStore", path: "autostore", icon: "rocket" },
          { label: "General setup", path: "general-setup", icon: "settings" },
          { label: "Modules", path: "modules", icon: "settings" },
          { label: "Orchestration", path: "orchestration", icon: "settings" },
          { label: "Version history", path: "version-history", icon: "history" },
        ],
      },
    ],
  },

  {
    basePath: "profile",
    items: [
      { label: "Personal information", path: "", icon: "profile" },
      { label: "System preferences", path: "system-preferences", icon: "settings" },
      { label: "Security", path: "security", icon: "lock" },
    ],
  },
];
