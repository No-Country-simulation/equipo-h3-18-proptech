import { ArrowBackIcon, SelectArrowIcon } from "../../../components/icons";
import { BuyerSharesTable, DataBuyerSharesTable } from "./components";
import useTransitionNavigation from '../../../hooks/useTransitionNavigation';

const options = ["Todos", "Pagado", "Atrasado", "Pendiente"];
const pages = [1, 2, 3, 4];

export function BuyerSharesPage() {
  const navigate = useTransitionNavigation();

  const goBack = () => {
    navigate("/buyer");
  };

  return (
    <>
      <div className="bg-[#F8F8F8] min-h-[750px] flex flex-col  items-center">
        <div className="flex justify-between w-[1050px] mt-[60px]">
          <div className="flex">
            <ArrowBackIcon onClick={goBack} className=" cursor-pointer" />
            <h4 className="text-headline-large-medium mb-6 ml-6">Cuotas</h4>
          </div>
          <div className="flex gap-6">
            <div className="flex items-center relative pb-5 mb-4">
              <span className=" text-body-large-regular  mr-3">
                Filtrar por
              </span>
              <div className="relative flex items-center cursor-pointer w-[150px]">
                <select className="border-[3px] text-body-large-regular py-2 px-3 rounded-md shadow-md appearance-none w-full focus:outline-none border-primary">
                  {options.map((value) => {
                    return (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    );
                  })}
                </select>
                <SelectArrowIcon className="absolute right-4 size-6 pointer-events-none" />
              </div>
            </div>
            <div className="flex items-center relative pb-5 mb-4">
              <span className=" text-body-large-regular  mr-3">Página</span>
              <div className="relative flex items-center cursor-pointer w-[65px]">
                <select className="border-[3px] text-body-large-regular py-2 px-3 rounded-md shadow-md appearance-none w-full focus:outline-none border-primary bg-primary text-contrast">
                  {pages.map((value) => {
                    return (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    );
                  })}
                </select>
                <SelectArrowIcon
                  className="absolute right-1 size-6 pointer-events-none"
                  color="#fff"
                />
              </div>
            </div>
          </div>
        </div>
        <BuyerSharesTable data={data} shares={data.length} />
      </div>
    </>
  );
}

export default BuyerSharesPage;

const data: DataBuyerSharesTable[] = [
  {
    share: 1,
    date: new Date(2024, 9, 5),
    state: "paid",
    total: 500,
    pay: true,
  },
  {
    share: 2,
    date: new Date(2024, 10, 5),
    state: "overdue",
    total: 600,
    pay: false,
  },
  {
    share: 3,
    date: new Date(2024, 11, 5),
    state: "pending",
    total: 700,
    pay: true,
  },
];
