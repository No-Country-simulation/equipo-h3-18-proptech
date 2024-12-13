import { useEffect, useState } from "react";
import { CustomTable } from "../components/CustomTable";
import { getAllLoans } from "../../../../services/admin";
import { toast } from "sonner";
import LoadingPage from "../../../LoadingPage";
import { HeaderWithPagination } from "../components";

interface LoanData {
  loanId: string;
  fullName: string;
  stateLoan: number;
  lateQuotas: number;
}

export function LoansStatePage() {
  const [loading, setLoading] = useState(true);
  const [loans, setLoans] = useState<LoanData[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    getAllLoans()
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
      <HeaderWithPagination title="Estado de préstamos" maxPages={loans.length} />
      {loading ? (
        <LoadingPage background="transparent" size="section" />
      ) : (
        <CustomTable data={loans} headers={validateHeader} />
      )}
    </>
  );
}

export default LoansStatePage;

const validateHeader = ["Nombre completo", "Estado", "Cuotas atrasadas"];
