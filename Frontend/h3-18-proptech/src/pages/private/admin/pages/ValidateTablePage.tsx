import { useEffect, useState } from "react";
import { CustomTable } from "../components/CustomTable";
import { getAllUsersToValidate } from "../../../../services/admin";
import { toast } from "sonner";
import LoadingPage from "../../../LoadingPage";
import { HeaderWithPagination } from "../components";

export interface ValidateData {
  fullName: string;
  role: string;
  dni: string;
}

export function ValidateTablePage() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<ValidateData[]>([]);
  const [maxPages, setmaxPages] = useState(1);
  const rowsPerPage = 6;

  useEffect(() => {
    getWithPagination(1);
  }, []);

  const getWithPagination = (page: number, search?: string) => {
    window.scrollTo(0, 0);
    setLoading(true);
    getAllUsersToValidate()
      .then((response) => {
        if (response && response?.status < 300) {
          let resp = response.data as ValidateData[];
          if (search) {
            resp = resp.filter((row) =>
              row.fullName.toLowerCase().includes(search.toLowerCase())
            );
          }
          setUsers(resp.slice((page - 1) * rowsPerPage, page * rowsPerPage));
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
        title="Validar identidad"
        maxPages={maxPages}
        action={getWithPagination}
      />
      {loading ? (
        <LoadingPage background="transparent" size="section" />
      ) : (
        <CustomTable data={users} headers={validateHeader} />
      )}
    </>
  );
}

export default ValidateTablePage;

const validateHeader = ["Nombre completo", "Rol"];
