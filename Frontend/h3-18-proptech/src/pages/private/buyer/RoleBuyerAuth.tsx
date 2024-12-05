import { Outlet } from "react-router-dom";
import { useTransitionNavigation } from "../../../hooks";
import { Loader } from "../../../components/common";
import { useSessionStore } from "../../../stores";

export function RoleBuyerAuth() {
  const role = useSessionStore((state) => state.role);
  const navigate = useTransitionNavigation();
  if (role && role !== "Cliente") {
    navigate("/");
    return (
      <Loader/>
    );
  }

  return <Outlet />;
}

export default RoleBuyerAuth;