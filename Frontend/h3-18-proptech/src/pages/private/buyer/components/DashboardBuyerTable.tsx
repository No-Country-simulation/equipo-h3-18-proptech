import { Link } from "react-router-dom";
import { PdfIconSmall } from "../../../../components/icons";

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
  return (
    <>
      <table className="w-[350px] md:w-[1050px] text-base-color text-center bg-contrast ">
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
                className={`${selected === index ? "bg-tertiary" : ""} border-b border-[#ccc] h-[70px] hover:bg-tertiary transition cursor-pointer`}
                key={idLoan}
                onClick={() => select(index)}
              >
                <td
                  className={`${stateLoan === 2 ? "text-success" : stateLoan === 1 ? "text-primary" : stateLoan === 3 ? "text-primaryVar1" : "text-error"}`}
                >
                  {quotasState[stateLoan]}
                </td>
                <td className="hidden md:table-cell">{currentQuota}</td>
                <td>${quotaValue.toFixed(2)}</td>
                <td className="hover:bg-contrast transition">
                  <Link to={`shares/${idLoan}`}>Ver</Link>
                </td>
                <td className="flex justify-center items-center h-[70px] hover:bg-contrast">
                  <PdfIconSmall />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  );
};

export default DashboardBuyerTable;
