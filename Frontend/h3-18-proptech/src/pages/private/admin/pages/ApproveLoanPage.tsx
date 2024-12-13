import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../../../components/common";
import { ArrowBackIcon, GreenCheckIcon } from "../../../../components/icons";
import {
  creditScoreData,
  DataUser,
  InputImage,
  InputText,
} from "../components";
import useTransitionNavigation from "../../../../hooks/useTransitionNavigation";
import LoadingPage from "../../../LoadingPage";
import {
  getDetailsLoanRequests,
  rejectLoan,
  validateLoan,
} from "../../../../services/admin";
import { toast } from "sonner";

export interface LoanInfo {
  lotCost: number;
  downPayment: number;
  quotasCount: number;
  guarantor1: GuarantorData;
  guarantor2: GuarantorData;
  name: string;
  lastName: string;
  dni: string;
  cuit: string;
  email: string;
  phoneNumber: string;
  creditScore: number;
  salaryURL: string;
  salary2URL: string;
  salary3URL: string;
  proofOfAddressURL: string;
}

interface GuarantorData {
  selfieURL: string;
  frontDNIURL: string;
  backDNIURL: string;
  name: string;
  lastName: string;
  dni: string;
  cuit: string;
  email: string;
  phoneNumber: string;
  creditScore: number;
  salaryURL: string;
  salary2URL: string;
  salary3URL: string;
  proofOfAddressURL: string;
}

export const emptyUser = {
  selfieURL: "",
  frontDNIURL: "",
  backDNIURL: "",
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
};

export function ApproveLoanPage() {
  let { id } = useParams();
  const navigate = useTransitionNavigation();
  const [loading, setLoading] = useState(true);
  const [loadingAccept, setLoadingAccept] = useState(false);
  const [loadingReject, setLoadingreject] = useState(false);
  const [loadingGuar1, setLoadingGuar1] = useState(false);
  const [loadingGuar2, setLoadingGuar2] = useState(false);
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
  const [guarantor1, setGuarantor1] = useState(false);
  const [guarantor2, setGuarantor2] = useState(false);
  const [open, setOpen] = useState(false);

  const goBack = () => {
    navigate("/admin/approve");
  };

  const validateGuarantor1 = (v: boolean) => {
    setLoadingGuar1(true);
    setTimeout(() => {
      setLoadingGuar1(false);
      v
        ? toast.success("Garante Nº 1 validado")
        : toast.error("Garante Nº 1 rechazado");
    }, 500);
    setGuarantor1(v);
    if (v && guarantor2) {
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    }
  };

  const validateGuarantor2 = (v: boolean) => {
    setLoadingGuar2(true);
    setTimeout(() => {
      setLoadingGuar2(false);
      v
        ? toast.success("Garante Nº 2 validado")
        : toast.error("Garante Nº 2 rechazado");
    }, 500);
    setGuarantor2(v);
    if (guarantor1 && v) {
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    if (id) {
      getDetailsLoanRequests(id)
        .then((response) => {
          if (response && response?.status < 300) {
            setLoanInfo(response.data);
          } else {
            toast.error("Ha ocurrido un error al obtener los datos");
          }
        })
        .finally(() => setLoading(false));
    }
  }, []);

  const acceptLoan = () => {
    setLoadingAccept(true);
    if (id) {
      validateLoan(id)
        .then((response) => {
          if (response && response?.status < 300) {
            toast.success("Préstamo validado");
            setTimeout(() => {
              goBack();
            }, 500);
          } else {
            toast.error("Ha ocurrido un error al obtener los datos");
          }
        })
        .finally(() => setLoadingAccept(false));
    }
  };

  const declineLoan = () => {
    setLoadingreject(true);
    if (id) {
      rejectLoan(id)
        .then((response) => {
          if (response && response?.status < 300) {
            toast.error("Préstamo rechazado");
            setTimeout(() => {
              goBack();
            }, 500);
          } else {
            toast.error("Ha ocurrido un error al obtener los datos");
          }
        })
        .finally(() => setLoadingreject(false));
    }
  };

  return loading ? (
    <LoadingPage background="transparent" size="page" />
  ) : (
    <div className="bg-background">
      <div className="w-full max-w-[1000px] mx-auto my-6 px-4">
        {!open ? (
          <>
            <header className="flex gap-2 md:gap-4 items-center mb-4 md:mb-6">
              <ArrowBackIcon onClick={goBack} className=" cursor-pointer h-12 w-12" />
              <h4 className="text-headline-small-medium">
                Aprobar financiación
              </h4>
            </header>
            <div className="max-w-[890px] px-6 py-6 text-base-color bg-contrast drop-shadow-md shadow-md shadow-[#00000025] mx-auto">
              <h4 className="text-title-large-regular sm:m-6">
                Información del préstamo solicitado
              </h4>
              <div className="flex flex-col md:flex-row gap-4 my-4">
                <InputText title="Nombre">{loanInfo.name}</InputText>
                <InputText title="Apellido">{loanInfo.lastName}</InputText>
              </div>
              <div className="flex flex-col md:flex-row gap-4 my-4">
                <InputText title="DNI">{loanInfo.dni}</InputText>
                <InputText title="CUIT">{loanInfo.cuit}</InputText>
              </div>
              <div className="flex flex-col md:flex-row gap-4 my-4">
                <InputText title="Email">{loanInfo.email}</InputText>
                <InputText title="Teléfono">{loanInfo.phoneNumber}</InputText>
              </div>
              <div className="flex flex-col md:flex-row gap-4 my-4">
                <InputText title="Costo del lote">
                  {loanInfo.lotCost.toString()}
                </InputText>
                <InputText title="Adelanto">
                  {loanInfo.downPayment.toString()}
                </InputText>
              </div>
              <div className="flex flex-col md:flex-row gap-4 my-4">
                <InputText title="Cantidad de cuotas">
                  {loanInfo.quotasCount.toString()}
                </InputText>
                <InputText title="Score crediticio">
                  {creditScoreData[loanInfo.creditScore]}
                </InputText>
              </div>
              <div className="flex flex-col md:flex-row gap-y-8 gap-x-4 my-8">
                <InputImage title={"Recibo 1"} file={loanInfo.salaryURL} />
                <InputImage title={"Recibo 2"} file={loanInfo.salary2URL} />
              </div>
              <div className="flex flex-col md:flex-row gap-y-8 gap-x-4 my-8 mb-4">
                <InputImage title={"Recibo 3"} file={loanInfo.salary3URL} />
                <InputImage
                  title={"Servicio"}
                  file={loanInfo.proofOfAddressURL}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-y-8 gap-x-4 my-4">
                <div className="relative w-full">
                  <InputText title="Garante 1">
                    {`${loanInfo.guarantor1.name} ${loanInfo.guarantor1.lastName}`}
                  </InputText>
                  {guarantor1 && (
                    <GreenCheckIcon className="absolute right-2 top-[34px] scale-50" />
                  )}
                </div>
                <div className="relative w-full">
                  <InputText title="Garante 2">{`${loanInfo.guarantor2.name} ${loanInfo.guarantor2.lastName}`}</InputText>
                  {guarantor2 && (
                    <GreenCheckIcon className="absolute right-2 top-[34px] scale-50" />
                  )}
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button
                  size="large"
                  color="primary-blue"
                  onClick={() => setOpen(true)}
                >
                  Ver garantes
                </Button>
              </div>
            </div>
            <div className="flex justify-center gap-4 my-6">
              <Button
                size="small"
                color={`${guarantor1 && guarantor2 ? "primary-blue" : "disabled"}`}
                onClick={acceptLoan}
                isLoading={loadingAccept}
              >
                Validar
              </Button>
              <Button
                size="small"
                color="secondary"
                onClick={declineLoan}
                isLoading={loadingReject}
              >
                Rechazar
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex">
              <ArrowBackIcon
                onClick={() => setOpen(false)}
                className=" cursor-pointer"
              />
              <h4 className="text-headline-small-medium mb-6 ml-6">
                Aprobar Garantes
              </h4>
            </div>
            <DataUser data={loanInfo.guarantor1} type="garante Nº 1" />
            <div className="flex justify-center gap-4 my-6">
              <Button
                size="small"
                color="primary-blue"
                onClick={() => validateGuarantor1(true)}
                isLoading={loadingGuar1 && guarantor1}
              >
                Aprobar
              </Button>
              <Button
                size="small"
                color="secondary"
                onClick={() => validateGuarantor1(false)}
                isLoading={loadingGuar1 && !guarantor1}
              >
                Rechazar
              </Button>
            </div>
            <DataUser data={loanInfo.guarantor2} type="garante Nº2" />
            <div className="flex justify-center gap-4 my-6">
              <Button
                size="small"
                color="primary-blue"
                onClick={() => validateGuarantor2(true)}
                isLoading={loadingGuar2 && guarantor2}
              >
                Aprobar
              </Button>
              <Button
                size="small"
                color="secondary"
                onClick={() => validateGuarantor2(false)}
                isLoading={loadingGuar2 && !guarantor2}
              >
                Rechazar
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ApproveLoanPage;
