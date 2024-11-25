import { FieldError, UseFormRegister } from "react-hook-form";

interface Props {
  register: UseFormRegister<any>;
  label: string;
  name: string;
  info?: string;
  error?: FieldError;
}

function NumberInput({ register, name, label, info, error }: Props) {
  return (
    <div className="flex flex-col relative pb-5">
      <label className="mb-2 text-body-medium-regular ps-2">{label}</label>
      <input
        type="number"
        min={0}
        step={"any"}
        {...register(name)}
        className={`border-[3px] text-body-large-regular py-2 px-3 rounded-md shadow-md focus:outline-none ${error ? "border-error" : "border-primary"}`}
      />
      <span
        className={`text-body-small-regular-10 font-lato absolute bottom-0 left-0  ${error ? "text-error" : info ? "text-base-color" : "text-transparent"}`}
      >
        {error ? error.message : info ? info : ""}
      </span>
    </div>
  );
}

export default NumberInput;
