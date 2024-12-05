import { FieldError, UseFormRegister } from "react-hook-form";
import { SVGProps } from "react";

interface Props {
  register: UseFormRegister<any>;
  label: string;
  name: string;
  options: { label: string; value: string | number }[];
  info?: string;
  error?: FieldError;
}

export function SelectInput({ register, name, label, info, error, options }: Props) {
  return (
    <div className={`flex flex-col relative pb-5 ${info ? "mb-4" : "mb-0"}`}>
      <span className="mb-2 text-body-medium-regular ps-2">{label}</span>
      <div className="relative flex items-center cursor-pointer">
        <select
          {...register(name)}
          className={`border-[3px] text-body-large-regular py-2 px-3 rounded-md shadow-md appearance-none w-full focus:outline-none ${error ? "border-error" : "border-primary"}`}
        >
          {options.map(({ label, value }) => {
            return (
              <option key={value} value={value}>
                {label}
              </option>
            );
          })}
        </select>
        <SelectArrowIcon className="absolute right-4 size-6 pointer-events-none" />
      </div>
      <span
        className={`text-body-small-regular-10 font-lato absolute h-10 -bottom-6 left-0  ${error ? "text-error" : info ? "text-base-color" : "text-transparent"}`}
      >
        {error ? error.message : info ? info : ""}
      </span>
    </div>
  );
}

const SelectArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M5.707 9.71a1 1 0 0 0 0 1.415l4.892 4.887a2 2 0 0 0 2.828 0l4.89-4.89a1 1 0 1 0-1.414-1.415l-4.185 4.186a1 1 0 0 1-1.415 0L7.121 9.71a1 1 0 0 0-1.414 0Z"
    />
  </svg>
);

export default SelectInput;
