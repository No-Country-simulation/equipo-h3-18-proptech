import { Link } from "react-router-dom";
import { LogoIcon } from "../icons";
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
    <div className="sm:h-[280px] bg-tertiary z-10">
      <div className=" sm:h-[240px] bg-primary">
        <div className="flex justify-center ">
          <Link
            to={"/"}
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            <LogoIcon className="aspect-square w-[80px] h-[80px] lg:w-[140px] lg:h-[140px] rounded-lg my-6" />
          </Link>
        </div>
        <section className="flex">
          <div className="flex gap-4 w-fit flex-col flex-1 pb-4 md:flex-auto md:flex-row md:gap-4 md:mb-0 justify-center items-center">
            <Link
              to={"/"}
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
              className="transition-colors text-contrast text-title-medium-semi-bold md:text-title-medium-semi-bold uppercase hover:text-secondary flex items-center"
            >
              Quienes somos
            </Link>
            <div className="hidden md:flex w-[2px] h-8 bg-secondary"></div>
            <Link
              to={"/"}
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
                goToSimulator();
              }}
              className="transition-colors text-contrast text-title-medium-semi-bold md:text-title-medium-semi-bold uppercase hover:text-secondary flex items-center"
            >
              Simulador
            </Link>
            {session && (
              <>
                <div className="hidden md:flex w-[2px] h-8 bg-secondary"></div>
                <Link
                  to={userAditionalRoute}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(userAditionalRoute);
                  }}
                  className="transition-colors text-contrast text-title-medium-semi-bold md:text-title-medium-semi-bold uppercase hover:text-secondary flex items-center"
                >
                  {sessionRole === "Administrador"
                    ? "Gestión de Usuarios"
                    : "Mis Finanzas"}
                </Link>
              </>
            )}
          </div>
        </section>
      </div>
      <h4 className=" text-body-medium-regular text-center leading-10">
        Todos los derechos reservados
      </h4>
    </div>
  );
}

export default Footer;
