import { useParams } from "react-router-dom";
import { ArrowBackIcon } from "../../../../components/icons";
import LoadingPage from "../../../LoadingPage";
import { DataUser, UserData } from "../components";
import { useTransitionNavigation } from "../../../../hooks";
import { useEffect, useState } from "react";
import { getUserToValidate } from "../../../../services/admin";
import { toast } from "sonner";

interface ResponseData {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dni: string;
  cuit: string;
  photo: string;
  frontDNI: string;
  backDNI: string;
}

export function InvestorState() {
  let { id } = useParams();
  const navigate = useTransitionNavigation();
  const [loading, setLoading] = useState(true);

  const [loanUserInfo, setLoanUserInfo] = useState<UserData>({
    name: "",
    lastName: "",
    dni: "",
    cuit: "",
    email: "",
    phoneNumber: "",
    selfieURL: "",
    frontDNIURL: "",
    backDNIURL: "",
  });

  const goBack = () => {
    navigate("/admin/investors");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    if (id) {
      getUserToValidate(id)
        .then((response) => {
          if (response && response?.status < 300) {
            let data = response.data as ResponseData;
            const { photo, frontDNI, backDNI, ...rest } = data;
            let tableData: UserData = {
              selfieURL: photo,
              frontDNIURL: frontDNI,
              backDNIURL: backDNI,
              ...rest,
            };
            setLoanUserInfo(tableData);
          } else {
            toast.error("Ha ocurrido un error al obtener los datos");
          }
        })
        .finally(() => setLoading(false));
    }
  }, []);

  return loading ? (
    <LoadingPage background="transparent" size="page" />
  ) : (
    <div className="bg-background">
      <div className="w-full max-w-[1000px] mx-auto my-6 px-4">
        <header className="flex gap-2 md:gap-4 items-center mb-4 md:mb-6">
          <ArrowBackIcon
            onClick={goBack}
            className=" cursor-pointer h-12 w-12"
          />
          <h4 className="text-headline-small-medium">Datos del inversor</h4>
        </header>
        <DataUser data={loanUserInfo} type="inversor" />
      </div>
    </div>
  );
}

export default InvestorState;
