import { useEffect, useState } from "react";
import { CustomTable, DataTable, HeaderWithPagination } from "../components";
import LoadingPage from "../../../LoadingPage";
import { getAllInversions } from "../../../../services";
import { toast } from "sonner";

interface InvestorData {
  fullName: string;
  investAmount: number;
  activeMonths: number;
  dni: string;
}

export function InvestorStatePages() {
  const [loading, setLoading] = useState(true);
  const [investors, setInvestors] = useState<DataTable[]>([]);
  const [maxPages, setmaxPages] = useState(1);
  const rowsPerPage = 6;

  useEffect(() => {
    getWithPagination(1);
  }, []);

  const getWithPagination = (page: number, search?: string) => {
    window.scrollTo(0, 0);
    setLoading(true);
    getAllInversions()
      .then((response) => {
        if (response && response?.status < 300) {
          let resp = response.data as InvestorData[];
          if (search) {
            resp = resp.filter((row) =>
              row.fullName.toLowerCase().includes(search.toLowerCase())
            );
          }
          setInvestors(
            resp.slice((page - 1) * rowsPerPage, page * rowsPerPage)
          );
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
        title="Estado de inversiones"
        maxPages={maxPages}
        action={getWithPagination}
      />
      {loading ? (
        <LoadingPage background="transparent" size="section" />
      ) : (
        <CustomTable data={investors} headers={validateHeader} />
      )}
    </>
  );
}

export default InvestorStatePages;

const validateHeader = ["Nombre completo", "Monto invertido", "Meses activos"];
