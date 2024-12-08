import useTransitionNavigation from "../../../../hooks/useTransitionNavigation";

export interface DataTable {
  dni?: string;
  fullName: string;
  role?: string;
  amount?: number;
  activeMonths?: number;
  financingMount?: string;
  loanRequestId?: string;

  loanId?: string;
  stateLoan?: number;
  lateQuotas?: number;
}

const stateLoanType = ["Atrasado", "Pendiente", "Al día", "Completado"];

interface Props {
  headers: string[];
  data: DataTable[];
}

export function CustomTable({ data, headers }: Props) {
  const navigate = useTransitionNavigation();

  return (
    <>
      <table className=" w-full max-w-[700px] text-base-color text-center bg-contrast drop-shadow-md shadow-md shadow-tertiary">
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
              stateLoan,
              lateQuotas,
              amount,
              activeMonths,
              loanRequestId,
              financingMount,
              loanId,
            }) => (
              <tr className="border-b-2 border-primary h-[76px]" key={dni ?? loanRequestId ?? loanId}>
                <td className=" capitalize">{fullName}</td>
                {role && <td>{role}</td>}
                {stateLoan && (
                  <td
                    className={`${stateLoan === 0 ? "text-error" : stateLoan === 1 ? "text-primary" : stateLoan === 2 ? "text-success" : "text-primaryVar1"} text-title-medium-bold`}
                  >
                    {stateLoanType[stateLoan]}
                  </td>
                )}
                {lateQuotas !== undefined && <td>{lateQuotas}</td>}
                {amount !== undefined && <td>${amount.toFixed(2)}</td>}
                {financingMount !== undefined && <td>${financingMount}</td>}
                {activeMonths !== undefined && <td>{activeMonths}</td>}
                <td
                  className=" cursor-pointer hover:bg-tertiary transition-colors"
                  onClick={() =>
                    navigate(
                      `${dni ? dni : loanRequestId ? loanRequestId : loanId}`
                    )
                  }
                >
                  Ver datos
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      {data.length === 0 && (
        <h3 className="flex text-body-large-regular my-6 w-[90%]  max-w-[700px] justify-center">
          No hay datos para mostrar
        </h3>
      )}
    </>
  );
}

export default CustomTable;
