import { useState } from "react";
import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";

interface Props {
  name: string;
  title: string;
  control: Control<FieldValues>;
  errors: FieldErrors<FieldValues>;
  type?: React.HTMLInputTypeAttribute | undefined;
}

function InlineGeneralInput({ name, title, type, control, errors }: Props) {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [inputType, setInputType] = useState(type ?? "text");

  const titleStyles = {
    onFocus:
      "absolute top-0 bottom-0 left-0 px-2 py-4 text-slate-500 text-md transition-all pointer-events-none",
    onBlur:
      "absolute top-0 text-xs px-2 pt-1 transition-all pointer-events-none text-gray-600",
  };

  const inputStyles = {
    default:
      "border border-gray-300 text-md rounded pt-5 pb-3 px-2 transition-all",
    onError:
      "border border-red-600 text-md rounded pt-5 pb-3 px-2 transition-all",
  };

  return (
    <div className="relative w-100 flex flex-col pb-5">
      <span
        className={
          showPlaceholder ? titleStyles["onFocus"] : titleStyles["onBlur"]
        }
      >
        {title}
      </span>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <input
            type={inputType}
            className={
              errors[name] ? inputStyles["onError"] : inputStyles["default"]
            }
            style={{ paddingRight: type === "password" ? "40px" : 10 }}
            onFocus={() => {
              setShowPlaceholder(false);
            }}
            onBlur={(e) => {
              if (e.target.value.length == 0) {
                setShowPlaceholder(true);
              }
            }}
            onChange={onChange}
            value={value}
          />
        )}
      />
      {type === "password" && (
        <span
          onClick={() =>
            setInputType((state) => {
              if (state === "password") return "text";
              if (state === "text") return "password";
              return state;
            })
          }
          className="absolute top-[0] bottom-[0] right-0 my-5 px-2 h-fit cursor-pointer select-none"
        >
          👁
        </span>
      )}
      {errors[name] && (
        <span className="text-red-600 text-xs absolute bottom-0 ps-2 font-semibold">
          {errors[name].message as string}
        </span>
      )}
    </div>
  );
}

export default InlineGeneralInput;
