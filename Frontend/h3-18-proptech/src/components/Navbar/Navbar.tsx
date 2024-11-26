import Button from "../common/Button";
import NavElement from "./NavElement";
import UserIcon from "../common/UserIcon";
import { useSwitchStore } from "../../stores";

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
  const user = false;
  const {role} = useSwitchStore()

  return (
    <header className="flex py-5 px-24 gap-12 bg-contrast border-b-[3px] border-primary sticky top-0 w-full z-20">
      <img
        src="https://picsum.photos/130/130"
        alt="Logo"
        width={130}
        height={130}
        className="aspect-square"
      />
      <nav className="flex justify-between items-center w-full">
        <section className="flex gap-4">
          {navLinks.map(({ href, text }, index) => {
            if (!user && text === "Mis Finanzas") return;
            return (
              <div className="flex gap-4" key={text}>
                <NavElement to={href}>{text}</NavElement>
                {index < navLinks.length - 1 && (
                  <div className="w-1 bg-secondary"></div>
                )}
              </div>
            );
          })}
        </section>
        <section className="flex gap-6">
          {user ? (
            <button className="flex flex-col items-center justify-center gap-1">
              <UserIcon className="text-primary size-12" />
              <p className="text-body-medium-regular">Mi cuenta</p>
            </button>
          ) : (
            <>
              <Button
                size="medium"
                color="primary-orange"
                type="link"
                to="/register"
              >
                {role === 'buyer' ? 'Solicitar financiamiento' : 'Quiero invertir'}
              </Button>

              <Button
                size="small"
                color="secondary"
                type="link"
                to="/login"
              >
                Iniciar Sesión
              </Button>
            </>
          )}
        </section>
      </nav>
    </header>
  );
}

export default Navbar;
