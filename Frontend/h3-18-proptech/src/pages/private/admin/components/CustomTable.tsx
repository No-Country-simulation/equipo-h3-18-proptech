import { useNavigate } from "react-router-dom";

export interface DataTable {
  dni?: string;
  fullName: string;
  role?: string;
  state?: "Atrasado" | "Pagado";
  overdue?: number;
  amount?: number;
  activeMonths?: number;
  financingMount?: string
  loanRequestId?: string
}

interface Props {
  headers: string[];
  data: DataTable[];
}

export function CustomTable({ data, headers }: Props) {
  const navigate = useNavigate()

  return (
    <>
      <table className=" w-[90%] max-w-[700px] text-base-color text-center bg-contrast drop-shadow-md shadow-md shadow-[#00000025]">
        <thead className=" text-title-large-bold bg-primary text-contrast">
          <tr className="border-b-2 border-primary h-[76px] ">
            {headers.map((title) => (
              <th key={title}>{title}</th>
            ))}
            <th className="w-1/5">Datos</th>
          </tr>
        </thead>
        <tbody className="text-body-large-regular">
          {data.map(
            ({
              fullName,
              role,
              dni,
              state,
              overdue,
              amount,
              activeMonths,
              loanRequestId,
              financingMount
            }) => (
              <tr className="border-b-2 border-primary h-[76px]" key={dni}>
                <td className=" capitalize">{fullName}</td>
                {role && <td>{role}</td>}
                {state && (
                  <td
                    className={`${state === "Pagado" ? "text-success" : "text-error"} text-title-medium-bold`}
                  >
                    {state}
                  </td>
                )}
                {overdue !== undefined && <td>{overdue}</td>}
                {amount !== undefined && <td>${amount.toFixed(2)}</td>}
                {financingMount !== undefined && <td>${financingMount}</td>}
                {activeMonths !== undefined && <td>{activeMonths}</td>}
                <td
                  className=" cursor-pointer hover:bg-tertiary"
                  onClick={()=>navigate(`${dni ? dni : loanRequestId}`)}
                >
                  Ver datos
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      {data.length === 0 && <h3 className="flex text-body-large-regular my-6 w-[90%]  max-w-[700px] justify-center">
        No hay datos para mostrar
      </h3>}
    </>
  );
}

export default CustomTable;
