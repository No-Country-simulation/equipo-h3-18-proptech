import { Outlet } from "react-router-dom";
import { useTransitionNavigation } from "../../../hooks";
import { useSessionStore } from "../../../stores";
import LoadingPage from "../../LoadingPage";

export function RoleInvestorAuth() {
  const role = useSessionStore((state) => state.role);
  const navigate = useTransitionNavigation();
  if (role && role !== "Inversor") {
    navigate("/login");
    return <LoadingPage background="contrast" size="page" />;
  }

  return <Outlet />;
}

export default RoleInvestorAuth;
