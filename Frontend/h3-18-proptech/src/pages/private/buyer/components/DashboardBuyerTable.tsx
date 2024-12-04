import { Link } from "react-router-dom";

export interface DataBuyerTable {
  loan: "paid" | "pending" | "overdue";
  shares: number;
  total: number;
  pay: boolean;
}

interface Props {
  data: DataBuyerTable[];
}

export const DashboardBuyerTable = ({ data }: Props) => {
  return (
    <>
      <table className="w-[350px] md:w-[1050px] text-base-color text-center bg-contrast ">
        <thead className="text-title-medium-bold md:text-headline-small-bold">
          <tr className="border-b-2 border-[#ccc] h-[70px]">
            <th>Prestamo</th>
            <th className="hidden md:table-cell">Cuotas</th>
            <th >Total</th>
            <th>Abonar </th>
          </tr>
        </thead>
        <tbody className="text-title-medium-semi-bold md:text-headline-small-medium">
          {data.map(({ loan, shares, total, pay }) => (
            <tr className="border-b-2 border-[#ccc] h-[70px]">
              <td
                className={`text-title-medium-bold md:text-headline-small-bold ${loan === "paid" ? "text-success" : loan === "pending" ? "text-primary" : "text-error"}`}
              >
                {loan === "paid"
                  ? "Pagado"
                  : loan === "pending"
                    ? "Pendiente"
                    : "Atrasado"}
              </td>
              <td className="hidden md:table-cell">{shares}</td>
              <td>${total}</td>
              <td>
                <Link to={"/shares"}>{pay ? "Pagar" : "Ver"}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DashboardBuyerTable;
