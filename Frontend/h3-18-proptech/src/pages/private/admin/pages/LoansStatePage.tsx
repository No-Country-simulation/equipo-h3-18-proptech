import { useEffect, useState } from "react";
import { CustomTable } from "../components/CustomTable";
import { getAllLoans } from "../../../../services/admin";
import { toast } from "sonner";
import LoadingPage from "../../../LoadingPage";

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
      <h3 className="text-headline-small-medium my-6 w-[90%]  max-w-[700px]">
        Estado de prestamos
      </h3>
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
