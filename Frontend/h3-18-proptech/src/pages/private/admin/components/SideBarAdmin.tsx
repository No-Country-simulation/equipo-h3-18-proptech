import { useState } from "react";
import {
  ApproveLoanIcon,
  InvestStatusIcon,
  LoanStatusIcon,
  MenuIcon,
  ValidateUserIcon,
} from "../../../../components/icons";
import SideBarElement from "./SideBarElement";

export function SideBarAdmin() {
  // const [validateWarn, setValidateWarn] = useState(false)
  // navData[0].withWarn=validateWarn
  // const [approveWarn, setApproveWarn] = useState(false)
  // navData[1].withWarn=approveWarn

  const [isOpen, setIsOpen] = useState(true)

  const navData = [
    {
      children: "Validar Identidad",
      to: "validate",
      withWarn: true,
      Icon: ValidateUserIcon,
    },
    {
      children: "Aprobar préstamos",
      to: "approve",
      withWarn: true,
      Icon: ApproveLoanIcon,
    },
    {
      children: "Estado de préstamos",
      to: "loans",
      withWarn: false,
      Icon: LoanStatusIcon,
    },
    {
      children: "Estado de inversiones",
      to: "investors",
      withWarn: false,
      Icon: InvestStatusIcon,
    },
  ];

  return (
    <aside className={`w-[60px] bg-primary text-contrast flex flex-col gap-y-4 py-6 px-2 shadow-lg shadow-tertiary ${isOpen && "md:w-full md:max-w-[260px] md:ps-3 md:pe-2"} transition-transform select-none`}>
      <header className={`flex gap-2 px-1 items-center justify-center ${isOpen && "md:justify-start"}`}>
        <button onClick={() => setIsOpen(!isOpen)}>
          <MenuIcon className="h-7 w-7" />
        </button>
        <h4 className={`hidden text-title-large-semi-bold ${isOpen && "md:flex"}`}>Gestión de Usuarios</h4>
      </header>
      <hr className="mb-1" />
      <nav className={`flex flex-col gap-4`}>
        {navData.map(({ children, to, withWarn, Icon }) => (
          <SideBarElement
            key={to}
            children={children}
            to={to}
            withWarn={withWarn}
            Icon={Icon}
            isOpen={isOpen}
          />
        ))}
      </nav>
    </aside>
  );
}

export default SideBarAdmin;
