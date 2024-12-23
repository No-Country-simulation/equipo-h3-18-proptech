import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { TextInput, PasswordInput, Button } from "../../../components/common";
import { useSessionStore, useSwitchStore } from "../../../stores";
import { registerSchema } from "./models";
import { HeaderHome } from "../../landing/components";
import { useTransitionNavigation } from "../../../hooks";
import { authRegister } from "../../../services";
import { RegisterUser } from "../../../interfaces";

interface RegisterForm {
  name: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function RegisterPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterForm>({
    defaultValues: {
      name: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const role = useSwitchStore((state) => state.role);
  const newSession = useSessionStore((state) => state.newSession);
  const [isSendingForm, setIsSendingForm] = useState(false)
  const visibleRole = role === "buyer" ? "Comprador" : "Inversor";

  const onSubmit = (data: RegisterForm) => {
    const userRole = role === "buyer" ? "Cliente" : "Inversor";
    const formData = {
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      rol: userRole,
      username: data.email,
    };
    setIsSendingForm(true)
    authRegister(formData as RegisterUser).then((response) => {
      if (response && response.status < 300) {
        newSession(response.data.token);
        toast.success("Usuario registrado exitosamente");
        navigate("/validate-identity");
      } else {
        setIsSendingForm(false)
        if (response?.data) toast.error(response.data);
        else {
          toast.error("Ha ocurrido un error al iniciar sesión");
        }
      }
    });
  };
  const navigate = useTransitionNavigation();
  return (
    <section className="flex-1 bg-tertiary px-6 pb-4">
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
            src={visibleRole === "Comprador" ? "/assets/registerbuyer.webp" : "/assets/registerinvestor.webp"}
            alt={`Regístrate como ${visibleRole}`}
          />
          <span className="text-title-large-semi-bold mt-6 hidden md:flex md:gap-2 ">
            ¿Ya tienes una cuenta?{" "}
            <Link
              to={"/login"}
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
              className="flex mt-2 md:mt-0 md:inline text-title-large-bold hover:text-secondary transition-colors"
            >
              Iniciar Sesión
            </Link>
          </span>
        </aside>

        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            register={register}
            label="Nombre"
            name="name"
            error={errors.name}
          />
          <TextInput
            register={register}
            label="Apellido"
            name="lastName"
            error={errors.lastName}
          />
          <TextInput
            register={register}
            label="Correo Electrónico"
            name="email"
            type="email"
            error={errors.email}
          />
          <TextInput
            register={register}
            label="Teléfono"
            name="phoneNumber"
            type="tel"
            error={errors.phoneNumber}
          />

          <PasswordInput
            register={register}
            label="Contraseña"
            name="password"
            info="Utiliza al menos 8 caracteres, combinando letras mayúsculas y minúsculas, números y caracteres especiales (@, #, $, %)."
            error={errors.password}
          />

          <PasswordInput
            register={register}
            label="Confirmar Contraseña"
            name="confirmPassword"
            error={errors.confirmPassword}
          />

          <Button
            color="primary-blue"
            size="large"
            type="submit"
            classname="self-center md:self-auto"
            isLoading={isSendingForm}
          >
            {`Registrarme como ${visibleRole}`}
          </Button>
          <small className="text-body-small-regular-10 font-lato mt-1">
            *Todos los campos son obligatorios.
          </small>
          <span className="text-title-medium-semi-bold mt-2 flex-col flex gap-2 md:gap-0 md:hidden items-center justify-center">
            ¿Ya tienes una cuenta?{" "}
            <Button
              size="large"
              type="link"
              color="primary-orange"
              to={"/login"}
            >
              Iniciar Sesión
            </Button>
          </span>
        </form>
      </section>
    </section>
  );
}

export default RegisterPage;
