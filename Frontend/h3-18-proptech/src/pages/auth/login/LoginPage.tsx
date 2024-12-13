import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button, PasswordInput, TextInput } from "../../../components/common";
import { useSessionStore, useSwitchStore } from "../../../stores";
import { useTransitionNavigation } from "../../../hooks";
import { authLogin } from "../../../services";
import { FormValues, loginSchema } from "./models";
import { useEffect, useState } from "react";

export const LoginPage = () => {
  const session = useSessionStore((state) => state.session);
  const role = useSessionStore((state) => state.role);
  const navigate = useTransitionNavigation();

  useEffect(() => {
    if (session && role === "Cliente") {
      navigate("/buyer");
    }
    if (session && role === "Inversor") {
      navigate("/investor");
    }
    if (session && role === "Administrador") {
      navigate("/admin");
    }
  }, []);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const setRole = useSwitchStore((state) => state.setRole);
  const newSession = useSessionStore((state) => state.newSession);

  const [isSendingForm, setIsSendingForm] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSendingForm(true);
    const response = await authLogin(data);
    if (response && response.status < 300) {
      const role = newSession(response.data.token);
      toast.success("Sesión iniciada exitosamente");
      setIsSendingForm(false);
      role === "Cliente" && navigate("/buyer");
      role === "Inversor" && navigate("/investor");
      role === "Administrador" && navigate("/admin");
    } else {
      setIsSendingForm(false);
      if (response?.data) toast.error(response.data);
      else {
        toast.error("Ha ocurrido un error al iniciar sesión");
      }
    }
  };

  return (
    <section className="flex flex-col md:flex-row gap-x-20 justify-center flex-1 bg-tertiary items-center px-8 py-8 md:py-20">
      <aside className="flex flex-col">
        <h2 className="text-headline-medium-medium mb-7">Iniciar sesión</h2>
        <p className="text-title-large-regular md:max-w-[36ch] mb-7">
          Accede a tu cuenta para continuar gestionando tu información y
          realizar tus actividades de manera rápida y segura. Todo en un mismo
          lugar.
        </p>
        <footer className="flex-col hidden md:flex">
          <span className="text-title-large-semi-bold mb-8">
            ¿Aún no tienes cuenta? Comienza tu registro aquí.
          </span>
          <Button
            color="primary-orange"
            size="large"
            classname="mb-4 self-center md:self-auto"
            type="button"
            onClick={() => {
              setRole("buyer");
              navigate("/register");
            }}
          >
            Quiero una financiación
          </Button>
          <Button
            color="primary-orange"
            size="large"
            classname="mb-4 self-center md:self-auto"
            type="button"
            onClick={() => {
              setRole("investor");
              navigate("/register");
            }}
          >
            Quiero invertir
          </Button>
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
          isLoading={isSendingForm}
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
          <Button
            color="primary-orange"
            size="large"
            classname="mb-4 self-center md:self-auto"
            type="button"
            onClick={() => {
              setRole("buyer");
              navigate("/register");
            }}
          >
            Quiero una financiación
          </Button>
          <Button
            color="primary-orange"
            size="large"
            classname="mb-4 self-center md:self-auto"
            type="button"
            onClick={() => {
              setRole("investor");
              navigate("/register");
            }}
          >
            Quiero invertir
          </Button>
        </footer>
      </form>
    </section>
  );
};

export default LoginPage;
