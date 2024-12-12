import { useEffect, useState } from "react";
import { BigInfoCard, Button, InfoCard } from "../../../components/common";
import {
  CashIcon,
  CircleProgressIcon,
  MoneyIcon,
} from "../../../components/icons";
import { DashboardBuyerTable } from "./components";
import { getAllMyLoans } from "../../../services/buyer";
import { toast } from "sonner";
import LoadingPage from "../../LoadingPage";

interface LoanData {
  idLoan: string;
  nextExpirationDate: Date;
  remainingAmount: number;
  payedPercentage: number;
  currentQuota: string;
  stateLoan: number;
  quotaValue: number;
}

export function DashboardBuyerPage() {
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loans, setLoans] = useState<LoanData[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    getAllMyLoans()
      .then((response) => {
        if (response && response?.status < 300) {
          response.data.forEach((el: LoanData) => {
            el.nextExpirationDate = new Date(el.nextExpirationDate);
          });
          setLoans(response.data);
        } else {
          toast.error("Ha ocurrido un error al obtener los datos");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const select = (pos: number) => {
    setSelected(pos);
  };

  return (
    <div className="bg-background min-h-[750px] flex flex-col max-w-[1050px] md:mx-auto px-4 sm:px-8 items-center">
      {loading ? (
        <LoadingPage background="transparent" size="section" />
      ) : loans.length > 0 ? (
        <>
          <div className="flex justify-between items-center self-center sm:self-start my-4 md:my-8">
            <h2 className="text-headline-small-medium ">Préstamos aprobados</h2>
          </div>
          <div className="flex flex-col items-center sm:flex-row sm:flex-wrap justify-center lg:justify-evenly w-full gap-x-6 lg:w-[1050px] gap-y-6 mb-6 md:mb-16">
            <InfoCard
              title="Próxima fecha de pago"
              icon={<CashIcon />}
              value={loans[selected].nextExpirationDate.toLocaleDateString()}
            />
            <InfoCard
              title="Monto restante"
              icon={<MoneyIcon />}
              value={`$${loans[selected].remainingAmount.toFixed(2).toString()}`}
            />
            <InfoCard
              title="Porcentaje pagado"
              icon={<CircleProgressIcon />}
              value={`${loans[selected].payedPercentage.toString()}%`}
            />
          </div>
          <DashboardBuyerTable
            data={loans}
            selected={selected}
            select={select}
          />
          <div className="flex flex-col sm:flex-row my-6 md:my-12 gap-6 justify-center items-center md:justify-start w-full ">
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
