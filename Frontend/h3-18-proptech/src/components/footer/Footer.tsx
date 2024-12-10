import { Link } from "react-router-dom";
import { LogoIcon, MailIcon, TelephoneIcon, WorldIcon } from "../icons";
import { useSessionStore, useSwitchStore } from "../../stores";
import { useTransitionNavigation } from "../../hooks";

export function Footer() {
  const session = useSessionStore((state) => state.session);
  const sessionRole = useSessionStore((state) => state.role);
  const setRole = useSwitchStore((state) => state.setRole);

  const navigate = useTransitionNavigation();

  const userAditionalRoute =
    sessionRole === "Cliente"
      ? "/buyer"
      : sessionRole === "Administrador"
        ? "/admin"
        : "/profile";

  const goToSimulator = () => {
    setTimeout(() => {
      sessionRole === "Cliente" && setRole("buyer");
      sessionRole === "Inversor" && setRole("investor");
      document
        .getElementById("simulator")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <article className="bg-tertiary z-10">
      <section className=" bg-primary flex flex-col md:flex-row items-center gap-y-4 gap-x-8 px-4 pb-6 md:pb-0 md:px-6 lg:px-16">
        <Link
          to={"/"}
          className="flex justify-center"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <LogoIcon className="aspect-square w-[100px] h-[100px] md:w-[140px] md:h-full rounded-lg my-6" />
        </Link>
        <section className="flex flex-col items-center gap-y-8 gap-x-8 justify-center flex-1">
          <div className="flex gap-4 w-full flex-col flex-1 sm:flex-row md:gap-8 lg:gap-10 justify-center items-center">
            <Link
              to={"/"}
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
              className="transition-colors text-contrast text-title-medium-semi-bold md:text-title-medium-semi-bold capitalize hover:text-secondary flex items-center"
            >
              Quienes somos
            </Link>
            <div className="hidden sm:flex w-[2px] h-8 bg-secondary"></div>
            <Link
              to={"/"}
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
                goToSimulator();
              }}
              className="transition-colors text-contrast text-title-medium-semi-bold md:text-title-medium-semi-bold capitalize hover:text-secondary flex items-center"
            >
              Simulador
            </Link>
            {session && (
              <>
                <div className="hidden sm:flex w-[2px] h-8 bg-secondary"></div>
                <Link
                  to={userAditionalRoute}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(userAditionalRoute);
                  }}
                  className="transition-colors text-contrast text-title-medium-semi-bold md:text-title-medium-semi-bold capitalize hover:text-secondary flex items-center"
                >
                  {sessionRole === "Administrador"
                    ? "Gestión de Usuarios"
                    : "Mis Finanzas"}
                </Link>
              </>
            )}
          </div>
          <ul className="flex gap-4 w-full flex-col flex-1 sm:flex-row md:gap-5 lg:gap-8 justify-center items-center">
            <li className="transition-colors text-contrast text-title-medium-semi-bold md:text-title-medium-semi-bold capitalize flex items-center gap-2">
              <TelephoneIcon className="w-6 h-6" />
              <span>123 456 789</span>
            </li>
            <li className="hidden sm:flex w-[2px] h-8 bg-secondary"></li>
            <li className="transition-colors text-contrast text-title-medium-semi-bold md:text-title-medium-semi-bold lowercase flex items-center gap-2">
              <MailIcon className="w-6 h-6" />
              <span>financia.al@info.com</span>
            </li>
            <li className="hidden sm:flex w-[2px] h-8 bg-secondary"></li>
            <li className="transition-colors text-contrast text-title-medium-semi-bold md:text-title-medium-semi-bold capitalize flex items-center gap-2">
              <WorldIcon className="w-5 h-5" />
              <span>Dirección 123 - Argentina</span>
            </li>
          </ul>
        </section>
      </section>
      <h4 className=" text-body-medium-regular text-center leading-10">
        Todos los derechos reservados
      </h4>
    </article>
  );
}

export default Footer;
