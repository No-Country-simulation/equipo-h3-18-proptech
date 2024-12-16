import { useEffect, useState } from "react";
import { CustomTable, HeaderWithPagination } from "../components";
import { getAllLoanRequests } from "../../../../services/admin";
import { toast } from "sonner";
import LoadingPage from "../../../LoadingPage";

export interface LoanData {
  fullName: string;
  financingMount: string;
  loanRequestId: string;
}

export function ApproveTablePage() {
  const [loading, setLoading] = useState(true);
  const [loans, setLoans] = useState<LoanData[]>([]);
  const [maxPages, setmaxPages] = useState(1);
  const rowsPerPage = 6;

  useEffect(() => {
    getWithPagination(1);
  }, []);

  const getWithPagination = (page: number, search?: string) => {
    window.scrollTo(0, 0);
    setLoading(true);
    getAllLoanRequests()
      .then((response) => {
        if (response && response?.status < 300) {
          let resp = response.data as LoanData[];
          if (search) {
            resp = resp.filter((row) =>
              row.fullName.toLowerCase().includes(search.toLowerCase())
            );
          }
          setLoans(resp.slice((page - 1) * rowsPerPage, page * rowsPerPage));
          setmaxPages(
            resp.length < 1
              ? 1
              : resp.length % rowsPerPage
                ? Math.floor(resp.length / rowsPerPage + 1)
                : Math.floor(resp.length / rowsPerPage)
          );
        } else {
          toast.error("Ha ocurrido un error al obtener los datos");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <HeaderWithPagination
        title="Aprobar préstamos"
        maxPages={maxPages}
        action={getWithPagination}
      />
      {loading ? (
        <LoadingPage background="transparent" size="section" />
      ) : (
        <CustomTable data={loans} headers={validateHeader} />
      )}
    </>
  );
}

export default ApproveTablePage;

const validateHeader = ["Nombre completo", "Monto a financiar"];
