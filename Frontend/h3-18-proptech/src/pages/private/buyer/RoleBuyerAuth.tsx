import { Outlet } from "react-router-dom";
import { useSessionStore } from "../../../stores/session/session.store";
import useTransitionNavigation from "../../../hooks/useTransitionNavigation";

function RoleBuyerAuth() {
  const role = useSessionStore((state) => state.role);
  const navigate = useTransitionNavigation();
  if (role && role !== "Cliente") {
    navigate("/");
    return (
      <div className="flex-1 flex items-center justify-center">
        {" "}
        <h1 className="text-title-large-semi-bold">No Autorizado</h1>
      </div>
    );
  }

  return <Outlet />;
}

export default RoleBuyerAuth;
