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
  investorid?: string;
}

const stateLoanType = ["Atrasado", "Pendiente", "Al día", "Completado"];

interface Props {
  headers: string[];
  data: DataTable[];
}

export function CustomTable({ data, headers }: Props) {
  const navigate = useTransitionNavigation();

  return (
    <section className="w-[70vw] lg:w-[80vw] overflow-x-auto max-w-[900px] mb-8">
      <table className="min-w-[500px] w-full text-base-color text-center bg-contrast">
        <thead className="text-title-large-bold bg-primary text-contrast">
          <tr className="border-b-2 border-primary h-[76px]">
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
              investorid,
            }) => (
              <tr
                className="border-b-2 border-primary h-[76px]"
                key={dni ?? loanRequestId ?? loanId ?? investorid}
              >
                <td className="capitalize w-1/3">{fullName}</td>
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
                      `${dni ? dni : loanRequestId ? loanRequestId : loanId ? loanId : investorid}`
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
        <h3 className="flex text-body-large-regular my-6 justify-center">
          No hay datos para mostrar
        </h3>
      )}
    </section>
  );
}

export default CustomTable;
