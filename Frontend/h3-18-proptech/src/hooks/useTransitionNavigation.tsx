import { To, useNavigate } from "react-router-dom";

function useTransitionNavigation() {
  const navigate = useNavigate();

  const viewTransitionHandler = (to: To) => {
    if (!document.startViewTransition) {
      navigate(to);
    }
    document.startViewTransition(() => navigate(to));
  };
  return viewTransitionHandler;
}

export default useTransitionNavigation;
