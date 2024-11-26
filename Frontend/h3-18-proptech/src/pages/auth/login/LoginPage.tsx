import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FormValues, schema } from "./models/Login.model";
import { CustomInput, Button } from "../../../components/common";

export const LoginPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center flex-1 bg-tertiary"
    >
      <div className="w-[340px]">
        <Controller
          name="email"
          control={control}
          render={() => (
            <CustomInput
              type="email"
              name="email"
              register={register}
              label="Email"
              error={errors.email}
            />
          )}
        />
      </div>
      <div className="w-[340px] mb-3">
        <Controller
          name="password"
          control={control}
          render={() => (
            <CustomInput
              type="password"
              name="password"
              register={register}
              label="Contraseña"
              error={errors.password}
            />
          )}
        />
      </div>
      <Button type="submit" color="primary-blue" size="large">
        Iniciar sesión
      </Button>
    </form>
  );
};

export default LoginPage;
