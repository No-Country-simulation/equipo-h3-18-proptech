import { Link } from "react-router-dom";
import { LogoIcon } from "../icons";

function Footer() {
  const user = true;

  const handleClick = () => {
    setTimeout(() => {
      document
        .getElementById("simulator")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="h-[280px] bg-tertiary">
      <div className=" h-[240px] bg-primary">
        <div className="flex justify-center ">
          <Link to={"/"}>
            <LogoIcon className="aspect-square w-[40px] h-[40px] sm:w-[80px] sm:h-[80px] lg:w-[140px] lg:h-[140px] rounded-lg my-6" />
          </Link>
        </div>
        <section className="flex  ">
          <div className="flex gap-4 w-fit flex-col flex-1 md:flex-auto md:flex-row md:gap-4 justify-center items-center">
            <Link
              to={"/"}
              className="text-contrast text-title-medium-semi-bold md:text-title-medium-semi-bold uppercase hover:text-secondary flex items-center"
            >
              Quienes somos
            </Link>
            <div className="hidden md:flex w-[2px] h-8 bg-secondary"></div>
            <Link
              to={"/"}
              className="text-contrast text-title-medium-semi-bold md:text-title-medium-semi-bold uppercase hover:text-secondary flex items-center"
            >
              Contacto
            </Link>
            <div className="hidden md:flex w-[2px] h-8 bg-secondary"></div>
            <Link
              to={"/"}
              onClick={handleClick}
              className="text-contrast text-title-medium-semi-bold md:text-title-medium-semi-bold uppercase hover:text-secondary flex items-center"
            >
              Simulador
            </Link>
            {user && (
              <>
                <div className="hidden md:flex w-[2px] h-8 bg-secondary"></div>
                <Link
                  to={"/profile"}
                  className="text-contrast text-title-medium-semi-bold md:text-title-medium-semi-bold uppercase hover:text-secondary flex items-center"
                >
                  Mis finanzas
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
