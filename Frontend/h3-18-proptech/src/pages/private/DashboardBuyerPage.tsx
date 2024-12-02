import { Button } from "../../components/common";
import {
  CashIcon,
  CircleProgressIcon,
  GreenCheckIcon,
  MoneyIcon,
  RedXIcon,
} from "../../components/icons";
import DashboardBuyerTable, {
  DataBuyerTable,
} from "./components/DashboardBuyerTable";
import InfoCard from "./components/InfoCard";

function DashboardBuyerPage() {
  const payOk = true;

  return (
    <div className="bg-[#F8F8F8] min-h-[750px] flex flex-col  items-center">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center md:w-[1050px] my-4 md:my-[60px]">
        <h2 className="text-headline-large-medium">Prestamos aprobados</h2>
        <Button color="primary-orange" size="medium" type="link" to="/finance">
          Solicitar financiación
        </Button>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-3 pb-6 md:pb-16">
        {payOk ? (
          <InfoCard title="Estado" icon={<GreenCheckIcon />} value="Al día" />
        ) : (
          <InfoCard title="Estado" icon={<RedXIcon />} value="Atrasado" />
        )}
        <InfoCard
          title="Próxima fecha de pago"
          icon={<CashIcon />}
          value="10/12/2024"
        />
        <InfoCard
          title="Pagos realizados"
          icon={<CircleProgressIcon />}
          value="3/48"
        />
        <InfoCard title="Saldo pendiente" icon={<MoneyIcon />} value="$1200" />
      </div>
      <DashboardBuyerTable data={data} />
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
