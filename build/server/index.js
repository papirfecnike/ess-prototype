import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, NavLink, useLocation, UNSAFE_withComponentProps, Meta, Links, Outlet, ScrollRestoration, Scripts, UNSAFE_withErrorBoundaryProps } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createContext, useState, useEffect } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const appStyles = "/assets/app-BJbG49zl.css";
function ClientHeader() {
  return /* @__PURE__ */ jsxs("header", { children: [
    /* @__PURE__ */ jsxs("nav", { children: [
      /* @__PURE__ */ jsx(NavLink, { to: "/dashboard", children: "Dashboard" }),
      /* @__PURE__ */ jsx(NavLink, { to: "/insights", children: "Insights" }),
      /* @__PURE__ */ jsx(NavLink, { to: "/inbound", children: "Inbound" }),
      /* @__PURE__ */ jsx(NavLink, { to: "/outbound", children: "Outbound" }),
      /* @__PURE__ */ jsx(NavLink, { to: "/inventory", children: "Inventory" }),
      /* @__PURE__ */ jsx(NavLink, { to: "/control-center", children: "Control center" }),
      /* @__PURE__ */ jsx(NavLink, { to: "/configuration", children: "Configuration" })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 12 }, children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "search",
          placeholder: "Search",
          style: {
            padding: "6px 10px",
            borderRadius: 6,
            border: "1px solid var(--color-border)"
          }
        }
      ),
      /* @__PURE__ */ jsx("button", { children: "Profile" })
    ] })
  ] });
}
const sidebarConfig = [
  {
    basePath: "insights",
    items: [
      { label: "Overview", path: "" },
      { label: "Productivity", path: "productivity" },
      { label: "Port performance", path: "port-performance" },
      { label: "Staff performance", path: "staff-performance" },
      { label: "Storage utilization", path: "storage-utilization" },
      { label: "Replenishment", path: "replenishment" },
      { label: "System health", path: "system-health" }
    ]
  },
  {
    basePath: "inbound",
    items: [
      { label: "Overview", path: "" },
      { label: "Putaway", path: "putaway" }
    ]
  },
  {
    basePath: "outbound",
    items: [
      { label: "Overview", path: "" },
      { label: "Picking", path: "picking" },
      { label: "Order batching", path: "order-batching" },
      { label: "Picking strategies", path: "picking-strategies" },
      { label: "Printing", path: "printing" }
    ]
  },
  {
    basePath: "inventory",
    items: [
      { label: "Overview", path: "" },
      { label: "Inspection", path: "inspection" }
    ]
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
      { label: "Material handling logs", path: "material-handling-logs" }
    ]
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
      { label: "Version history", path: "version-history" }
    ]
  }
];
function Sidebar() {
  const location = useLocation();
  const mainSection = location.pathname.split("/")[1];
  const section = sidebarConfig.find(
    (s) => s.basePath === mainSection
  );
  if (!section) {
    return null;
  }
  return /* @__PURE__ */ jsx("aside", { className: "sidebar", children: /* @__PURE__ */ jsx("ul", { children: section.items.map((item) => {
    const to = item.path ? `/${section.basePath}/${item.path}` : `/${section.basePath}`;
    return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(NavLink, { to, children: item.label }) }, to);
  }) }) });
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "footer", children: /* @__PURE__ */ jsxs("p", { children: [
    "© 2025 Dora Makszy |",
    " ",
    /* @__PURE__ */ jsx("a", { href: "mailto:makszydorka@gmail.com", className: "link", children: "Contact" })
  ] }) });
}
const navigationIndex = [
  // MAIN NAV
  {
    id: "nav-dashboard",
    title: "Dashboard",
    route: "/dashboard",
    section: "global",
    type: "main-nav"
  },
  {
    id: "nav-insights",
    title: "Insights",
    route: "/insights",
    section: "insights",
    type: "main-nav"
  },
  {
    id: "nav-inbound",
    title: "Inbound",
    route: "/inbound",
    section: "inbound",
    type: "main-nav"
  },
  {
    id: "nav-outbound",
    title: "Outbound",
    route: "/outbound",
    section: "outbound",
    type: "main-nav"
  },
  {
    id: "nav-inventory",
    title: "Inventory",
    route: "/inventory",
    section: "inventory",
    type: "main-nav"
  },
  // SIDEBAR – INSIGHTS
  {
    id: "nav-insights-productivity",
    title: "Productivity",
    route: "/insights/productivity",
    section: "insights",
    type: "sub-nav"
  },
  {
    id: "nav-insights-system-health",
    title: "System health",
    route: "/insights/system-health",
    section: "insights",
    type: "sub-nav"
  },
  // SIDEBAR – OUTBOUND
  {
    id: "nav-outbound-picking",
    title: "Picking",
    route: "/outbound/picking",
    section: "outbound",
    type: "sub-nav"
  }
];
const contentIndex = [
  {
    id: "inv-overview",
    title: "Inventory overview",
    description: "Stock levels and status",
    route: "/inventory",
    section: "inventory",
    type: "content"
  },
  {
    id: "cc-system-logs",
    title: "System logs",
    description: "All system events",
    route: "/control-center/system-logs",
    section: "control-center",
    type: "content"
  }
];
const searchIndex = [
  ...navigationIndex,
  ...contentIndex
];
const SearchContext = createContext(null);
function SearchProvider({ children }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    const filtered = searchIndex.filter(
      (item) => item.title.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query]);
  const clear = () => {
    setQuery("");
    setResults([]);
  };
  return /* @__PURE__ */ jsx(
    SearchContext.Provider,
    {
      value: { query, setQuery, results, clear },
      children
    }
  );
}
function links() {
  return [{
    rel: "stylesheet",
    href: appStyles
  }];
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsxs(SearchProvider, {
        children: [/* @__PURE__ */ jsx(ClientHeader, {}), /* @__PURE__ */ jsxs("div", {
          className: "app-layout",
          children: [/* @__PURE__ */ jsx(Sidebar, {}), /* @__PURE__ */ jsx("main", {
            className: "app-main",
            children: /* @__PURE__ */ jsx(Outlet, {})
          })]
        }), /* @__PURE__ */ jsx(Footer, {})]
      }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  return /* @__PURE__ */ jsxs("main", {
    style: {
      padding: 24
    },
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Error"
    }), /* @__PURE__ */ jsx("pre", {
      children: String(error)
    })]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const loader$I = async () => {
  return null;
};
const dashboard = UNSAFE_withComponentProps(function Dashboard() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Dashboard"
    }), /* @__PURE__ */ jsx("p", {
      children: "Placeholder content"
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dashboard,
  loader: loader$I
}, Symbol.toStringTag, { value: "Module" }));
const loader$H = async () => {
  return null;
};
const insights = UNSAFE_withComponentProps(function InsightsRoute() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: insights,
  loader: loader$H
}, Symbol.toStringTag, { value: "Module" }));
const loader$G = async () => {
  return null;
};
const insights_overview = UNSAFE_withComponentProps(function InsightsOverview() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Insights – Overview"
    }), /* @__PURE__ */ jsx("p", {
      children: "High-level performance metrics."
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: insights_overview,
  loader: loader$G
}, Symbol.toStringTag, { value: "Module" }));
const loader$F = async () => {
  return null;
};
const insights_productivity = UNSAFE_withComponentProps(function InsightsProductivity() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Productivity"
    }), /* @__PURE__ */ jsx("p", {
      children: "Productivity insights and trends."
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: insights_productivity,
  loader: loader$F
}, Symbol.toStringTag, { value: "Module" }));
const loader$E = async () => {
  return null;
};
const insights_portPerformance = UNSAFE_withComponentProps(function InsightsPortPerformance() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Port performance"
    }), /* @__PURE__ */ jsx("p", {
      children: "Port insights and trends."
    })]
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: insights_portPerformance,
  loader: loader$E
}, Symbol.toStringTag, { value: "Module" }));
const loader$D = async () => {
  return null;
};
const insights_staffPerformance = UNSAFE_withComponentProps(function InsightsStaffPerf() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Staff performance"
    }), /* @__PURE__ */ jsx("p", {
      children: "Staff insights and trends."
    })]
  });
});
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: insights_staffPerformance,
  loader: loader$D
}, Symbol.toStringTag, { value: "Module" }));
const loader$C = async () => {
  return null;
};
const insights_storageUtilization = UNSAFE_withComponentProps(function InsightsStorage() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Storage utilization"
    }), /* @__PURE__ */ jsx("p", {
      children: "Storage insights and trends."
    })]
  });
});
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: insights_storageUtilization,
  loader: loader$C
}, Symbol.toStringTag, { value: "Module" }));
const loader$B = async () => {
  return null;
};
const insights_replenishment = UNSAFE_withComponentProps(function InsightsReplenishment() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Replenishment"
    }), /* @__PURE__ */ jsx("p", {
      children: "Replenishment insights and trends."
    })]
  });
});
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: insights_replenishment,
  loader: loader$B
}, Symbol.toStringTag, { value: "Module" }));
const loader$A = async () => {
  return null;
};
const insights_systemHealth = UNSAFE_withComponentProps(function InsightsSysHealth() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "System health"
    }), /* @__PURE__ */ jsx("p", {
      children: "System insights and trends."
    })]
  });
});
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: insights_systemHealth,
  loader: loader$A
}, Symbol.toStringTag, { value: "Module" }));
const loader$z = async () => {
  return null;
};
const inbound = UNSAFE_withComponentProps(function Inbound() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: inbound,
  loader: loader$z
}, Symbol.toStringTag, { value: "Module" }));
const loader$y = async () => {
  return null;
};
const inbound_overview = UNSAFE_withComponentProps(function InboundOverview() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Overview"
    }), /* @__PURE__ */ jsx("p", {
      children: " insights and trends."
    })]
  });
});
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: inbound_overview,
  loader: loader$y
}, Symbol.toStringTag, { value: "Module" }));
const loader$x = async () => {
  return null;
};
const inbound_putaway = UNSAFE_withComponentProps(function InboundPutaway() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Putaway"
    }), /* @__PURE__ */ jsx("p", {
      children: " insights and trends."
    })]
  });
});
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: inbound_putaway,
  loader: loader$x
}, Symbol.toStringTag, { value: "Module" }));
const loader$w = async () => {
  return null;
};
const outbound = UNSAFE_withComponentProps(function Outbound() {
  return /* @__PURE__ */ jsx("h1", {
    children: "Outbound"
  });
});
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: outbound,
  loader: loader$w
}, Symbol.toStringTag, { value: "Module" }));
const loader$v = async () => {
  return null;
};
const outbound_overview = UNSAFE_withComponentProps(function OutboundOverview() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Overview"
    }), /* @__PURE__ */ jsx("p", {
      children: " insights and trends."
    })]
  });
});
const route14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: outbound_overview,
  loader: loader$v
}, Symbol.toStringTag, { value: "Module" }));
const loader$u = async () => {
  return null;
};
const outbound_picking = UNSAFE_withComponentProps(function OutboundPicking() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Picking"
    }), /* @__PURE__ */ jsx("p", {
      children: " insights and trends."
    })]
  });
});
const route15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: outbound_picking,
  loader: loader$u
}, Symbol.toStringTag, { value: "Module" }));
const loader$t = async () => {
  return null;
};
const outbound_orderBatching = UNSAFE_withComponentProps(function OutboundOrderBatching() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Order batching"
    }), /* @__PURE__ */ jsx("p", {
      children: " insights and trends."
    })]
  });
});
const route16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: outbound_orderBatching,
  loader: loader$t
}, Symbol.toStringTag, { value: "Module" }));
const loader$s = async () => {
  return null;
};
const outbound_pickingStrategies = UNSAFE_withComponentProps(function OutboundPickingStrategies() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Picking strategies"
    }), /* @__PURE__ */ jsx("p", {
      children: " insights and trends."
    })]
  });
});
const route17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: outbound_pickingStrategies,
  loader: loader$s
}, Symbol.toStringTag, { value: "Module" }));
const loader$r = async () => {
  return null;
};
const outbound_printing = UNSAFE_withComponentProps(function OutboundPrinting() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Printing"
    }), /* @__PURE__ */ jsx("p", {
      children: " insights and trends."
    })]
  });
});
const route18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: outbound_printing,
  loader: loader$r
}, Symbol.toStringTag, { value: "Module" }));
const loader$q = async () => {
  return null;
};
const inventory = UNSAFE_withComponentProps(function Inventory() {
  return /* @__PURE__ */ jsx("h1", {
    children: "Inventory"
  });
});
const route19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: inventory,
  loader: loader$q
}, Symbol.toStringTag, { value: "Module" }));
const loader$p = async () => {
  return null;
};
const inventory_overview = UNSAFE_withComponentProps(function InventoryOverview() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Overview"
    }), /* @__PURE__ */ jsx("p", {
      children: " Overview of inspected items"
    })]
  });
});
const route20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: inventory_overview,
  loader: loader$p
}, Symbol.toStringTag, { value: "Module" }));
const loader$o = async () => {
  return null;
};
const inventory_inspection = UNSAFE_withComponentProps(function InventoryInspection() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Inspection"
    }), /* @__PURE__ */ jsx("p", {
      children: "Perform inspection"
    })]
  });
});
const route21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: inventory_inspection,
  loader: loader$o
}, Symbol.toStringTag, { value: "Module" }));
const loader$n = async () => {
  return null;
};
const controlCenter = UNSAFE_withComponentProps(function ControlCenter() {
  return /* @__PURE__ */ jsx("h1", {
    children: "Control center"
  });
});
const route22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: controlCenter,
  loader: loader$n
}, Symbol.toStringTag, { value: "Module" }));
const loader$m = async () => {
  return null;
};
const controlCenter_warehouseLayout = UNSAFE_withComponentProps(function ControlWarehouseLayout() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Warehouse layout"
    }), /* @__PURE__ */ jsx("p", {
      children: "Placeholder content"
    })]
  });
});
const route23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: controlCenter_warehouseLayout,
  loader: loader$m
}, Symbol.toStringTag, { value: "Module" }));
const loader$l = async () => {
  return null;
};
const controlCenter_alertMonitoring = UNSAFE_withComponentProps(function ControlAlerts() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Alert monitoring"
    }), /* @__PURE__ */ jsx("p", {
      children: "Placeholder content"
    })]
  });
});
const route24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: controlCenter_alertMonitoring,
  loader: loader$l
}, Symbol.toStringTag, { value: "Module" }));
const loader$k = async () => {
  return null;
};
const controlCenter_ordersTracking = UNSAFE_withComponentProps(function ControlOrderTracking() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Order tracking"
    }), /* @__PURE__ */ jsx("p", {
      children: "Placeholder content"
    })]
  });
});
const route25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: controlCenter_ordersTracking,
  loader: loader$k
}, Symbol.toStringTag, { value: "Module" }));
const loader$j = async () => {
  return null;
};
const controlCenter_eoperatorConsole = UNSAFE_withComponentProps(function ControlEoperator() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "eOperator console"
    }), /* @__PURE__ */ jsx("p", {
      children: "Placeholder content"
    })]
  });
});
const route26 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: controlCenter_eoperatorConsole,
  loader: loader$j
}, Symbol.toStringTag, { value: "Module" }));
const loader$i = async () => {
  return null;
};
const controlCenter_maintenance = UNSAFE_withComponentProps(function ControlMaintenance() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Maintenance"
    }), /* @__PURE__ */ jsx("p", {
      children: "Placeholder content"
    })]
  });
});
const route27 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: controlCenter_maintenance,
  loader: loader$i
}, Symbol.toStringTag, { value: "Module" }));
const loader$h = async () => {
  return null;
};
const controlCenter_integrationLogs = UNSAFE_withComponentProps(function ControlIntLogs() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Integration logs"
    }), /* @__PURE__ */ jsx("p", {
      children: "Placeholder content"
    })]
  });
});
const route28 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: controlCenter_integrationLogs,
  loader: loader$h
}, Symbol.toStringTag, { value: "Module" }));
const loader$g = async () => {
  return null;
};
const controlCenter_systemLogs = UNSAFE_withComponentProps(function ControlSystemLogs() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "System logs"
    }), /* @__PURE__ */ jsx("p", {
      children: "Placeholder content"
    })]
  });
});
const route29 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: controlCenter_systemLogs,
  loader: loader$g
}, Symbol.toStringTag, { value: "Module" }));
const loader$f = async () => {
  return null;
};
const controlCenter_materialHandlingLogs = UNSAFE_withComponentProps(function ControlMHlogs() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Material handling logs"
    }), /* @__PURE__ */ jsx("p", {
      children: "Placeholder content"
    })]
  });
});
const route30 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: controlCenter_materialHandlingLogs,
  loader: loader$f
}, Symbol.toStringTag, { value: "Module" }));
const loader$e = async () => {
  return null;
};
const configuration = UNSAFE_withComponentProps(function Configuration() {
  return /* @__PURE__ */ jsx("h1", {
    children: "Configuration"
  });
});
const route31 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: configuration,
  loader: loader$e
}, Symbol.toStringTag, { value: "Module" }));
const loader$d = async () => {
  return null;
};
const configuration_userManagement = UNSAFE_withComponentProps(function ControlUserMgmt() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "User management"
    }), /* @__PURE__ */ jsx("p", {
      children: "Placeholder content"
    })]
  });
});
const route32 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: configuration_userManagement,
  loader: loader$d
}, Symbol.toStringTag, { value: "Module" }));
const loader$c = async () => {
  return null;
};
const configuration_languageSettings = UNSAFE_withComponentProps(function ConfigLanguage() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Language configuration"
    }), /* @__PURE__ */ jsx("p", {
      children: "Placeholder content"
    })]
  });
});
const route33 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: configuration_languageSettings,
  loader: loader$c
}, Symbol.toStringTag, { value: "Module" }));
const loader$b = async () => {
  return null;
};
const configuration_systemSettings = UNSAFE_withComponentProps(function ConfigSystem() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "System settings"
    }), /* @__PURE__ */ jsx("p", {
      children: "Placeholder content"
    })]
  });
});
const route34 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: configuration_systemSettings,
  loader: loader$b
}, Symbol.toStringTag, { value: "Module" }));
const loader$a = async () => {
  return null;
};
const configuration_inbound = UNSAFE_withComponentProps(function ConfigInbound() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Inbound configuration"
    }), /* @__PURE__ */ jsx("p", {
      children: "Placeholder content"
    })]
  });
});
const route35 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: configuration_inbound,
  loader: loader$a
}, Symbol.toStringTag, { value: "Module" }));
const loader$9 = async () => {
  return null;
};
const configuration_outbound = UNSAFE_withComponentProps(function ConfigOutbound() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Outbound configuration"
    }), /* @__PURE__ */ jsx("p", {
      children: "Placeholder content"
    })]
  });
});
const route36 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: configuration_outbound,
  loader: loader$9
}, Symbol.toStringTag, { value: "Module" }));
const loader$8 = async () => {
  return null;
};
const configuration_inventory = UNSAFE_withComponentProps(function ConfigInventory() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Inventory configuration"
    }), /* @__PURE__ */ jsx("p", {
      children: "Placeholder content"
    })]
  });
});
const route37 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: configuration_inventory,
  loader: loader$8
}, Symbol.toStringTag, { value: "Module" }));
const loader$7 = async () => {
  return null;
};
const configuration_autostore = UNSAFE_withComponentProps(function ConfigAutoStore() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "AutoStore configuration"
    }), /* @__PURE__ */ jsx("p", {
      children: "Placeholder content"
    })]
  });
});
const route38 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: configuration_autostore,
  loader: loader$7
}, Symbol.toStringTag, { value: "Module" }));
const loader$6 = async () => {
  return null;
};
const configuration_generalSetup = UNSAFE_withComponentProps(function ConfigGeneralSetup() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "General setup"
    }), /* @__PURE__ */ jsx("p", {
      children: "Placeholder content"
    })]
  });
});
const route39 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: configuration_generalSetup,
  loader: loader$6
}, Symbol.toStringTag, { value: "Module" }));
const loader$5 = async () => {
  return null;
};
const configuration_modules = UNSAFE_withComponentProps(function ConfigModules() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Modules configuration"
    }), /* @__PURE__ */ jsx("p", {
      children: "Placeholder content"
    })]
  });
});
const route40 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: configuration_modules,
  loader: loader$5
}, Symbol.toStringTag, { value: "Module" }));
const loader$4 = async () => {
  return null;
};
const configuration_orchestration = UNSAFE_withComponentProps(function ConfigOrchestration() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Orchestration"
    }), /* @__PURE__ */ jsx("p", {
      children: "Placeholder content"
    })]
  });
});
const route41 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: configuration_orchestration,
  loader: loader$4
}, Symbol.toStringTag, { value: "Module" }));
const loader$3 = async () => {
  return null;
};
const configuration_versionHistory = UNSAFE_withComponentProps(function ConfigVersioning() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Version control"
    }), /* @__PURE__ */ jsx("p", {
      children: "Placeholder content"
    })]
  });
});
const route42 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: configuration_versionHistory,
  loader: loader$3
}, Symbol.toStringTag, { value: "Module" }));
const loader$2 = async () => {
  return null;
};
const profile_personalInformation = UNSAFE_withComponentProps(function ProfilePersonal() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Personal information"
    }), /* @__PURE__ */ jsx("p", {
      children: " insights and trends."
    })]
  });
});
const route43 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: profile_personalInformation,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
const loader$1 = async () => {
  return null;
};
const profile_systemPreferences = UNSAFE_withComponentProps(function ProfilePref() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Preferences"
    }), /* @__PURE__ */ jsx("p", {
      children: " insights and trends."
    })]
  });
});
const route44 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: profile_systemPreferences,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const loader = async () => {
  return null;
};
const profile_security = UNSAFE_withComponentProps(function ProfileSecurity() {
  return /* @__PURE__ */ jsxs("div", {
    className: "page",
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Security"
    }), /* @__PURE__ */ jsx("p", {
      children: " insights and trends."
    })]
  });
});
const route45 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: profile_security,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-a65Tb8b1.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-DcvBzNiA.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/dashboard": { "id": "routes/dashboard", "parentId": "root", "path": "dashboard", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/dashboard-BmSpnKXu.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/insights": { "id": "routes/insights", "parentId": "root", "path": "insights", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/insights-Cwh7UeLD.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/insights.overview": { "id": "routes/insights.overview", "parentId": "routes/insights", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/insights.overview-B0ImWbK7.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/insights.productivity": { "id": "routes/insights.productivity", "parentId": "routes/insights", "path": "productivity", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/insights.productivity-DFBjFMa-.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/insights.port-performance": { "id": "routes/insights.port-performance", "parentId": "routes/insights", "path": "port-performance", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/insights.port-performance-C1zavS8i.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/insights.staff-performance": { "id": "routes/insights.staff-performance", "parentId": "routes/insights", "path": "staff-performance", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/insights.staff-performance-BWeQFrVj.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/insights.storage-utilization": { "id": "routes/insights.storage-utilization", "parentId": "routes/insights", "path": "storage-utilization", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/insights.storage-utilization-57jKn5r7.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/insights.replenishment": { "id": "routes/insights.replenishment", "parentId": "routes/insights", "path": "replenishment", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/insights.replenishment-CgguOGk7.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/insights.system-health": { "id": "routes/insights.system-health", "parentId": "routes/insights", "path": "system-health", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/insights.system-health-C9Bon7FP.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/inbound": { "id": "routes/inbound", "parentId": "root", "path": "inbound", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/inbound-DzJ8WMAJ.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/inbound.overview": { "id": "routes/inbound.overview", "parentId": "routes/inbound", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/inbound.overview-BN3J_zAT.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/inbound.putaway": { "id": "routes/inbound.putaway", "parentId": "routes/inbound", "path": "putaway", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/inbound.putaway-B_PZ8s_w.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/outbound": { "id": "routes/outbound", "parentId": "root", "path": "outbound", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/outbound-Cho0s1qM.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/outbound.overview": { "id": "routes/outbound.overview", "parentId": "routes/outbound", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/outbound.overview-BFzCVJGS.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/outbound.picking": { "id": "routes/outbound.picking", "parentId": "routes/outbound", "path": "picking", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/outbound.picking-CVtFObOw.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/outbound.order-batching": { "id": "routes/outbound.order-batching", "parentId": "routes/outbound", "path": "order-batching", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/outbound.order-batching-DkCndgyy.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/outbound.picking-strategies": { "id": "routes/outbound.picking-strategies", "parentId": "routes/outbound", "path": "picking-strategies", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/outbound.picking-strategies-D5i3ATda.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/outbound.printing": { "id": "routes/outbound.printing", "parentId": "routes/outbound", "path": "printing", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/outbound.printing-B9YFlfTX.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/inventory": { "id": "routes/inventory", "parentId": "root", "path": "inventory", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/inventory-DHLR1-SN.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/inventory.overview": { "id": "routes/inventory.overview", "parentId": "routes/inventory", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/inventory.overview-DvoMPlfX.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/inventory.inspection": { "id": "routes/inventory.inspection", "parentId": "routes/inventory", "path": "inspection", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/inventory.inspection-BOo6TEi5.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/control-center": { "id": "routes/control-center", "parentId": "root", "path": "control-center", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/control-center-Cbsu90Kv.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/control-center.warehouse-layout": { "id": "routes/control-center.warehouse-layout", "parentId": "routes/control-center", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/control-center.warehouse-layout-C9JouFoW.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/control-center.alert-monitoring": { "id": "routes/control-center.alert-monitoring", "parentId": "routes/control-center", "path": "alert-monitoring", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/control-center.alert-monitoring-CpWeatX5.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/control-center.orders-tracking": { "id": "routes/control-center.orders-tracking", "parentId": "routes/control-center", "path": "orders-tracking", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/control-center.orders-tracking-C6HQZnra.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/control-center.eoperator-console": { "id": "routes/control-center.eoperator-console", "parentId": "routes/control-center", "path": "eoperator-console", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/control-center.eoperator-console-rGJua0Dv.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/control-center.maintenance": { "id": "routes/control-center.maintenance", "parentId": "routes/control-center", "path": "maintenance", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/control-center.maintenance-DnB1UNUl.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/control-center.integration-logs": { "id": "routes/control-center.integration-logs", "parentId": "routes/control-center", "path": "integration-logs", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/control-center.integration-logs-A0A3HOP0.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/control-center.system-logs": { "id": "routes/control-center.system-logs", "parentId": "routes/control-center", "path": "system-logs", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/control-center.system-logs-CmmesqUx.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/control-center.material-handling-logs": { "id": "routes/control-center.material-handling-logs", "parentId": "routes/control-center", "path": "material-handling-logs", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/control-center.material-handling-logs-DYy4NNUB.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/configuration": { "id": "routes/configuration", "parentId": "root", "path": "configuration", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/configuration-C9lQkFXy.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/configuration.user-management": { "id": "routes/configuration.user-management", "parentId": "routes/configuration", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/configuration.user-management-Bwen6J0r.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/configuration.language-settings": { "id": "routes/configuration.language-settings", "parentId": "routes/configuration", "path": "language-settings", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/configuration.language-settings-D3vQ1z8Y.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/configuration.system-settings": { "id": "routes/configuration.system-settings", "parentId": "routes/configuration", "path": "system-settings", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/configuration.system-settings-Db9nEpNF.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/configuration.inbound": { "id": "routes/configuration.inbound", "parentId": "routes/configuration", "path": "inbound", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/configuration.inbound-DXhk3R92.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/configuration.outbound": { "id": "routes/configuration.outbound", "parentId": "routes/configuration", "path": "outbound", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/configuration.outbound-C8dZk_bz.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/configuration.inventory": { "id": "routes/configuration.inventory", "parentId": "routes/configuration", "path": "inventory", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/configuration.inventory-D25Fv3Cc.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/configuration.autostore": { "id": "routes/configuration.autostore", "parentId": "routes/configuration", "path": "autostore", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/configuration.autostore-CRHJbb0M.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/configuration.general-setup": { "id": "routes/configuration.general-setup", "parentId": "routes/configuration", "path": "general-setup", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/configuration.general-setup-DGC04RSR.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/configuration.modules": { "id": "routes/configuration.modules", "parentId": "routes/configuration", "path": "modules", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/configuration.modules-Dk0T_Vlt.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/configuration.orchestration": { "id": "routes/configuration.orchestration", "parentId": "routes/configuration", "path": "orchestration", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/configuration.orchestration-HAKBKEzq.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/configuration.version-history": { "id": "routes/configuration.version-history", "parentId": "routes/configuration", "path": "version-history", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/configuration.version-history-OQaFXdkO.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/profile.personal-information": { "id": "routes/profile.personal-information", "parentId": "root", "path": "profile", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/profile.personal-information-CTl_aGRg.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/profile.system-preferences": { "id": "routes/profile.system-preferences", "parentId": "routes/profile.personal-information", "path": "system-preferences", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/profile.system-preferences-DWuJ1ah7.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/profile.security": { "id": "routes/profile.security", "parentId": "routes/profile.personal-information", "path": "security", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/profile.security-BVCBDBSI.js", "imports": ["/assets/chunk-WWGJGFF6-DNatREV9.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-2efcc25e.js", "version": "2efcc25e", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "unstable_subResourceIntegrity": false, "v8_middleware": false, "v8_splitRouteModules": false, "v8_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/dashboard": {
    id: "routes/dashboard",
    parentId: "root",
    path: "dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/insights": {
    id: "routes/insights",
    parentId: "root",
    path: "insights",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/insights.overview": {
    id: "routes/insights.overview",
    parentId: "routes/insights",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route3
  },
  "routes/insights.productivity": {
    id: "routes/insights.productivity",
    parentId: "routes/insights",
    path: "productivity",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/insights.port-performance": {
    id: "routes/insights.port-performance",
    parentId: "routes/insights",
    path: "port-performance",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/insights.staff-performance": {
    id: "routes/insights.staff-performance",
    parentId: "routes/insights",
    path: "staff-performance",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/insights.storage-utilization": {
    id: "routes/insights.storage-utilization",
    parentId: "routes/insights",
    path: "storage-utilization",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/insights.replenishment": {
    id: "routes/insights.replenishment",
    parentId: "routes/insights",
    path: "replenishment",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/insights.system-health": {
    id: "routes/insights.system-health",
    parentId: "routes/insights",
    path: "system-health",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/inbound": {
    id: "routes/inbound",
    parentId: "root",
    path: "inbound",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/inbound.overview": {
    id: "routes/inbound.overview",
    parentId: "routes/inbound",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route11
  },
  "routes/inbound.putaway": {
    id: "routes/inbound.putaway",
    parentId: "routes/inbound",
    path: "putaway",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "routes/outbound": {
    id: "routes/outbound",
    parentId: "root",
    path: "outbound",
    index: void 0,
    caseSensitive: void 0,
    module: route13
  },
  "routes/outbound.overview": {
    id: "routes/outbound.overview",
    parentId: "routes/outbound",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route14
  },
  "routes/outbound.picking": {
    id: "routes/outbound.picking",
    parentId: "routes/outbound",
    path: "picking",
    index: void 0,
    caseSensitive: void 0,
    module: route15
  },
  "routes/outbound.order-batching": {
    id: "routes/outbound.order-batching",
    parentId: "routes/outbound",
    path: "order-batching",
    index: void 0,
    caseSensitive: void 0,
    module: route16
  },
  "routes/outbound.picking-strategies": {
    id: "routes/outbound.picking-strategies",
    parentId: "routes/outbound",
    path: "picking-strategies",
    index: void 0,
    caseSensitive: void 0,
    module: route17
  },
  "routes/outbound.printing": {
    id: "routes/outbound.printing",
    parentId: "routes/outbound",
    path: "printing",
    index: void 0,
    caseSensitive: void 0,
    module: route18
  },
  "routes/inventory": {
    id: "routes/inventory",
    parentId: "root",
    path: "inventory",
    index: void 0,
    caseSensitive: void 0,
    module: route19
  },
  "routes/inventory.overview": {
    id: "routes/inventory.overview",
    parentId: "routes/inventory",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route20
  },
  "routes/inventory.inspection": {
    id: "routes/inventory.inspection",
    parentId: "routes/inventory",
    path: "inspection",
    index: void 0,
    caseSensitive: void 0,
    module: route21
  },
  "routes/control-center": {
    id: "routes/control-center",
    parentId: "root",
    path: "control-center",
    index: void 0,
    caseSensitive: void 0,
    module: route22
  },
  "routes/control-center.warehouse-layout": {
    id: "routes/control-center.warehouse-layout",
    parentId: "routes/control-center",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route23
  },
  "routes/control-center.alert-monitoring": {
    id: "routes/control-center.alert-monitoring",
    parentId: "routes/control-center",
    path: "alert-monitoring",
    index: void 0,
    caseSensitive: void 0,
    module: route24
  },
  "routes/control-center.orders-tracking": {
    id: "routes/control-center.orders-tracking",
    parentId: "routes/control-center",
    path: "orders-tracking",
    index: void 0,
    caseSensitive: void 0,
    module: route25
  },
  "routes/control-center.eoperator-console": {
    id: "routes/control-center.eoperator-console",
    parentId: "routes/control-center",
    path: "eoperator-console",
    index: void 0,
    caseSensitive: void 0,
    module: route26
  },
  "routes/control-center.maintenance": {
    id: "routes/control-center.maintenance",
    parentId: "routes/control-center",
    path: "maintenance",
    index: void 0,
    caseSensitive: void 0,
    module: route27
  },
  "routes/control-center.integration-logs": {
    id: "routes/control-center.integration-logs",
    parentId: "routes/control-center",
    path: "integration-logs",
    index: void 0,
    caseSensitive: void 0,
    module: route28
  },
  "routes/control-center.system-logs": {
    id: "routes/control-center.system-logs",
    parentId: "routes/control-center",
    path: "system-logs",
    index: void 0,
    caseSensitive: void 0,
    module: route29
  },
  "routes/control-center.material-handling-logs": {
    id: "routes/control-center.material-handling-logs",
    parentId: "routes/control-center",
    path: "material-handling-logs",
    index: void 0,
    caseSensitive: void 0,
    module: route30
  },
  "routes/configuration": {
    id: "routes/configuration",
    parentId: "root",
    path: "configuration",
    index: void 0,
    caseSensitive: void 0,
    module: route31
  },
  "routes/configuration.user-management": {
    id: "routes/configuration.user-management",
    parentId: "routes/configuration",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route32
  },
  "routes/configuration.language-settings": {
    id: "routes/configuration.language-settings",
    parentId: "routes/configuration",
    path: "language-settings",
    index: void 0,
    caseSensitive: void 0,
    module: route33
  },
  "routes/configuration.system-settings": {
    id: "routes/configuration.system-settings",
    parentId: "routes/configuration",
    path: "system-settings",
    index: void 0,
    caseSensitive: void 0,
    module: route34
  },
  "routes/configuration.inbound": {
    id: "routes/configuration.inbound",
    parentId: "routes/configuration",
    path: "inbound",
    index: void 0,
    caseSensitive: void 0,
    module: route35
  },
  "routes/configuration.outbound": {
    id: "routes/configuration.outbound",
    parentId: "routes/configuration",
    path: "outbound",
    index: void 0,
    caseSensitive: void 0,
    module: route36
  },
  "routes/configuration.inventory": {
    id: "routes/configuration.inventory",
    parentId: "routes/configuration",
    path: "inventory",
    index: void 0,
    caseSensitive: void 0,
    module: route37
  },
  "routes/configuration.autostore": {
    id: "routes/configuration.autostore",
    parentId: "routes/configuration",
    path: "autostore",
    index: void 0,
    caseSensitive: void 0,
    module: route38
  },
  "routes/configuration.general-setup": {
    id: "routes/configuration.general-setup",
    parentId: "routes/configuration",
    path: "general-setup",
    index: void 0,
    caseSensitive: void 0,
    module: route39
  },
  "routes/configuration.modules": {
    id: "routes/configuration.modules",
    parentId: "routes/configuration",
    path: "modules",
    index: void 0,
    caseSensitive: void 0,
    module: route40
  },
  "routes/configuration.orchestration": {
    id: "routes/configuration.orchestration",
    parentId: "routes/configuration",
    path: "orchestration",
    index: void 0,
    caseSensitive: void 0,
    module: route41
  },
  "routes/configuration.version-history": {
    id: "routes/configuration.version-history",
    parentId: "routes/configuration",
    path: "version-history",
    index: void 0,
    caseSensitive: void 0,
    module: route42
  },
  "routes/profile.personal-information": {
    id: "routes/profile.personal-information",
    parentId: "root",
    path: "profile",
    index: void 0,
    caseSensitive: void 0,
    module: route43
  },
  "routes/profile.system-preferences": {
    id: "routes/profile.system-preferences",
    parentId: "routes/profile.personal-information",
    path: "system-preferences",
    index: void 0,
    caseSensitive: void 0,
    module: route44
  },
  "routes/profile.security": {
    id: "routes/profile.security",
    parentId: "routes/profile.personal-information",
    path: "security",
    index: void 0,
    caseSensitive: void 0,
    module: route45
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
