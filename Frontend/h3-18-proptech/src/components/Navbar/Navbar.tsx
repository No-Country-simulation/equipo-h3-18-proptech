import Button from "../common/Button";
import NavElement from "./NavElement";
import UserIcon from "../icons/UserIcon";
import MenuIcon from "../icons/MenuIcon";
import { useState } from "react";
import CloseIcon from "../icons/CloseIcon";

const navLinks = [
  {
    text: "Mis Finanzas",
    href: "/register",
  },
  {
    text: "Quienes somos",
    href: "/",
  },
  {
    text: "Contacto",
    href: "/login",
  },
];

function Navbar() {
  const user = true;
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="flex py-3 md:py-5 px-6 lg:px-18 xl:px-24 gap-4 lg:gap-12 justify-between bg-contrast border-b-[3px] border-primary sticky top-0 w-full z-20">
      <img
        src="https://picsum.photos/130/130"
        alt="Logo"
        className="aspect-square w-[40px] h-[40px] sm:w-[80px] sm:h-[80px] lg:w-[130px] lg:h-[130px]"
      />

      <button className="flex md:hidden" onClick={() => setOpenMenu(true)}>
        <MenuIcon className="w-6 h-6 self-center" />
      </button>

      <nav
        className={`${openMenu ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 scale-0 translate-x-80 -translate-y-80"} transition ease-out duration-300 md:transition-none absolute top-0 right-0 flex flex-col bg-white p-4 pb-8 h-screen z-30 justify-between border-s-2 w-screen border-primary md:flex md:relative md:flex-row md:justify-between md:items-center md:w-full md:z-auto md:p-0 md:h-auto md:border-0 md:scale-100 md:opacity-100 md:translate-x-0 md:translate-y-0 `}
      >
        <header className="flex flex-col md:hidden relative">
          <button
            className="flex md:hidden w-fit absolute top-1 right-1 h-fit"
            onClick={() => setOpenMenu(false)}
          >
            <CloseIcon className="w-6 h-6" />
          </button>
          <h3 className=" text-headline-medium-medium">Menú</h3>
          <hr className="bg-primary my-4" />
        </header>

        <section className="flex flex-col flex-1 md:flex-auto md:flex-row gap-6 md:gap-4">
          {navLinks.map(({ href, text }, index) => {
            if (!user && text === "Mis Finanzas") return;
            return (
              <div
                className="flex gap-4 w-fit"
                key={text}
                onClick={() => setOpenMenu(false)}
              >
                <NavElement to={href}>{text}</NavElement>
                {index < navLinks.length - 1 && (
                  <div className="hidden md:flex w-1 bg-secondary"></div>
                )}
              </div>
            );
          })}
        </section>

        <section className="flex flex-col">
          <hr className="flex md:hidden my-4 bg-primary" />
          {user ? (
            <button className="flex flex-col items-center justify-center gap-1">
              <UserIcon className="text-primary size-12" />
              <p className="text-body-medium-regular">Mi cuenta</p>
            </button>
          ) : (
            <>
              <section className="flex gap-x-4 lg:gap-x-8 gap-y-6 flex-col md:flex-row">
                <div onClick={() => setOpenMenu(false)}>
                  <Button
                    size="medium"
                    color="primary-orange"
                    type="link"
                    to="/register"
                    classname="min-w-full md:min-w-0"
                  >
                    Solicitar Financiamiento
                  </Button>
                </div>

                <div onClick={() => setOpenMenu(false)}>
                  <Button
                    size="small"
                    color="secondary"
                    type="link"
                    to="/login"
                    classname="min-w-full md:min-w-0"
                  >
                    Iniciar Sesión
                  </Button>
                </div>
              </section>
            </>
          )}
        </section>
      </nav>
    </header>
  );
}

export default Navbar;
