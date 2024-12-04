import { BuyerSharesTable, DataBuyerSharesTable } from "./components";


export function BuyerSharesPage() {
  const dataPaid = data.filter((d) => d.state === "paid");

  const dataNonPaid = data.filter((d) => d.state !== "paid");

  return (
    <>
      <div className="bg-[#F8F8F8] min-h-[750px] flex flex-col  items-center">
        <div className="flex justify-between w-[1050px] my-[60px]">
          <h2 className="text-headline-large-medium">Cuotas Pendientes</h2>
          <p>Páginas</p>
        </div>
        <BuyerSharesTable data={dataNonPaid} shares={data.length} />
      </div>
      <div className="bg-[#F8F8F8] min-h-[750px] flex flex-col  items-center">
        <div className="flex justify-between w-[1050px] my-[60px]">
          <h2 className="text-headline-large-medium">Cuotas Pagadas</h2>
          <p>Páginas</p>
        </div>
        <BuyerSharesTable data={dataPaid} shares={data.length} />
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
    pay: true,
  },
  {
    share: 3,
    date: new Date(2024, 11, 5),
    state: "pending",
    total: 700,
    pay: true,
  },
];
