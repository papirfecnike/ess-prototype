import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function Profile() {
  return <h1>Profile</h1>;
}
