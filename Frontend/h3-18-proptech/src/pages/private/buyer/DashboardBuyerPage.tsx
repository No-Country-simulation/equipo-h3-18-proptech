import { useState } from "react";
import { BigInfoCard, Button, InfoCard } from "../../../components/common";
import {
  CashIcon,
  CircleProgressIcon,
  MoneyIcon,
} from "../../../components/icons";
import { DashboardBuyerTable, DataBuyerTable } from "./components";

export function DashboardBuyerPage() {
  const [selected, setSelected] = useState(0);

  const select = (pos: number) => {
    setSelected(pos);
  };

  return (
    <div className="bg-[#F8F8F8] min-h-[750px] flex flex-col  items-center">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center md:w-[1050px] my-4 md:my-[60px]">
        <h2 className="text-headline-small-medium">Prestamos aprobados</h2>
      </div>
      {data.length > 0 ? (
        <>
          <div className="flex flex-col md:flex-row justify-between gap-3 pb-6 md:pb-16">
            <InfoCard
              title="Próxima fecha de pago"
              icon={<CashIcon />}
              value="10/12/2024"
            />
            <InfoCard
              title="Monto restante"
              icon={<MoneyIcon />}
              value="$1200"
            />
            <InfoCard
              title="Porcentaje pagado"
              icon={<CircleProgressIcon />}
              value="15%"
            />
          </div>
          <DashboardBuyerTable
            data={data}
            selected={selected}
            select={select}
          />
          <div className="flex my-12 gap-6 justify-start md:w-[1050px] ">
            <Button
              color="primary-orange"
              size="medium"
              type="link"
              to="/buyer/loan-request"
            >
              Solicitar financiación
            </Button>
            <Button
              color="secondary"
              size="medium"
              type="link"
              to="/buyer/loan-request"
            >
              Refinanciar
            </Button>
          </div>
        </>
      ) : (
        <BigInfoCard
          buttonText="Solicitar financiación"
          icon={<CashIcon className=" scale-125" />}
          to="/buyer/loan-request"
        >
          Actualmente no tienes préstamos registrados. Descubre cómo financiar
          tu próximo terreno con nosotros.
        </BigInfoCard>
      )}
    </div>
  );
}

export default DashboardBuyerPage;

const data: DataBuyerTable[] = [
  {
    id: 1,
    loan: "paid",
    shares: 6,
    total: 1000,
  },
  {
    id: 2,
    loan: "overdue",
    shares: 3,
    total: 1500,
  },
  {
    id: 3,
    loan: "pending",
    shares: 10,
    total: 1200,
  },
];
