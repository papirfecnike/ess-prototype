import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function ControlOrderTracking() {
  return (
    <div className="page">
      <h1>Order tracking</h1>
      <p>Placeholder content</p>
    </div>
  );
}
