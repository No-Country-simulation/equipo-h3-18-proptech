import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput, PasswordInput, Button } from "../../../components/common";
import { useSwitchStore } from "../../../stores";
import { userSchema } from "./models/userSchema";
import { HeaderHome } from "../../../components/Home";
import { Link } from "react-router-dom";

interface UserForm {
  name: string;
  lastname: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function RegisterPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserForm>({
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(userSchema),
  });

  const role = useSwitchStore((state) => state.role);

  const visibleRole = role === "buyer" ? "Comprador" : "Inversor";

  const onSubmit = (data: FieldValues) => {
    const userRole = role === "buyer" ? "Cliente" : "Inversor"
    data.role = userRole
    console.log(data);
    // Envío de Formulario al Backend
  };
  return (
    <section className="flex-1 bg-tertiary px-6 py-4">
      <HeaderHome />
      <section className="flex flex-col md:flex-row gap-10 justify-evenly pt-4">
        <aside className="flex flex-col">
          <h2 className="text-headline-medium-medium mb-7">
            {visibleRole === "Comprador"
              ? "Regístrate para financiar tu terreno"
              : "Regístrate para comenzar a invertir"}
          </h2>
          <p className="text-title-large-regular max-w-[36ch] mb-7">
            {visibleRole === "Comprador"
              ? "Abre tu cuenta y accede a opciones de financiación flexibles para adquirir el terreno que siempre quisiste."
              : "Crea tu cuenta y descubre cómo hacer crecer tu capital invirtiendo en oportunidades de financiación seguras y rentables."}
          </p>
          <img
            className="w-[300px] h-[240px] md:w-[409px] md:h-[320px] self-center md:self-auto"
            src="https://picsum.photos/409/320"
            alt={`Regístrate como ${visibleRole}`}
          />
          <span className="text-title-large-semi-bold mt-6 hidden md:flex md:gap-2 ">
            ¿Ya tienes una cuenta?{" "}
            <Link to={"/login"} className="flex mt-2 md:mt-0 md:inline text-title-large-bold hover:text-secondary transition-colors">
              Iniciar Sesión
            </Link>
          </span>
        </aside>

        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            register={register}
            label="Nombre*"
            name="name"
            error={errors.name}
          />
          <TextInput
            register={register}
            label="Apellido*"
            name="lastname"
            error={errors.lastname}
          />
          <TextInput
            register={register}
            label="Correo Electrónico*"
            name="email"
            type="email"
            error={errors.email}
          />
          <TextInput
            register={register}
            label="Teléfono*"
            name="phone"
            type="tel"
            error={errors.phone}
          />

          <PasswordInput
            register={register}
            label="Contraseña*"
            name="password"
            info="Utiliza al menos 8 caracteres, combinando letras mayúsculas y minúsculas, números y caracteres especiales (@, #, $, %)."
            error={errors.password}
          />

          <PasswordInput
            register={register}
            label="Confirmar Contraseña*"
            name="confirmPassword"
            error={errors.confirmPassword}
          />

          <Button
            color="primary-blue"
            size="large"
            type="submit"
            classname="self-center md:self-auto"
          >
            {`Registrarme como ${visibleRole}`}
          </Button>
          <small className="text-body-small-regular-10 font-lato mt-1">
            *Todos los campos son obligatorios.
          </small>
          <span className="text-title-medium-semi-bold mt-2 flex gap-2 md:gap-0 md:hidden items-center justify-center">
            ¿Ya tienes una cuenta?{" "}
            <Link to={"/login"} className="flex text-title-medium-bold text-secondary transition-colors">
              Iniciar Sesión
            </Link>
          </span>
        </form>
      </section>
    </section>
  );
}

export default RegisterPage;
