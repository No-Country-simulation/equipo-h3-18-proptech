import { BigInfoCard, Button, InfoCard } from "../../../components/common";
import { CalendarIcon, CashIcon, GraphIcon } from "../../../components/icons";
import GraphMoneyIcon from "../../../components/icons/GraphMoneyIcon";

export function DashboardInvestorPage() {
  const data = false;

  return (
    <div className="bg-[#F8F8F8] min-h-[750px] flex flex-col  items-center">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center md:w-[1050px] my-4 md:my-[60px]">
        <h2 className="text-headline-small-medium">Resumen Financiero</h2>
      </div>
      {data ? (
        <>
          <div className="flex flex-col md:flex-row justify-between gap-3 pb-6 md:pb-16">
            <InfoCard title="Monto actual" icon={<CashIcon />} value="$12500" />
            <InfoCard
              title="Ganancia total"
              icon={<GraphIcon />}
              value="$1200"
            />
            <InfoCard
              title="Meses invirtiendo"
              icon={<CalendarIcon />}
              value="8"
            />
          </div>
          <div className="flex my-12 gap-6 justify-start md:w-[1050px] ">
            <Button
              color="primary-orange"
              size="medium"
              type="link"
              to="/investor"
            >
              Invertir
            </Button>
            <Button color="secondary" size="medium" type="link" to="/investor">
              Retirar dinero
            </Button>
          </div>
        </>
      ) : (
        <BigInfoCard
          buttonText="Invertir"
          icon={<GraphMoneyIcon />}
          to="/investor"
        >
          Actualmente no tienes inversiones activas registradas en tu cuenta.
        </BigInfoCard>
      )}
    </div>
  );
}

export default DashboardInvestorPage;
