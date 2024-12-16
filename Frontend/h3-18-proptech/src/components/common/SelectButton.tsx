import { SelectArrowIcon } from "../icons";

interface Props {
  options: {
    label: string;
    value: string | number;
  }[];
  value: string | number;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  selectClassname?: string;
  arrowClassname?: string;
}

export function SelectButton({ options, value, setValue, selectClassname, arrowClassname }: Props) {
  return (
    <article className="relative flex items-center cursor-pointer">
      <select
        defaultValue={value}
        onChange={(e) => setValue(e.target.value)}
        className={`${selectClassname && selectClassname} border-[3px] text-body-large-regular py-2 ps-3 rounded-md shadow-md appearance-none w-full focus:outline-none border-primary pe-8 cursor-pointer`}
      >
        {options.map(({ label, value }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
      <SelectArrowIcon className={`absolute right-1 size-6 pointer-events-none ${arrowClassname && arrowClassname}`} />
    </article>
  );
}

export default SelectButton;
