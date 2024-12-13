import { useEffect, useState } from "react";
import { ArrowBackIcon } from "../../../../components/icons";
import { Button } from "../../../../components/common";
import { useTransitionNavigation } from "../../../../hooks";
import { useParams } from "react-router-dom";
import { getDetailsLoan } from "../../../../services/admin";
import { toast } from "sonner";
import LoadingPage from "../../../LoadingPage";
import SelectButton from "../../../../components/common/SelectButton";

interface DetailedLoanInfo {
  page: number;
  totalPages: number;
  stateQuota: null | 0 | 1 | 2;
  loanId: string;
  quotas: {
    quotaId: string;
    quotaNumber: string;
    expiredDate: string;
    stateQuota: 0 | 1 | 2;
    amount: number;
  }[];
}

export function LoanState() {
  let { id } = useParams();
  const navigate = useTransitionNavigation();
  const [loading, setLoading] = useState(true);
  const [detailedLoanInfo, setDetailedLoanInfo] = useState<DetailedLoanInfo>({
    loanId: "",
    page: 1,
    totalPages: 1,
    quotas: [],
    stateQuota: null,
  });
  const [filterOption, setFilterOption] = useState<"" | 0 | 1 | 2>("");
  const [page, setPage] = useState<number>(1);

  const quotasState = {
    0: "Atrasada",
    1: "Pendiente",
    2: "Pagada",
  };

  const goBack = () => {
    navigate("/admin/loans");
  };

  useEffect(() => {
    setLoading(true);
    if (id) {
      getDetailsLoan(id, filterOption, page).then((response) => {
        if (response && response.status < 300) {
          setDetailedLoanInfo(response.data);
          setLoading(false);
        } else {
          toast.error(
            "Ha ocurrido un error al obtener los datos de este préstamo"
          );
          navigate("/admin/loans");
        }
      });
    }
  }, [filterOption, page]);

  const pagesOptions = [];
  for (let index = 1; index <= detailedLoanInfo.totalPages; index++) {
    pagesOptions.push({
      label: `${index < 10 ? `0${index}` : index}`,
      value: index,
    });
  }

  return loading ? (
    <LoadingPage background="transparent" size="page" />
  ) : (
    <section className="bg-background flex-1">
      <div className="w-full flex flex-col gap-4 max-w-[1100px] mx-auto my-6">
        <header className="flex flex-col px-8 md:flex-row md:items-center justify-between gap-x-4 gap-y-6">
          <div className="flex gap-2 md:gap-4 items-center">
            <ArrowBackIcon
              onClick={goBack}
              className=" cursor-pointer h-12 w-12"
            />
            <h4 className="text-headline-small-medium">Datos del préstamo</h4>
          </div>
          <div className="self-end md:self-auto flex flex-col-reverse items-center sm:items-start w-full sm:w-auto sm:flex-row gap-6">
            <SelectButton
              value={filterOption}
              setValue={setFilterOption}
              options={[
                { label: "Filtrar por: Sin Filtro", value: "" },
                { label: "Filtrar por: Atrasadas", value: 0 },
                { label: "Filtrar por: Pendientes", value: 1 },
                { label: "Filtrar por: Pagadas", value: 2 },
              ]}
            />
            <div className="flex gap-2 items-center justify-center text-title-large-semi-bold">
              <span>Página:</span>
              <SelectButton
                selectClassname="bg-primary text-contrast py-[3px] ps-[4px]"
                arrowClassname="text-contrast"
                value={page}
                setValue={setPage}
                options={pagesOptions}
              />
            </div>
          </div>
        </header>

        <section className="flex flex-col gap-10 items-center justify-center px-8">
          <article className="w-full max-w-[500px] flex flex-col gap-4 text-center bg-contrast p-4 shadow-lg shadow-tertiary">
            <h5 className="pt-2 text-headline-small-medium">ID del préstamo</h5>
            <hr className="bg-secondary border border-secondary" />
            <span className="py-3 text-title-large-regular">{id}</span>
          </article>
          {detailedLoanInfo.quotas.length === 0 ? (
            <h1 className="text-center text-title-medium-bold">
              No hay datos para mostrar
            </h1>
          ) : (
            <section className="overflow-x-auto w-full flex items-center justify-center">
              <table className="w-full min-w-[400px] max-w-[900px] text-base-color text-center bg-contrast drop-shadow-md shadow-md shadow-[#00000025]">
                <thead className=" text-title-large-bold bg-primary text-contrast">
                  <tr className="border-b-2 border-primary h-[76px] ">
                    <th>Cuota</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>Monto</th>
                  </tr>
                </thead>
                <tbody className="text-body-large-regular">
                  {detailedLoanInfo.quotas.map((quota) => {
                    return (
                      <tr
                        key={quota.quotaId}
                        className="border-b-2 border-primary h-[76px]"
                      >
                        <td>{quota.quotaNumber}</td>
                        <td>
                          {new Date(quota.expiredDate).toLocaleDateString()}
                        </td>
                        <td
                          className={`${quota.stateQuota === 2 ? "text-success" : quota.stateQuota === 0 ? "text-error" : "text-primary"} text-title-medium-bold`}
                        >
                          {quotasState[quota.stateQuota]}
                        </td>
                        <td>${quota.amount.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          )}
          <Button
            color="primary-blue"
            size="large"
            classname="self-start mt-2"
            onClick={() => navigate("clientDetails")}
          >
            Ver datos del usuario
          </Button>
        </section>
      </div>
    </section>
  );
}
export default LoanState;
