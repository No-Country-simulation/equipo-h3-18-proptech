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

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    getAllLoanRequests()
      .then((response) => {
        if (response && response?.status < 300) {
          setLoans(response.data);
        } else {
          toast.error("Ha ocurrido un error al obtener los datos");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <HeaderWithPagination title="Aprobar préstamos" maxPages={loans.length} />
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
