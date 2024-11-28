import { useForm } from "react-hook-form";
import { Button, TextInput } from "../../../components/common";
import { PencilIcon } from "../../../components/icons";
import { useEffect, useState } from "react";
import CheckIcon from "../../../components/icons/CheckIcon";
import { UserProfile } from "../../../interfaces/User";

function ProfilePage() {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<UserProfile>({
    defaultValues: {
      nombre: "",
      apellido: "",
      email: "",
      phoneNumber: "",
      cuit: "",
      dni: "",
    },
  });

  const [userData, setUserData] = useState<UserProfile>();
  const [readOnlyEmail, setReadOnlyEmail] = useState(true);
  const [readOnlyPhoneNumber, setReadOnlyPhoneNumber] = useState(true);

  useEffect(() => {
    // Petición al back para obtener los datos del usuario

    const userResponse = {
      nombre: "John",
      apellido: "Doe",
      email: "correo@localhost.com",
      phoneNumber: "+5612345678",
      cuit: "",
      dni: "",
      rol: "Cliente",
    };
    setUserData(userResponse);
    reset(userResponse);
  }, []);

  const onSubmit = (data: UserProfile) => {
    console.log(data);
  };

  return (
    <section className="flex-1 flex flex-col gap-6 bg-background px-4 md:px-10 py-6">
      <header className="flex flex-col sm:flex-row gap-y-4 justify-between sm:px-10">
        <h1 className="text-headline-large-medium text-center sm:text-start">
          Mi Perfil
        </h1>
        <Button
          size={"large"}
          color={"primary-orange"}
          classname="self-center sm:self-auto"
        >
          Solicitar Financiamiento
        </Button>
      </header>

      <article className="w-full max-w-[1000px] mx-auto bg-contrast shadow-md shadow-tertiary px-4 sm:px-3 md:px-6 lg:px-10 py-6 rounded-lg">
        <h1 className="text-title-large-regular mb-6">Información Personal</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-5 px-4 w-full"
        >
          <TextInput
            register={register}
            label="Nombre"
            name="nombre"
            error={errors.nombre}
            readonly={true}
          />
          <TextInput
            register={register}
            label="Apellido"
            name="apellido"
            error={errors.apellido}
            readonly={true}
          />
          {userData?.dni && (
            <TextInput
              register={register}
              label="DNI"
              name="dni"
              error={errors.dni}
              readonly={true}
            />
          )}
          {userData?.cuit && (
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
        </form>
      </article>

      <article className="w-full max-w-[900px] mx-auto bg-contrast shadow-md shadow-tertiary rounded-lg py-6 px-8 flex flex-col items-center gap-6">
        <p className="text-title-large-regular">
          Para acceder a una financiación, es indispensable validar tu identidad
          con la documentación requerida.
        </p>
        <Button
          size="medium"
          color="primary-blue"
          type="link"
          to={"/validate-identity"}
        >
          Validar identidad
        </Button>
      </article>
    </section>
  );
}

export default ProfilePage;
