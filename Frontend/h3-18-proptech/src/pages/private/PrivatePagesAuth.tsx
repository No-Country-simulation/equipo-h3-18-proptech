import { Outlet } from "react-router-dom";
import { useSessionStore } from "../../stores";
import { useTransitionNavigation } from "../../hooks";
import { Loader } from "../../components/common";

export function PrivatePagesAuth() {
  const session = useSessionStore((state) => state.session);
  const role = useSessionStore((state) => state.role);
  const navigate = useTransitionNavigation();
  if (!session || !role) {
    navigate("/login");
    return (
      <Loader/>
    );
  }
  return <Outlet />;
}

export default PrivatePagesAuth;
