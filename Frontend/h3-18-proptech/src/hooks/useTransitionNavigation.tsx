import { NavigateOptions, To, useNavigate } from "react-router-dom";

function useTransitionNavigation() {
  const navigate = useNavigate();

  const viewTransitionHandler = (to: To, options?: NavigateOptions) => {
    if (!document.startViewTransition) {
      navigate(to, options);
    }
    document.startViewTransition(() => navigate(to, options));
  };
  return viewTransitionHandler;
}

export default useTransitionNavigation;
