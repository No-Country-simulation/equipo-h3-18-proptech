import { useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { EyeIcon, EyeoffIcon } from "../icons";

interface Props {
  register: UseFormRegister<any>;
  label: string;
  name: string;
  info?: string;
  error?: FieldError;
}

export function PasswordInput({ register, name, label, info, error }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`flex flex-col relative pb-5 ${info ? "mb-4" : "mb-0"}`}>
      <label className="mb-2 text-body-medium-regular ps-2">{label}</label>
      <div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          {...register(name)}
          className={`border-[3px] w-full text-body-large-regular py-2 px-3 pe-8 rounded-md shadow-md focus:outline-none ${error ? "border-error" : "border-primary"}`}
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-3 right-2">
          {showPassword ? <EyeoffIcon className="h-6 w-6" /> : <EyeIcon className="h-6 w-6"/>}
        </button>
      </div>

      <span
        className={`text-body-small-regular-10 font-lato absolute h-10 -bottom-6 left-0  ${error ? "text-error" : info ? "text-base-color" : "text-transparent"}`}
      >
        {error ? error.message : info ? info : ""}
      </span>
    </div>
  );
}

export default PasswordInput;
