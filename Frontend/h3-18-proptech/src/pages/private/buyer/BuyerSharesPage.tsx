import { ArrowBackIcon } from "../../../components/icons";
import { BuyerSharesTable } from "./components";
import useTransitionNavigation from "../../../hooks/useTransitionNavigation";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyLoanDetails } from "../../../services/buyer";
import { toast } from "sonner";
import SelectButton from "../../../components/common/SelectButton";
import LoadingPage from "../../LoadingPage";

export interface DetailedLoanInfo {
  page: number;
  totalPages: number;
  stateQuota: null | 0 | 1 | 2;
  loanId: string;
  quotas: Quota[];
}

export interface Quota {
  quotaId: string;
  quotaNumber: string;
  expiredDate: Date;
  stateQuota: number;
  amount: number;
  preferenceID: string;
  expirationDate?: Date;
}

export function BuyerSharesPage() {
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

  const goBack = () => {
    navigate("/buyer");
  };

  useEffect(() => {
    setLoading(true);
    if (id) {
      getMyLoanDetails(id, filterOption, page)
        .then((response) => {
          if (response && response.status < 300) {
            response.data.quotas.forEach((el: Quota) => {
              el.expiredDate = new Date(el.expiredDate);
            });
            setDetailedLoanInfo(response.data);
          } else {
            toast.error(
              "Ha ocurrido un error al obtener los datos del préstamo"
            );
            navigate("/buyer");
          }
        })
        .finally(() => setLoading(false));
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
    <>
      <div className="bg-background md:min-h-[750px] flex flex-col items-center max-w-[1050px] md:mx-auto w-full px-4 sm:px-8 mt-4 mb-8 md:my-8">
        <div className="flex flex-col md:flex-row justify-between w-full items-start gap-y-4 md:items-center mb-8">
          <div className="flex items-center gap-2 md:gap-4">
            <ArrowBackIcon onClick={goBack} className="cursor-pointer h-12 w-12" />
            <h4 className="text-headline-small-medium">Cuotas</h4>
          </div>
          <div className="flex gap-6">
            <div className="flex items-center relative">
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
            </div>
            <div className="flex items-center relative">
              <span className=" text-body-large-regular  mr-3">Página</span>
              <div className="relative flex items-center cursor-pointer w-[65px]">
                <SelectButton
                  selectClassname="bg-primary text-contrast py-[3px] ps-[4px]"
                  arrowClassname="text-contrast"
                  value={page}
                  setValue={setPage}
                  options={pagesOptions}
                />
              </div>
            </div>
          </div>
        </div>
        <BuyerSharesTable data={detailedLoanInfo.quotas} />
      </div>
    </>
  );
}

export default BuyerSharesPage;
