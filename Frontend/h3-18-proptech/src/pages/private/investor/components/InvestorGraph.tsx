import { SelectArrowIcon } from "../../../../components/icons";
import GraphBar from "./GraphBar";

interface Props {
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  gananciasPorMes: { mes: number; monto: number }[];
  startYear: number;
}

export function InvestorGraph({
  year,
  setYear,
  gananciasPorMes,
  startYear,
}: Props) {
  const months = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];
  const maxValue =
    [...gananciasPorMes]?.sort((a, b) => b.monto - a.monto)[0]?.monto ?? 0;
  const actualYear = new Date().getFullYear();

  return (
    <>
      <div className="flex w-[300px] bg-primary h-16 rounded-2xl py-2 px-3 justify-between items-center">
        <button className={`w-10 h-10 rounded-lg ${year - 1 < startYear ? "bg-disabled pointer-events-none" : "bg-contrast"}`}>
          <SelectArrowIcon
            className="rotate-90"
            onClick={() => setYear(year - 1 < startYear ? year : year - 1)}
          />
        </button>
        <p className="text-title-large-bold text-contrast select-none">{year}</p>
        <button className={`w-10 h-10 rounded-lg ${year + 1 > actualYear ? "bg-disabled pointer-events-none" : "bg-contrast"}`}>
          <SelectArrowIcon
            className="rotate-270"
            onClick={() => setYear(year + 1 > actualYear ? year : year + 1)}
          />
        </button>
      </div>
      <section className="flex md:justify-between lg:justify-center gap-2 p-4 relative w-[90vw] max-w-[1050px] h-[300px] items-end mx-auto">
        {gananciasPorMes.length > 0 ? (
          months.map((month, index) => {
            return (
              <GraphBar
                key={index + month}
                month={month}
                value={
                  gananciasPorMes.find((ganancia) => ganancia.mes === index)
                    ?.monto ?? 0
                }
                maxValue={maxValue}
              />
            );
          })
        ) : (
          <div className="self-center">No hay datos para mostrar</div>
        )}
      </section>
    </>
  );
}

export default InvestorGraph;
