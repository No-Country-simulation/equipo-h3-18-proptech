import React from "react";
import { NavLink } from "react-router-dom";

export interface SideBarElementProps {
  children: string;
  to: string;
  withWarn: boolean;
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  isOpen: boolean;
}

const SideBarElement = ({
  children,
  to,
  withWarn,
  Icon,
  isOpen,
}: SideBarElementProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? `relative flex items-center justify-center w-full bg-tertiary text-base-color cursor-pointer transition gap-2 px-1 rounded-xl py-3 ${isOpen && "md:justify-start"}`
          : `relative flex items-center justify-center w-full bg-primary hover:bg-tertiary hover:text-base-color transition gap-2 px-1 rounded-xl py-3 ${isOpen && "md:justify-start"}`
      }
    >
      {<Icon className={`w-7 h-7`} />}
      {withWarn && (
        <>
          <div
            className={`absolute justify-center items-center h-6 w-6 rounded-full bg-secondary self-center right-1 text-body-medium-regular text-contrast hidden ${isOpen && "md:flex"}`}
          >
            !
          </div>
          <div
            className={`absolute justify-center items-center h-3 w-3 rounded-full bg-secondary top-[2px] right-[2px]  ${isOpen && "md:hidden"}`}
          ></div>
        </>
      )}
      <span className={`hidden ${isOpen && "md:flex"}`}>{children}</span>
    </NavLink>
  );
};

export default SideBarElement;
