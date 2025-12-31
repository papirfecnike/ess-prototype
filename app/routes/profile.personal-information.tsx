import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function ProfilePersonal() {
  return (
    <div className="page">
      <h1>Personal information</h1>
      <p> insights and trends.</p>
    </div>
  );
}
