import { NavLink, To } from "react-router-dom";
import { useTransitionNavigation } from "../../hooks";

interface Props {
  to: To;
  children: string;
  activeClassname?: string;
  notActiveClassname?: string;
}

export function NavElement({
  to,
  children,
  activeClassname,
  notActiveClassname,
}: Props) {
  const navigate = useTransitionNavigation();
  return (
    <NavLink
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
      }}
      to={to}
      className={({ isActive }) =>
        isActive
          ? `${activeClassname} text-secondary text-title-large-semi-bold md:text-title-medium-semi-bold uppercase hover:text-primary`
          : `${notActiveClassname} text-base-color text-title-large-semi-bold md:text-title-medium-semi-bold uppercase hover:text-primary`
      }
    >
      {children}
    </NavLink>
  );
}

export default NavElement;
