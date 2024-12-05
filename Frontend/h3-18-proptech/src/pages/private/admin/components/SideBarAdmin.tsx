// import { useState } from "react";
import { NavLink } from "react-router-dom";

export function SideBarAdmin() {
  // const [validateWarn, setValidateWarn] = useState(false)
  // navData[0].withWarn=validateWarn
  // const [approveWarn, setApproveWarn] = useState(false)
  // navData[1].withWarn=approveWarn

  return (
    <div className=" h-full left-0 w-[260px] bg-primary text-contrast fixed pt-14">
      {navData.map(({ children, to, withWarn }) => (
        <NavigationButton
          key={to}
          children={children}
          to={to}
          withWarn={withWarn}
        />
      ))}
    </div>
  );
}

export default SideBarAdmin;

interface NavProps {
  children: string;
  to: string;
  withWarn: boolean;
}

const NavigationButton = ({ children, to, withWarn }: NavProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "relative flex items-center pl-6 w-full h-14 bg-tertiary text-base-color cursor-default"
          : "relative flex items-center pl-6 w-full h-14 bg-primary hover:bg-tertiary hover:text-base-color"
      }
    >
      {withWarn && (
        <div className="absolute w-4 h-4 bg-secondary rounded-lg top-2 right-4"></div>
      )}
      {children}
    </NavLink>
  );
};

const navData: NavProps[] = [
  { children: "Validar Identidad", to: "validate", withWarn: true },
  { children: "Aprobar préstamos", to: "approve", withWarn: true },
  { children: "Estado de préstamos", to: "loans", withWarn: false },
  { children: "Estado de inversiones", to: "investors", withWarn: false },
];
