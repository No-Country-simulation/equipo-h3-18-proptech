import { Outlet } from "react-router-dom";
import { useTransitionNavigation } from "../../../hooks";
import { useSessionStore } from "../../../stores";
import { Loader } from "../../../components/common";

export function RoleAdminAuth() {
  const role = useSessionStore((state) => state.role);
  const navigate = useTransitionNavigation();
  if (role && role !== "Administrador") {
    navigate("/login");
    return (
      <Loader/>
    );
  }

  return <Outlet />;
}

export default RoleAdminAuth;