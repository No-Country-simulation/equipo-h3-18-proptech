import { Outlet } from "react-router-dom";
import { useSessionStore } from "../../stores";
import { useTransitionNavigation } from "../../hooks";
import LoadingPage from "../LoadingPage";

export function PrivatePagesAuth() {
  const session = useSessionStore((state) => state.session);
  const role = useSessionStore((state) => state.role);
  const navigate = useTransitionNavigation();
  if (!session || !role) {
    navigate("/login");
    return (
      <LoadingPage background="contrast" size="page"/>
    );
  }
  return <Outlet />;
}

export default PrivatePagesAuth;
