import appStyles from "./styles/app.css?url";

import {
  isRouteErrorResponse,
  Meta,
  Links,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";

import ClientHeader from "./components/ClientHeader";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { SearchProvider } from "./search/SearchContext";

export function links() {
  return [{ rel: "stylesheet", href: appStyles }];
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <SearchProvider>
          <ClientHeader />
          <div className="app-layout">
            <Sidebar />
            <main className="app-main">
              <Outlet />
            </main>
          </div>
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
