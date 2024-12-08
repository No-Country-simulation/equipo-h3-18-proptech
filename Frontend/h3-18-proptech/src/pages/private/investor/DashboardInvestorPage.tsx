import { useEffect, useState } from "react";
import { BigInfoCard, Button, InfoCard } from "../../../components/common";
import { CalendarIcon, CashIcon, GraphIcon } from "../../../components/icons";
import { InvestModal, RetireMoneyModal } from "../../../components/modal";
import { InvestorGraph } from "./components";

export interface InvestInfo {
  montoActual: number;
  gananciaTotal: number;
  mesesInv: number;
  year: number;
  gananciasPorMes: { mes: number; monto: number }[];
  startYear: number;
}

const fakeData = [
  {
    montoActual: 10000,
    gananciaTotal: 1300,
    mesesInv: 13,
    year: 2023,
    startYear: 2023,
    gananciasPorMes: [
      {
        mes: 11,
        monto: 100,
      },
    ],
  },
  {
    montoActual: 10000,
    gananciaTotal: 1300,
    mesesInv: 13,
    year: 2024,
    startYear: 2023,
    gananciasPorMes: [
      {
        mes: 0,
        monto: 200,
      },
      {
        mes: 1,
        monto: 300,
      },
      {
        mes: 2,
        monto: 400,
      },
      {
        mes: 3,
        monto: 500,
      },
      {
        mes: 4,
        monto: 600,
      },
      {
        mes: 5,
        monto: 700,
      },
      {
        mes: 6,
        monto: 800,
      },
      {
        mes: 7,
        monto: 900,
      },
      {
        mes: 8,
        monto: 1000,
      },
      {
        mes: 9,
        monto: 1100,
      },
      {
        mes: 10,
        monto: 1200,
      },
      {
        mes: 11,
        monto: 1300,
      },
    ],
  },
];

export function DashboardInvestorPage() {
  const actualYear = new Date().getFullYear();
  const [investInfo, setInvestInfo] = useState<InvestInfo | undefined>({
    montoActual: 0,
    gananciasPorMes: [{ monto: 0, mes: 0 }],
    year: 2000,
    gananciaTotal: 0,
    mesesInv: 0,
    startYear: 2000,
  });

  const [selectedYear, setSelectedYear] = useState(actualYear);
  const [openInvestModal, setOpenInvestModal] = useState(false);
  const [openRetireModal, setOpenRetireModal] = useState(false);

  useEffect(() => {
    const response = fakeData.find((data) => data.year === actualYear);
    if (response) {
      setInvestInfo(response);
    }
  }, []);

  useEffect(() => {
    const response = fakeData.find((data) => data.year === selectedYear);
    if (response) {
      setInvestInfo(
        (state) =>
          state && {
            ...state,
            gananciasPorMes: response.gananciasPorMes,
            year: response.year,
          }
      );
    } else {
      setInvestInfo((state) => state && { ...state, gananciasPorMes: [] });
    }
  }, [selectedYear]);

  return (
    <>
      <div className="bg-background flex-1 flex flex-col items-center">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center md:max-w-[1050px] my-8">
          <h2 className="text-headline-small-medium">Resumen Financiero</h2>
        </div>
        {investInfo ? (
          <>
            <div className="flex flex-col md:flex-row justify-between gap-3 pb-6 md:pb-16">
              <InfoCard
                title="Monto actual"
                icon={<CashIcon />}
                value={`$${investInfo.montoActual}`}
              />
              <InfoCard
                title="Ganancia total"
                icon={<GraphIcon />}
                value={`$${investInfo.gananciaTotal}`}
              />
              <InfoCard
                title="Meses invirtiendo"
                icon={<CalendarIcon />}
                value={investInfo.mesesInv.toString()}
              />
            </div>
            <InvestorGraph
              year={selectedYear}
              setYear={setSelectedYear}
              gananciasPorMes={investInfo.gananciasPorMes}
              startYear={investInfo.startYear}
            />
            <div className="flex flex-col md:flex-row my-20 gap-6 justify-start md:max-w-[1050px] ">
              <Button
                color="primary-orange"
                size="medium"
                type="button"
                onClick={() => setOpenInvestModal(true)}
              >
                Invertir
              </Button>
              <Button
                color="secondary"
                size="medium"
                type="button"
                onClick={() => setOpenRetireModal(true)}
              >
                Retirar dinero
              </Button>
            </div>
          </>
        ) : (
          <BigInfoCard
            buttonText="Invertir"
            icon={<img src="assets/icono-inversor.png" />}
            to="/investor"
          >
            Actualmente no tienes inversiones activas registradas en tu cuenta.
          </BigInfoCard>
        )}
      </div>
      <InvestModal
        openModal={openInvestModal}
        setInvestInfo={setInvestInfo}
        setOpenModal={setOpenInvestModal}
      />
      <RetireMoneyModal
        openModal={openRetireModal}
        setInvestInfo={setInvestInfo}
        setOpenModal={setOpenRetireModal}
        montoAcumulado={investInfo?.montoActual ?? 0}
      />
    </>
  );
}

export default DashboardInvestorPage;
