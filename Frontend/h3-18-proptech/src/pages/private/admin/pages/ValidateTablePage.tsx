import { useEffect, useState } from "react";
import { CustomTable } from "../components/CustomTable";
import { getAllUsersToValidate } from "../../../../services/admin";
import { toast } from "sonner";
import LoadingPage from "../../../LoadingPage";

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
      <h3 className="text-headline-small-medium my-6 w-[90%]  max-w-[700px]">
        Validar identidad
      </h3>
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
