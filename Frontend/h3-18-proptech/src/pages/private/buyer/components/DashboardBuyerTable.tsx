import { useTransitionNavigation } from "../../../../hooks";
import DownloadPDFButton from "./DownloadPDFButton";

export interface DataBuyerTable {
  idLoan: string;
  currentQuota: string;
  stateLoan: number;
  quotaValue: number;
  nextExpirationDate?: Date;
  remainingAmount?: number;
  payedPercentage?: number;
}

const quotasState = ["Atrasada", "Pendiente", "Al día", "Completa"];

interface Props {
  data: DataBuyerTable[];
  selected: number;
  select: (pos: number) => void;
}

export const DashboardBuyerTable = ({ data, selected, select }: Props) => {
  const navigate = useTransitionNavigation();
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full min-w-[400px] md:max-w-[1050px] text-base-color text-center bg-contrast ">
        <thead className="text-title-medium-bold md:text-title-large-bold bg-primary text-contrast">
          <tr className="border-b border-[#ccc] h-[70px]">
            <th>Prestamo</th>
            <th className="hidden md:table-cell">Cuota</th>
            <th>Valor cuota</th>
            <th>Detalles </th>
            <th>Descargar </th>
          </tr>
        </thead>
        <tbody className="text-title-medium-semi-bold md:text-body-large-regular">
          {data.map(
            ({ currentQuota, stateLoan, quotaValue, idLoan }, index) => (
              <tr
                className={`${data.length > 1 && selected === index ? "border-2 border-secondary hover:bg-tertiary transition cursor-pointer" : "border-b border-[#ccc]"} h-[70px] `}
                key={idLoan}
                onClick={() => select(index)}
              >
                <td
                  className={`text-title-medium-bold ${stateLoan === 2 ? "text-success" : stateLoan === 1 ? "text-primary" : stateLoan === 3 ? "text-primaryVar1" : "text-error"}`}
                >
                  {quotasState[stateLoan]}
                </td>
                <td className="hidden md:table-cell">{currentQuota}</td>
                <td>${quotaValue.toFixed(2)}</td>
                <td
                  className="hover:bg-tertiary cursor-pointer duration-300 transition"
                  onClick={() => navigate(`shares/${idLoan}`)}
                >
                  Ver
                </td>
                <td className="flex justify-center items-center h-[70px]">
                  <DownloadPDFButton
                    classname="hover:bg-tertiary cursor-pointer duration-300"
                    loanId={idLoan}
                  />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardBuyerTable;
