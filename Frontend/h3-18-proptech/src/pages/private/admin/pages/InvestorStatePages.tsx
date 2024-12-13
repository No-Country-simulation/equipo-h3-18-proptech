import { useEffect, useState } from "react";
import { CustomTable, DataTable, HeaderWithPagination } from "../components";
import LoadingPage from "../../../LoadingPage";

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
    let resp = dataValidate;
    if (search) {
      resp = resp.filter((row) =>
        row.fullName.toLowerCase().includes(search.toLowerCase())
      );
    }
    setInvestors(resp.slice((page - 1) * rowsPerPage, page * rowsPerPage));
    setmaxPages(
      resp.length < 1
        ? 1
        : resp.length % rowsPerPage
          ? Math.floor(resp.length / rowsPerPage + 1)
          : Math.floor(resp.length / rowsPerPage)
    );
    setTimeout(() => {
      setLoading(false);
    }, 200);
    // getAllLoans()
    //   .then((response) => {
    //     if (response && response?.status < 300) {
    //       let resp = response.data as LoanData[]
    //       if (search) {
    //         resp = resp.filter(row=>row.fullName.toLowerCase().includes(search.toLowerCase()))
    //       }
    //       setLoans(resp.slice((page-1)*rowsPerPage,page*rowsPerPage));
    //       setmaxPages(resp.length%rowsPerPage ? Math.floor(resp.length/rowsPerPage + 1) :  Math.floor(resp.length/rowsPerPage))
    //     } else {
    //       toast.error("Ha ocurrido un error al obtener los datos");
    //     }
    //   })
    //   .finally(() => setLoading(false));
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

const dataValidate: DataTable[] = [
  {
    investorid: "4d010f99-1d0e-4484-8949-b5f48fe27090",
    fullName: "juan Perez",
    amount: 1200,
    activeMonths: 4,
  },
  {
    investorid: "a143cc03-5dba-4965-abd6-e4e21e3e6b7b",
    fullName: "Carlos gomez",
    amount: 10000,
    activeMonths: 8,
  },
  {
    investorid: "3b454ee6-c2c0-4ce6-930c-4ae4ebdaa3ff",
    fullName: "Gastón Gonzalez",
    amount: 3570.541,
    activeMonths: 14,
  },
];
