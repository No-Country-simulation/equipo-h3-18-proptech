import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Loader, TextInput } from "../../../components/common";
import { CheckIcon, PencilIcon } from "../../../components/icons";
import { UserProfile } from "../../../interfaces";
import { profileSchema } from "./models";
import { useTransitionNavigation } from "../../../hooks";
import { useSessionStore } from "../../../stores";
import { getUserbyToken, updateEmailPhone } from "../../../services";

export function ProfilePage() {
  const {
    register,
    formState: { errors },
    reset,
    watch,
    handleSubmit,
  } = useForm<UserProfile>({
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      cuit: "",
      dni: "",
    },
    resolver: zodResolver(profileSchema),
  });

  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const [userData, setUserData] = useState<UserProfile>();
  const [readOnlyEmail, setReadOnlyEmail] = useState(true);
  const [readOnlyPhoneNumber, setReadOnlyPhoneNumber] = useState(true);

  const newSession = useSessionStore((state) => state.newSession);
  const navigate = useTransitionNavigation();

  useEffect(() => {
    window.scrollTo(0, 0);
    getUserbyToken().then((response) => {
      if (response && response?.status < 300) {
        setUserData(response.data);
        reset(response.data);
        setLoading(false);
        setReload(false);
      } else {
        toast.error("Ha ocurrido un error al obtener sus datos");
        navigate("/");
      }
    });
  }, [reload]);

  const onSubmit = async (data: UserProfile) => {
    updateEmailPhone({ email: data.email, phoneNumber: data.phoneNumber }).then(
      (response) => {
        if (response && response.status < 300) {
          newSession(response.data.token);
          toast.success(response.data.message ?? "Datos actualizados exitosamente");
          setReload(true);
        } else {
          toast.error("Ha ocurrido un error al actualizar los datos");
        }
      }
    );
  };

  const formUpdated =
    watch("phoneNumber") !== userData?.phoneNumber ||
    watch("email") !== userData?.email
      ? true
      : false;

  return loading ? (
    <Loader />
  ) : (
    <section className="flex-1 flex flex-col gap-8 bg-background px-4 md:px-10 py-6">
      <header className="flex flex-col sm:flex-row gap-y-4 justify-between sm:px-10">
        <h1 className="text-headline-large-medium text-center sm:text-start">
          Mi Perfil
        </h1>
        <Button
          size={"large"}
          color={"primary-orange"}
          classname="self-center sm:self-auto hidden sm:flex items-center justify-center"
        >
          Solicitar Financiamiento
        </Button>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-w-[1000px] mx-auto bg-contrast shadow-md shadow-tertiary px-4 sm:px-3 md:px-6 lg:px-10 py-6 rounded-lg"
      >
        <header className="flex justify-between items-center">
          <h1 className="text-title-large-regular">Información Personal</h1>
          {userData?.stateValidation == 2 && (
            <div className="text-title-large-bold flex gap-4 items-center">
              <span className="hidden sm:flex">Usuario validado</span>
              <CheckIcon className="w-8 h-8 rounded-full p-1 bg-success text-white" />
            </div>
          )}
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-5 px-4 w-full">
          <TextInput
            register={register}
            label="Nombre"
            name="name"
            error={errors.name}
            readonly={true}
          />
          <TextInput
            register={register}
            label="Apellido"
            name="lastName"
            error={errors.lastName}
            readonly={true}
          />
          {userData?.dni && userData.stateValidation === 2 && (
            <TextInput
              register={register}
              label="DNI"
              name="dni"
              error={errors.dni}
              readonly={true}
            />
          )}
          {userData?.cuit && userData.stateValidation === 2 && (
            <TextInput
              register={register}
              label="CUIT"
              name="cuit"
              error={errors.cuit}
              readonly={true}
            />
          )}
          <div className="grid sm:grid-cols-[1fr_0.1fr] gap-2 relative">
            <TextInput
              register={register}
              label="Correo Electrónico"
              name="email"
              type="email"
              error={errors.email}
              readonly={readOnlyEmail}
            />
            <button
              onClick={() => setReadOnlyEmail(!readOnlyEmail)}
              type="button"
              className="bg-background sm:p-2 sm:mt-1 flex items-center justify-center rounded-lg shadow-md shadow-tertiary hover:bg-tertiary transition-colors self-center absolute -top-3 right-0 p-1 sm:relative sm:top-auto sm:right-auto"
            >
              {readOnlyEmail ? (
                <PencilIcon className="w-6 h-6" />
              ) : (
                <CheckIcon className="w-6 h-6" />
              )}
            </button>
          </div>
          <div className="grid sm:grid-cols-[1fr_0.1fr] gap-2 relative">
            <TextInput
              register={register}
              label="Teléfono"
              name="phoneNumber"
              type="tel"
              error={errors.phoneNumber}
              readonly={readOnlyPhoneNumber}
            />
            <button
              onClick={() => setReadOnlyPhoneNumber(!readOnlyPhoneNumber)}
              type="button"
              className="bg-background sm:p-2 sm:mt-1 flex items-center justify-center rounded-lg shadow-md shadow-tertiary hover:bg-tertiary transition-colors self-center absolute -top-3 right-0 p-1 sm:relative sm:top-auto sm:right-auto "
            >
              {readOnlyPhoneNumber ? (
                <PencilIcon className="w-6 h-6" />
              ) : (
                <CheckIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </section>

        <Button
          type="submit"
          size="medium"
          color={formUpdated ? "primary-blue" : "disabled"}
          classname={`mx-auto`}
        >
          Guardar cambios
        </Button>
      </form>

      {userData?.stateValidation == 0 && (
        <article className="w-full max-w-[1000px] mx-auto bg-contrast shadow-md shadow-tertiary rounded-lg py-6 px-4 sm:px-8 flex flex-col items-center gap-1">
          <p className="text-body-large-regular self-start">
            Para acceder a una financiación, es indispensable validar tu
            identidad con la documentación requerida.
          </p>
          <p className="text-body-large-regular self-start">
            La validación de los documentos será revisada y aprobada por un
            representante para garantizar la autenticidad de la información
            proporcionada.
          </p>
          <p className="text-body-large-regular self-start">
            Recuerda asegurarte de que todos los documentos estén completos y en
            buen estado para evitar demoras en el proceso.
          </p>
          <Button
            size="medium"
            color="primary-blue"
            type="link"
            to={"/validate-identity"}
            classname="mt-4"
          >
            Validar identidad
          </Button>
        </article>
      )}

      {userData?.stateValidation === 1 && (
        <article className="w-full max-w-[1000px] mx-auto bg-contrast shadow-md shadow-tertiary rounded-lg py-6 px-4 sm:px-8 flex flex-col items-center gap-1 border-2 border-secondary">
          <h3 className="text-title-large-bold text-center mb-2">
            Tu solicitud de validación está en proceso.
          </h3>
          <p className="text-body-large-regular self-start">
            Tu solicitud de validación fue enviada correctamente y está en
            proceso de revisión. Un representante está verificando la
            documentación proporcionada. Recibirás una notificación cuando el
            trámite sea aprobado.
          </p>
        </article>
      )}
      <Button
        size={"large"}
        color={"primary-orange"}
        classname="self-center sm:self-auto flex sm:hidden items-center justify-center"
      >
        Solicitar Financiamiento
      </Button>
    </section>
  );
}

export default ProfilePage;
