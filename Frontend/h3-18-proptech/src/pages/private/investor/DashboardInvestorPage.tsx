import { useEffect, useState } from "react";
import { BigInfoCard, Button, InfoCard } from "../../../components/common";
import { CalendarIcon, CashIcon, GraphIcon } from "../../../components/icons";
import { InvestModal } from "../../../components/modal";
import { InvestorGraph } from "./components";
import {
  addInversion,
  extractInversion,
  getMyInversion,
} from "../../../services";
import { toast } from "sonner";
import LoadingPage from "../../LoadingPage";

export interface InvestInfo {
  currentAmount: number;
  initDate: Date;
  profit: number;
  history: Historial[];
}

interface Historial {
  year: number;
  month: number;
  profit: number;
}

export interface AddInversion {
  amount: number;
}

export function DashboardInvestorPage() {
  const [loading, setLoading] = useState(true);
  const [loadingGraph, setLoadingGraph] = useState(false);
  const actualYear = new Date().getFullYear();
  const [investInfo, setInvestInfo] = useState<InvestInfo | undefined>(
    undefined
  );
  const [investHistory, setInvestHistory] = useState<Historial[] | undefined>(
    undefined
  );

  const [selectedYear, setSelectedYear] = useState(actualYear);
  const [openInvestModal, setOpenInvestModal] = useState(false);
  const [loadingInvest, setLoadingInvest] = useState(false);
  const [openRetireModal, setOpenRetireModal] = useState(false);

  useEffect(() => {
    getInversion();
  }, []);

  useEffect(() => {
    getYearHistory(selectedYear);
  }, [selectedYear]);

  const getInversion = () => {
    window.scrollTo(0, 0);
    setLoading(true);
    getMyInversion()
      .then((response) => {
        if (response && response?.status < 300) {
          if (response.status === 204) {
            setInvestInfo(undefined);
          } else {
            let data = response.data as InvestInfo;
            data.initDate = new Date(data.initDate);
            setInvestInfo(data);
            setInvestHistory(
              data.history.filter((el) => el.year === actualYear)
            );
          }
        } else {
          toast.error("Ha ocurrido un error al obtener los datos");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getYearHistory = (year: number) => {
    setLoadingGraph(true);
    getMyInversion()
      .then((response) => {
        if (response && response?.status < 300) {
          if (response.status === 204) {
            setInvestHistory(undefined);
          } else {
            let data = response.data as InvestInfo;
            setInvestHistory(data.history.filter((el) => el.year === year));
          }
        } else {
          toast.error("Ha ocurrido un error al obtener los datos");
          setInvestHistory(undefined);
        }
      })
      .finally(() => setLoadingGraph(false));
  };

  const setInversion = (inv: AddInversion) => {
    setLoadingInvest(true);
    addInversion(inv)
      .then((response) => {
        if (response && response?.status < 300) {
          toast.success("Inversión realizada con éxito");
          getInversion();
        } else {
          toast.error("Ha ocurrido un error al realizar la inversión");
        }
      })
      .finally(() => {
        setLoadingInvest(false);
        setOpenInvestModal(false);
      });
  };

  const setExtraction = (inv: AddInversion) => {
    setLoadingInvest(true);
    extractInversion(inv)
      .then((response) => {
        if (response && response?.status < 300) {
          toast.success("Extracción realizada con éxito");
          getInversion();
        } else {
          toast.error("Ha ocurrido un error al realizar la extracción");
        }
      })
      .finally(() => {
        setLoadingInvest(false);
        setOpenRetireModal(false);
      });
  };

  return (
    <>
      <div className="bg-background flex-1 flex flex-col items-center">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center md:max-w-[1050px] my-8">
          <h2 className="text-headline-small-medium">Resumen Financiero</h2>
        </div>
        {loading ? (
          <LoadingPage background="transparent" size="section" />
        ) : investInfo ? (
          <>
            <div className="flex flex-col md:flex-row justify-between gap-3 pb-6 md:pb-16">
              <InfoCard
                title="Monto actual"
                icon={<CashIcon />}
                value={`$${investInfo.currentAmount}`}
              />
              <InfoCard
                title="Ganancia total"
                icon={<GraphIcon />}
                value={`$${investInfo.profit}`}
              />
              <InfoCard
                title="Meses invirtiendo"
                icon={<CalendarIcon />}
                value={investInfo.history.length.toString()}
              />
            </div>
            {loadingGraph ? (
              <LoadingPage background="transparent" size="section" classname="min-h-[364px]" />
            ) : (
              <InvestorGraph
                year={selectedYear}
                setYear={setSelectedYear}
                profitPerMonth={investHistory ?? []}
                startYear={investInfo.initDate.getFullYear()}
              />
            )}
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
          <div className="my-16">
            <BigInfoCard
              buttonText="Invertir"
              icon={<img src="assets/icono-inversor.png" />}
              action={() => setOpenInvestModal(true)}
            >
              Actualmente no tienes inversiones activas registradas en tu
              cuenta.
            </BigInfoCard>
          </div>
        )}
      </div>
      <InvestModal
        openModal={openInvestModal}
        setAction={setInversion}
        setOpenModal={setOpenInvestModal}
        loading={loadingInvest}
        type="invert"
      />
      <InvestModal
        openModal={openRetireModal}
        setAction={setExtraction}
        setOpenModal={setOpenRetireModal}
        loading={loadingInvest}
        maxAmount={investInfo?.currentAmount ?? 0}
        type="extract"
      />
    </>
  );
}

export default DashboardInvestorPage;
