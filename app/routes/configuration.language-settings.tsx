import type { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function ConfigLanguage() {
  return (
    <div className="page">
      <h1>Language configuration</h1>
      <p>Placeholder content</p>
    </div>
  );
}
