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

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    getAllUsersToValidate()
      .then((response) => {
        if (response && response?.status < 300) {
          setUsers(response.data);
        } else {
          toast.error("Ha ocurrido un error al obtener los datos");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <HeaderWithPagination title="Validar identidad" maxPages={users.length} />
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
