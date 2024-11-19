import { FieldValues, useForm } from "react-hook-form";
import InlineGeneralInput from "./InlineGeneralInput";
import InlineSelect from "./InlineSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../../schemas/userSchema";

function RegisterForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      lastname: "",
      dni: "",
      cuit: "",
      email: "",
      password: "",
      confirm_password: "",
      role: "inversor",
    },
    resolver: zodResolver(userSchema),
  });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <form
      className="mx-auto w-full max-w-[500px] bg-white my-5 rounded-lg py-4 px-6 shadow-md flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-center text-3xl mb-3">Registro de Usuario</h1>
      <section className="flex flex-col sm:flex-row justify-between gap-4 w-100">
        <InlineGeneralInput control={control} name="name" title="Nombre" errors={errors} />
        <InlineGeneralInput
          control={control}
          name="lastname"
          title="Apellido"
          errors={errors}
        />
      </section>
      <InlineGeneralInput control={control} name="dni" title="DNI" errors={errors} />
      <InlineGeneralInput control={control} name="cuit" title="CUIT" errors={errors} />
      <InlineGeneralInput
        control={control}
        name="email"
        title="Correo Electrónico"
        type="email"
        errors={errors}
      />
      <InlineGeneralInput
        control={control}
        name="password"
        title="Contraseña"
        type="password"
        errors={errors}
      />
      <InlineGeneralInput
        control={control}
        name="confirm_password"
        title="Confirmar Contraseña"
        type="password"
        errors={errors}
      />

      <InlineSelect />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold mb-2"
      >
        Registrar Usuario
      </button>
    </form>
  );
}

export default RegisterForm;
