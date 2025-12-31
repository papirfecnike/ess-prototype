import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function ProfilePref() {
  return (
    <div className="page">
      <h1>Preferences</h1>
      <p> insights and trends.</p>
    </div>
  );
}
