import { Button } from "../../components/common";
import DashboardBuyerTable, { DataBuyerTable } from "./components/DashboardBuyerTable";

function DashboardBuyerPage() {
  return (
    <div className="bg-[#F8F8F8] min-h-[750px] flex flex-col  items-center">
      <div className="flex justify-between w-[1050px] my-[60px]">
        <h2 className="text-headline-large-medium">Prestamos aprobados</h2>
        <Button color="primary-orange" size="medium">
          Solicitar financiación
        </Button>
      </div>
      <DashboardBuyerTable data={data}/>
    </div>
  );
}

export default DashboardBuyerPage;


const data: DataBuyerTable[] = [
  {
    loan: "paid",
    shares: 6,
    total: 1000,
    pay: false,
  },
  {
    loan: "overdue",
    shares: 3,
    total: 1500,
    pay: true,
  },
  {
    loan: "pending",
    shares: 10,
    total: 1200,
    pay: true,
  },
];
