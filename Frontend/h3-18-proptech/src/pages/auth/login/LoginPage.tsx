import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FormValues, schema } from "./models/Login.model";

export const LoginPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
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
      className="flex flex-col justify-center items-center min-h-[100vh]"
    >
      <div className="">
        <label htmlFor="email">Email</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <input
              id="email"
              type="email"
              {...field}
              className={`block border border-gray-600 bg-transparent py-1.5 pl-1 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6 w-[300px] ${errors.email ? "text-red-600" : "text-gray-900 "}`}
            />
          )}
        />
        {errors.email && (
          <p className="text-red-600 text-xs">{errors.email.message}</p>
        )}
      </div>
      <div className="">
        <label htmlFor="password">Contraseña</label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <input
              id="password"
              type="password"
              {...field}
              className={`block border border-gray-600 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6 w-[300px] ${errors.password ? "text-red-600" : ""}`}
            />
          )}
        />
        {errors.password && (
          <p className="text-red-600 text-xs">{errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="rounded-md bg-white px-2.5 py-1.5 m-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Submit
      </button>
    </form>
  );
};

export default LoginPage;
