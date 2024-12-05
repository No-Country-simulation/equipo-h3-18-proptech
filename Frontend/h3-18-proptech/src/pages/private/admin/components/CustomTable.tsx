import { useNavigate } from "react-router-dom";

export interface DataTable {
  id: number;
  name: string;
  role?: string;
  state?: "Atrasado" | "Pagado";
  overdue?: number;
  amount?: number;
  activeMonths?: number;
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
              <th>{title}</th>
            ))}
            <th className="w-1/5">Datos</th>
          </tr>
        </thead>
        <tbody className="text-body-large-regular">
          {data.map(
            ({
              name,
              role,
              id,
              state,
              overdue,
              amount,
              activeMonths,
            }) => (
              <tr className="border-b-2 border-primary h-[76px]" key={id}>
                <td className=" capitalize">{name}</td>
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
                {activeMonths !== undefined && <td>{activeMonths}</td>}
                <td
                  className=" cursor-pointer hover:bg-tertiary"
                  onClick={()=>navigate(`${id}`)}
                >
                  Ver datos
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  );
}

export default CustomTable;
