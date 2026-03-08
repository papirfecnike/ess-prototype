import tokens from "./styles/tokens.css?url";
import base from "./styles/base.css?url";
import app from "./styles/app.css?url";
import layouts from "./styles/layouts.css?url";

import {
  Meta,
  Links,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";
import type { Route } from "./+types/root";

import ClientHeader from "./components/ClientHeader";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { SearchProvider } from "./search/SearchContext";

export function links() {
  return [
    { rel: "stylesheet", href: tokens },
    { rel: "stylesheet", href: base },
    { rel: "stylesheet", href: app },
    { rel: "stylesheet", href: layouts },
  ];
}

export default function App() {
  const location = useLocation();

  // ✅ DASHBOARD DETECTION
  const isDashboard = location.pathname === "/dashboard";

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <SearchProvider>
          <ClientHeader />

          {isDashboard ? (
            // ✅ DASHBOARD: NO SIDEBAR, NO GRID
            <main className="dashboard-shell">
              <Outlet />
            </main>
          ) : (
            // ✅ NORMAL APP LAYOUT
            <div className="app-layout">
              <Sidebar />
              <main className="app-main">
                <Outlet />
              </main>
            </div>
          )}

          <Footer />
        </SearchProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return (
    <main style={{ padding: 24 }}>
      <h1>Error</h1>
      <pre>{String(error)}</pre>
    </main>
  );
}
