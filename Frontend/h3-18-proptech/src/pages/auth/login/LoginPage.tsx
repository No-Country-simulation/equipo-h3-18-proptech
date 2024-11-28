import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormValues, schema } from "./models/Login.model";
import { Button, PasswordInput, TextInput } from "../../../components/common";
import { useSwitchStore } from "../../../stores";
import { authLogin } from "../../../services/auth";

export const LoginPage = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const role = useSwitchStore((state) => state.role);
  const visibleRole = role === "buyer" ? "Comprador" : "Inversor";
  const setBuyer = useSwitchStore((state) => state.setBuyer);
  const setInvestor = useSwitchStore((state) => state.setInvestor);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    authLogin(data).then((response) => console.log(response));
  };

  return (
    <section className="flex flex-col md:flex-row gap-x-20 justify-center flex-1 bg-tertiary items-center p-8">
      <aside className="flex flex-col">
        <h2 className="text-headline-medium-medium mb-7">
          {visibleRole === "Comprador"
            ? "Solicita tu financiamiento"
            : "Accede a tus oportunidades de inversión"}
        </h2>
        <p className="text-title-large-regular md:max-w-[36ch] mb-7">
          {visibleRole === "Comprador"
            ? "Explora opciones accesibles, personaliza tus condiciones y da el primer paso hacia tu lote ideal."
            : "Gestiona tus proyectos, analiza métricas clave y encuentra nuevas posibilidades para hacer crecer tu portafolio."}
        </p>
        <footer className="flex-col hidden md:flex">
          <span className="text-title-large-semi-bold mb-8">
            ¿Aún no tienes cuenta? Comienza tu registro aquí.
          </span>
          <div className="w-fit" onClick={() => setBuyer()}>
            <Button
              color="primary-orange"
              size="large"
              type="link"
              to={"/register"}
              classname="mb-4 self-center md:self-auto"
            >
              Quiero una financiación
            </Button>
          </div>
          <div className="w-fit" onClick={() => setInvestor()}>
            <Button
              color="primary-orange"
              size="large"
              type="link"
              to={"/register"}
              classname="mb-4 self-center md:self-auto"
            >
              Quiero invertir
            </Button>
          </div>
        </footer>
      </aside>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <TextInput
          register={register}
          name="email"
          type="email"
          label="Correo Electrónico"
          error={errors.email}
        />
        <PasswordInput
          register={register}
          name="password"
          label="Contraseña"
          error={errors.password}
        />

        <Button
          type="submit"
          color="primary-blue"
          size="large"
          classname="mt-4 self-center md:self-auto"
        >
          Iniciar sesión
        </Button>
        <span className="text-title-small-bold mt-2 hover:text-secondary transition-colors">
          ¿Olvidaste la contraseña?
        </span>
        <footer className="flex-col flex md:hidden">
          <span className="text-title-large-semi-bold mb-8 text-center md:text-start mt-6 md:mt-0">
            ¿Aún no tienes cuenta? Comienza tu registro aquí.
          </span>
          <div className="w-fit" onClick={() => setBuyer()}>
            <Button
              color="primary-orange"
              size="large"
              type="link"
              to={"/register"}
              classname="mb-4 self-center md:self-auto"
            >
              Quiero una financiación
            </Button>
          </div>
          <div className="w-fit" onClick={() => setInvestor()}>
            <Button
              color="primary-orange"
              size="large"
              type="link"
              to={"/register"}
              classname="mb-4 self-center md:self-auto"
            >
              Quiero invertir
            </Button>
          </div>
        </footer>
      </form>
    </section>
  );
};

export default LoginPage;
