import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailsLoanRequests } from "../../../../services/admin";
import { emptyUser, LoanInfo } from "./ApproveLoanPage";
import { toast } from "sonner";
import LoadingPage from "../../../LoadingPage";
import { ArrowBackIcon } from "../../../../components/icons";
import { useTransitionNavigation } from "../../../../hooks";
import { DataUser, UserData } from "../components";
import { Button } from "../../../../components/common";

export function LoanUserDataPage() {
  let { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [loanInfo, setLoanInfo] = useState<LoanInfo>({
    lotCost: 0,
    downPayment: 0,
    quotasCount: 0,
    guarantor1: emptyUser,
    guarantor2: emptyUser,
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
  const navigate = useTransitionNavigation();

  const goBack = () => {
    navigate(`/admin/loans/${id}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    if (id) {
      getDetailsLoanRequests(id)
        .then((response) => {
          if (response && response?.status < 300) {
            setLoanInfo(response.data);
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
    <div className="bg-[#F8F8F8]">
      <div className="w-[90%] max-w-[1100px] mx-auto my-6">
        <div className="flex">
          <ArrowBackIcon onClick={goBack} className=" cursor-pointer" />
          <h4 className="text-headline-small-medium mb-6 ml-6">
            Datos de usuario
          </h4>
        </div>
        <DataUser data={loanUserInfo} type="usuario" />
        <div className="flex gap-4 my-10 w-[90%] max-w-[1100px]">
          <Button
            size="large"
            color="primary-blue"
            onClick={() => setOpen(!open)}
          >
            Ver garantes
          </Button>
        </div>
        {open && (
          <>
            <DataUser data={loanInfo.guarantor1} type="garante Nº 1" />
            <div className="my-10"></div>
            <DataUser data={loanInfo.guarantor2} type="garante Nº2" />
            <div className="my-10"></div>
          </>
        )}
      </div>
    </div>
  );
}

export default LoanUserDataPage;
