import { useSessionStore } from "../../stores/session/session.store";
import useTransitionNavigation from "../../hooks/useTransitionNavigation";
import { Outlet } from "react-router-dom";
import Loader from "../../components/common/Loader";

function PrivatePages() {
  const session = useSessionStore((state) => state.session);
  const role = useSessionStore((state) => state.role);
  const navigate = useTransitionNavigation();
  if (!session || !role) {
    navigate("/");
    return (
      <Loader/>
    );
  }
  return <Outlet />;
}

export default PrivatePages;
