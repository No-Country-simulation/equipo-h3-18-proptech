import SearchIcon from "../icons/SearchIcon";

interface Props {
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export function SearchInput({ setValue }: Props) {
  return (
    <div className={`flex flex-col relative mb-0`}>
      <input
        type={"text"}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Buscar..."
        className={`border-[3px] text-body-large-regular py-2 ps-3 pe-8 rounded-md shadow-md focus:outline-none border-primary`}
      />
      <SearchIcon className="w-6 h-6 absolute right-2 top-3 text-disabled" />
    </div>
  );
}

export default SearchInput;
