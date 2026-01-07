import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  route("dashboard", "routes/dashboard.tsx"),

  route("insights", "routes/insights.tsx", [
    index("routes/insights.overview.tsx"),
    route("productivity", "routes/insights.productivity.tsx"),
    route("port-performance", "routes/insights.port-performance.tsx"),
    route("staff-performance", "routes/insights.staff-performance.tsx"),
    route("storage-utilization", "routes/insights.storage-utilization.tsx"),
    route("replenishment", "routes/insights.replenishment.tsx"),
    route("system-health", "routes/insights.system-health.tsx"),
  ]),

  route("inbound", "routes/inbound.tsx", [
    index("routes/inbound.overview.tsx"),
    route("putaway", "routes/inbound.putaway.tsx"),
    route("putaway-table", "routes/inbound.putaway-table.tsx"),
    route("putaway-product", "routes/inbound.putaway-product.tsx"),
  ]),

  route("outbound", "routes/outbound.tsx", [
    index("routes/outbound.overview.tsx"),
    route("picking", "routes/outbound.picking.tsx"),
    route("picking-table", "routes/outbound.picking-table.tsx"),
    route("picking-product", "routes/outbound.picking-product.tsx"),
    route("order-batching", "routes/outbound.order-batching.tsx"),
    route("picking-strategies", "routes/outbound.picking-strategies.tsx"),
    route("printing", "routes/outbound.printing.tsx"),
  ]),

  route("inventory", "routes/inventory.tsx", [
    index("routes/inventory.overview.tsx"),
    route("inspection-table", "routes/inventory.inspection-table.tsx"),
    route("inspection-product", "routes/inventory.inspection-product.tsx"),
    route("inspection", "routes/inventory.inspection.tsx"),
  ]),

  route("control-center", "routes/control-center.tsx", [
    index("routes/control-center.warehouse-layout.tsx"),
    route("alert-monitoring", "routes/control-center.alert-monitoring.tsx"),
    route("orders-tracking", "routes/control-center.orders-tracking.tsx"),
    route("eoperator-console", "routes/control-center.eoperator-console.tsx"),
    route("maintenance", "routes/control-center.maintenance.tsx"),
    route("integration-logs", "routes/control-center.integration-logs.tsx"),
    route("system-logs", "routes/control-center.system-logs.tsx"),
    route("material-handling-logs", "routes/control-center.material-handling-logs.tsx"),
  ]),

  route("configuration", "routes/configuration.tsx", [
    index("routes/configuration.user-management.tsx"),
    route("language-settings", "routes/configuration.language-settings.tsx"),
    route("system-settings", "routes/configuration.system-settings.tsx"),
    route("inbound", "routes/configuration.inbound.tsx"),
    route("outbound", "routes/configuration.outbound.tsx"),
    route("inventory", "routes/configuration.inventory.tsx"),
    route("autostore", "routes/configuration.autostore.tsx"),
    route("general-setup", "routes/configuration.general-setup.tsx"),
    route("modules", "routes/configuration.modules.tsx"),
    route("orchestration", "routes/configuration.orchestration.tsx"),
    route("version-history", "routes/configuration.version-history.tsx"),
  ]),

  route("profile", "routes/profile.tsx", [
    index("routes/profile.personal-information.tsx"),
    route("system-preferences", "routes/profile.system-preferences.tsx"),
    route("security", "routes/profile.security.tsx"),
  ]),
] satisfies RouteConfig;
