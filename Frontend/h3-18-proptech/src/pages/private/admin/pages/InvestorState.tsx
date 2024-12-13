import { useParams } from "react-router-dom";
import { ArrowBackIcon } from "../../../../components/icons";
import LoadingPage from "../../../LoadingPage";
import { DataUser, UserData } from "../components";
import { useTransitionNavigation } from "../../../../hooks";
import { useEffect, useState } from "react";
import { getDetailsLoanRequests } from "../../../../services/admin";
import { toast } from "sonner";

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
    creditScore: 0,
    salaryURL: "",
    salary2URL: "",
    salary3URL: "",
    proofOfAddressURL: "",
  });

  const goBack = () => {
    navigate("/admin/investors");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    if (id) {
      getDetailsLoanRequests(id)
        .then((response) => {
          if (response && response?.status < 300) {
            const {
              lotCost,
              downPayment,
              quotasCount,
              guarantor1,
              guarantor2,
              ...userInfo
            } = response.data;
            setLoanUserInfo(userInfo);
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
          <ArrowBackIcon onClick={goBack} className=" cursor-pointer h-12 w-12" />
          <h4 className="text-headline-small-medium">
            Datos del inversor
          </h4>
        </header>
        <DataUser data={loanUserInfo} type="inversor" />
      </div>
    </div>
  );
}

export default InvestorState;
