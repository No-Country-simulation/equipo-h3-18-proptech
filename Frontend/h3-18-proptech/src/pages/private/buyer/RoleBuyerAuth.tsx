import { Outlet } from "react-router-dom";
import { useSessionStore } from "../../../stores/session/session.store";
import useTransitionNavigation from "../../../hooks/useTransitionNavigation";
import Loader from "../../../components/common/Loader";

function RoleBuyerAuth() {
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
