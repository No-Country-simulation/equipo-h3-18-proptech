import { useSessionStore } from "../../stores/session/session.store";
import useTransitionNavigation from "../../hooks/useTransitionNavigation";
import { Outlet } from "react-router-dom";

function PrivatePages() {
  const session = useSessionStore((state) => state.session);
  const role = useSessionStore((state) => state.role);
  const navigate = useTransitionNavigation();
  if (!session || !role) {
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

export default PrivatePages;
