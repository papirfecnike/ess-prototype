import type { IconName } from "@/components/ui/icon/icons";

export type SidebarItem = {
  label: string;
  path: string;
  icon: IconName;
  logoUrl?: string;
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
        title: "Productivity",
        items: [
          { label: "Overview", path: "", icon: "barChart" },
          { label: "AutoStore productivity", path: "productivity", icon: "rocket", logoUrl: "https://companieslogo.com/img/orig/AUTO.OL-e481afbe.png?t=1720244490" },
        ],
      },
      {
        title: "Storage utilization",
        items: [
          { label: "Space optimization", path: "space-optimization", icon: "compress" },
          { label: "Bins and compartments", path: "bins-compartments", icon: "barcode" },
        ],
      },
    ],
  },

  {
    basePath: "inbound",
    items: [
      { label: "Putaway", path: "putaway", icon: "forklift" },
      { label: "Inbound lines", path: "", icon: "barChart" },
    ],
  },
  {
    basePath: "outbound",
    items: [
      { label: "Picking", path: "picking", icon: "forklift" },
      { label: "Picklists", path: "", icon: "barChart" },

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
          { label: "Integration logs", path: "integration-logs", icon: "database" },
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
          { label: "System settings", path: "system-settings", icon: "settings" },
        ],
      },
      {
        title: "Workflows",
        items: [
          { label: "Priorities", path: "prioritization", icon: "rule" },
          { label: "Strategies", path: "strategies", icon: "timeline" },
          { label: "Bins", path: "bins", icon: "barcode" },
          { label: "Inventory rules", path: "inventory-rules", icon: "rule" },
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
      { label: "Security", path: "security", icon: "security" },
    ],
  },
];
