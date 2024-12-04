import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../common";
import { useSessionStore, useSwitchStore } from "../../stores";
import { LogoIcon, MenuIcon, CloseIcon, UserIcon } from "../icons";
import { useTransitionNavigation } from "../../hooks";
import { NavElement } from ".";

export function Navbar() {
  const session = useSessionStore((state) => state.session);
  const sessionRole = useSessionStore((state) => state.role);
  const closeSession = useSessionStore((state) => state.closeSession);

  const navLinks = [
    {
      text: "Mis Finanzas",
      href:
        sessionRole === "Cliente"
          ? "buyer"
          : sessionRole === "Inversor"
            ? "/"
            : "/",
    },
    {
      text: "Quienes somos",
      href: "/",
    },
    {
      text: "Contacto",
      href: "/profile",
    },
  ];

  const { role } = useSwitchStore();
  const [openMenu, setOpenMenu] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const navigate = useTransitionNavigation();

  return (
    <header className="flex py-2 px-6 lg:px-18 xl:px-24 gap-4 lg:gap-12 justify-between bg-contrast border-b-[3px] border-primary sticky top-0 w-full z-20">
      <Link
        to={"/"}
        onClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      >
        <LogoIcon className="aspect-square w-[40px] h-[40px] sm:w-[80px] sm:h-[80px] lg:w-[100px] lg:h-[100px]" />
      </Link>

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
            if (!session && text === "Mis Finanzas") return;
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
          {session ? (
            <section className="relative">
              <button
                onClick={() => setOpenProfileModal(!openProfileModal)}
                className="hidden md:flex flex-col items-center justify-center gap-1 text-primary hover:text-primaryVar1"
              >
                <UserIcon className=" size-12 " />
                <p className="text-body-medium-regular">Mi cuenta</p>
              </button>
              <article
                className={`${openProfileModal ? "md:opacity-100 md:translate-y-0 md:translate-x-0" : "md:-translate-y-20 md:translate-x-20 md:scale-0 md:opacity-0"} md:transition md:absolute md:-bottom-[6.5rem] md:right-7 md:border md:border-primary md:w-[150px] md:bg-white md:p-4 md:shadow-md flex flex-col gap-4 ease-out duration-300`}
              >
                <div
                  className="w-fit"
                  onClick={() => {
                    setOpenProfileModal(false);
                    setOpenMenu(false);
                  }}
                >
                  <NavElement
                    to={"/profile"}
                    activeClassname="capitalize"
                    notActiveClassname="capitalize"
                  >
                    Mi Perfil
                  </NavElement>
                </div>

                <button
                  className="text-base-color text-title-large-semi-bold md:text-title-medium-semi-bold hover:text-primary capitalize self-start"
                  type="button"
                  onClick={() => {
                    setOpenProfileModal(false);
                    setOpenMenu(false);
                    closeSession();
                    navigate("/", { replace: true });
                  }}
                >
                  Cerrar Sesión
                </button>
              </article>
            </section>
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
                    {role === "buyer"
                      ? "Solicitar financiamiento"
                      : "Quiero invertir"}
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
