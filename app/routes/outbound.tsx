import { useNavigate } from "react-router";
import { Outlet } from "react-router";

export default function Outbound() {
  const navigate = useNavigate();

  return <Outlet />;
}