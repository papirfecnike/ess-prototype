import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function ControlUserMgmt() {
  return (
    <div className="page">
      <h1>User management</h1>
      <p>Placeholder content</p>
    </div>
  );
}
