import { Link } from "react-router-dom";
import { PdfIconSmall } from "../../../../components/icons";

export interface DataBuyerTable {
  id: number;
  loan: "paid" | "pending" | "overdue";
  shares: number;
  total: number;
}

interface Props {
  data: DataBuyerTable[];
  selected: number;
  select: (pos: number) => void;
}

export const DashboardBuyerTable = ({ data, selected, select }: Props) => {
  return (
    <>
      <table className="w-[350px] md:w-[1050px] text-base-color text-center bg-contrast ">
        <thead className="text-title-medium-bold md:text-headline-small-bold bg-primary text-contrast">
          <tr className="border-b border-[#ccc] h-[70px]">
            <th>Prestamo</th>
            <th className="hidden md:table-cell">Cuota</th>
            <th>Valor cuota</th>
            <th>Detalles </th>
            <th>Descargar </th>
          </tr>
        </thead>
        <tbody className="text-title-medium-semi-bold md:text-headline-small-medium">
          {data.map(({ loan, shares, total, id }, index) => (
            <tr
              className={`${selected === index ? "bg-tertiary" : ""} border-b border-[#ccc] h-[70px] hover:bg-tertiary`}
              onClick={() => select(index)}
            >
              <td
                className={`text-title-medium-bold md:text-headline-small-bold ${loan === "paid" ? "text-success" : loan === "pending" ? "text-primary" : "text-error"}`}
              >
                {loan === "paid"
                  ? "Al día"
                  : loan === "pending"
                    ? "Pendiente"
                    : "Atrasado"}
              </td>
              <td className="hidden md:table-cell">
                {shares}/{data.length}
              </td>
              <td>${total}</td>
              <td>
                <Link to={`shares/${id}`}>Ver</Link>
              </td>
              <td className="flex justify-center items-center h-[70px]">
                <PdfIconSmall />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DashboardBuyerTable;
