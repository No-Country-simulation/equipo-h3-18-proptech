import { NavLink, To } from "react-router-dom";

interface Props {
  to: To;
  children: string;
  activeClassname?: string;
  notActiveClassname?: string;
}

function NavElement({ to, children, activeClassname, notActiveClassname }: Props) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? `${activeClassname} text-secondary text-title-large-semi-bold md:text-title-medium-semi-bold uppercase md:hover:text-primary` : `${notActiveClassname} text-base-color text-title-large-semi-bold md:text-title-medium-semi-bold uppercase hover:text-primary`
      }
    >
      {children}
    </NavLink>
  );
}

export default NavElement;
