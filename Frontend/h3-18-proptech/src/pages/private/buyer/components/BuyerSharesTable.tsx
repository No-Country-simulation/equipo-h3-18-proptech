export interface DataBuyerSharesTable {
  share: number;
  date: Date;
  state: "paid" | "pending" | "overdue";
  total: number;
  pay: boolean;
}

interface Props {
  data: DataBuyerSharesTable[];
  shares: number;
}

export function BuyerSharesTable({ data, shares }: Props) {
  return (
    <>
      <table className="w-[1050px] text-base-color text-center bg-contrast ">
        <thead className=" text-headline-small-bold">
          <tr className="border-b-2 border-[#ccc] h-[70px] ">
            <th>Cuotas</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Monto</th>
            <th>Abonar </th>
          </tr>
        </thead>
        <tbody className="text-headline-small-medium">
          {data.map(({ date, share, state, total, pay }) => (
            <tr className="border-b-2 border-[#ccc] h-[70px]">
              <td>
                {share}/{shares}
              </td>
              <td>{date.toLocaleDateString()}</td>
              <td
                className={`text-headline-small-bold ${state === "paid" ? "text-success" : state === "pending" ? "text-primary" : "text-error"}`}
              >
                {state === "paid"
                  ? "Pagado"
                  : state === "pending"
                    ? "Pendiente"
                    : "Atrasado"}
              </td>
              <td>${total}</td>
              <td className={`${pay ? "cursor-pointer" : "text-primaryVar1"}`}>
                Pagar
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default BuyerSharesTable;
