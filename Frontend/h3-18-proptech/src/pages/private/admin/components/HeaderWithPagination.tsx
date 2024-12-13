import { useState } from "react";
import { SearchInput, SelectButton } from "../../../../components/common";

interface Props {
  title: string;
  maxPages: number;
}

export function HeaderWithPagination({ maxPages, title }: Props) {
  const [page, setPage] = useState<number>(1);
  const [, setSearch] = useState("")
  const pagesOptions = [];
  for (let index = 1; index <= maxPages; index++) {
    pagesOptions.push({
      label: `${index < 10 ? `0${index}` : index}`,
      value: index,
    });
  }

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-y-6 max-w-[900px] w-full mb-8 mt-6">
      <h3 className="text-headline-small-medium text-center sm:text-start ">
        {title}
      </h3>
      <div className="self-end md:self-auto flex flex-col mx-auto sm:mx-0 sm:flex-row gap-6">
        <SearchInput setValue={setSearch}/>
        <div className="flex gap-2 items-center justify-center text-title-large-semi-bold">
          <span>Página:</span>
          <SelectButton
            selectClassname="bg-primary text-contrast py-[3px] ps-[4px]"
            arrowClassname="text-contrast"
            value={page}
            setValue={setPage}
            options={pagesOptions.length === 0 ? [{label: "01", value: 1}] : pagesOptions}
          />
        </div>
      </div>
    </header>
  );
}

export default HeaderWithPagination;
