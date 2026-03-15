export type SidebarItem = {
  label: string;
  path: string;
  icon: string;
  children?: SidebarItem[];
};

export type SidebarGroup = {
  title: string;
  items: SidebarItem[];
};

export type SidebarSection = {
  basePath: string;
  groups?: SidebarGroup[];
  items?: SidebarItem[];
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
          { label: "Space optimization", path: "space-optimization", icon: "barChart" },
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
      { label: "Putaway", path: "putaway", icon: "forklift" },
      { label: "Overview", path: "", icon: "barChart" },
    ],
  },
  {
    basePath: "outbound",
    items: [
      { label: "Overview", path: "", icon: "barChart" },
      { label: "Picking", path: "picking", icon: "forklift" },

    ],
  },

      /*
      { label: "Order batching", path: "order-batching", icon: "barChart" },
      { label: "Picking strategies", path: "picking-strategies", icon: "settings" },
      { label: "Printing", path: "printing", icon: "print" },
       */

  {
    basePath: "inventory",
    items: [
      { label: "Inspection", path: "inspection", icon: "checkCircle" },
    ],
  },
      /*
      { label: "Overview", path: "", icon: "barChart" },
      */

  {
    basePath: "control-center",
    groups: [
      /*
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
      */
      {
        title: " ",
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
        title: "",
        items: [
          { label: "Prioritization", path: "prioritization", icon: "profile" },
          { label: "Strategies", path: "strategies", icon: "settings" },
          { label: "Bins", path: "bins", icon: "settings" },
          { label: "System settings", path: "system-settings", icon: "settings" },
          { label: "Inventory rules", path: "inventory-rules", icon: "settings" },
        ],
      },
      /* 
      {
        title: "Workflow configuration",
        items: [
          { label: "Inbound", path: "inbound", icon: "forklift" },
          { label: "Outbound", path: "outbound", icon: "forklift" },
          { label: "Inventory", path: "inventory", icon: "barChart" },
        ],
      },
      */
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
