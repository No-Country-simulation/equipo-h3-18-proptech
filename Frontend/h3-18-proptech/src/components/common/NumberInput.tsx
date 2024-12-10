import { FieldError, UseFormRegister } from "react-hook-form";

interface Props {
  register: UseFormRegister<any>;
  label: string;
  name: string;
  info?: string;
  error?: FieldError;
  placeholder?: string;
}

export function NumberInput({ register, name, label, info, error, placeholder }: Props) {
  return (
    <div className={`flex flex-col relative pb-5 ${info ? "mb-4" : "mb-0"}`}>
      <span className="mb-2 text-body-medium-regular ps-2">{label}</span>
      <input
        type="number"
        placeholder={placeholder ?? "0"}
        min={0}
        step={"any"}
        {...register(name)}
        className={`border-[3px] text-body-large-regular py-2 px-3 rounded-md shadow-md focus:outline-none ${error ? "border-error" : "border-primary"}`}
      />
      <span
        className={`text-body-small-regular-10 font-lato absolute h-10 -bottom-6 left-0  ${error ? "text-error" : info ? "text-base-color" : "text-transparent"}`}
      >
        {error ? error.message : info ? info : ""}
      </span>
    </div>
  );
}

export default NumberInput;
