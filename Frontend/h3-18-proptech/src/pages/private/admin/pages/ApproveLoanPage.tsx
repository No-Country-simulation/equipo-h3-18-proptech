import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../../../components/common";
import {
  ArrowBackIcon,
  CloseIcon,
  GreenCheckIcon,
} from "../../../../components/icons";
import { InputImage, InputText } from "../components";
import AproveLoanGuarantors, { GuarantorData } from "./AproveLoanGuarantors";
import useTransitionNavigation from "../../../../hooks/useTransitionNavigation";
import LoadingPage from "../../../LoadingPage";
import { getDetailsLoanRequests } from "../../../../services/admin";
import { toast } from "sonner";

const file =
  "https://i.pinimg.com/736x/f4/2c/a2/f42ca243c73da80076b92401edb84489.jpg";

interface LoanInfo {
  lotCost: number;
  downPayment: number;
  quotasCount: number;
  guarantor1: {
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
  };
  guarantor2: {
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
  };
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

export function ApproveLoanPage() {
  let { id } = useParams();
  const navigate = useTransitionNavigation();
  const [loading, setLoading] = useState(true);
  const [loanInfo, setLoanInfo] = useState<LoanInfo>({
    lotCost: 0,
    downPayment: 0,
    quotasCount: 0,
    guarantor1: {
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
    },
    guarantor2: {
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
    },
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

  const [fileChosen, setFileChosen] = useState({
    open: false,
    src: "",
  });

  const goBack = () => {
    navigate("/admin/approve");
  };

  const viewFile = (file: string) => {
    if (file.endsWith(".pdf")) {
      file = file.replace(".pdf", ".jpg");
      window.open(file, "_blank")?.focus();
    } else setFileChosen({ open: true, src: file });
  };

  const validate1 = (v: boolean) => {
    setGuarantor1(v);
    if (v && guarantor2) {
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    }
  };

  const validate2 = (v: boolean) => {
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

  return loading ? (
    <LoadingPage background="transparent" size="page" />
  ) : (
    <div className="bg-[#F8F8F8]">
      <div className="w-[90%] max-w-[1100px] mx-auto my-6">
        {!open ? (
          <>
            <div className="flex">
              <ArrowBackIcon onClick={goBack} className=" cursor-pointer" />
              <h4 className="text-headline-small-medium mb-6 ml-6">
                Aprobar financiación
              </h4>
            </div>
            <div className="w-[890px] px-6 py-6 text-base-color bg-contrast drop-shadow-md shadow-md shadow-[#00000025] mx-auto">
              <h4 className="text-title-large-regular m-6">
                Información del préstamo solicitado
              </h4>
              <div className="flex gap-4 my-4">
                <InputText title="Nombre">{loanInfo.name}</InputText>
                <InputText title="Apellido">{loanInfo.lastName}</InputText>
              </div>
              <div className="flex gap-4 my-4">
                <InputText title="DNI">{loanInfo.dni}</InputText>
                <InputText title="CUIT">{loanInfo.cuit}</InputText>
              </div>
              <div className="flex gap-4 my-4">
                <InputText title="Email">{loanInfo.email}</InputText>
                <InputText title="Teléfono">{loanInfo.phoneNumber}</InputText>
              </div>
              <div className="flex gap-4 my-4">
                <InputText title="Costo del lote">{loanInfo.lotCost.toString()}</InputText>
                <InputText title="Adelanto">{loanInfo.downPayment.toString()}</InputText>
              </div>
              <div className="flex gap-4 my-4">
                <InputText title="Cantidad de cuotas">
                  {loanInfo.quotasCount.toString()}
                </InputText>
                <InputText title="Score crediticio">{loanInfo.creditScore.toString()}</InputText>
              </div>
              <div className="flex gap-4 my-8">
                <InputImage title={"Recibo 1"} action={() => viewFile(loanInfo.salaryURL)} />
                <InputImage title={"Recibo 2"} action={() => viewFile(loanInfo.salary2URL)} />
              </div>
              <div className="flex gap-4 my-8 mb-4">
                <InputImage title={"Recibo 3"} action={() => viewFile(loanInfo.salary3URL)} />
                <InputImage title={"Servicio"} action={() => viewFile(loanInfo.proofOfAddressURL)} />
              </div>
              <div className="flex gap-4 my-4">
                <div className="relative w-full">
                  <InputText title="Garante 1">Garante 1</InputText>
                  {guarantor1 && (
                    <GreenCheckIcon className="absolute right-2 top-[34px] scale-50" />
                  )}
                </div>
                <div className="relative w-full">
                  <InputText title="Garante 2">Garante 2</InputText>
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
              >
                Validar
              </Button>
              <Button size="small" color="secondary">
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
            <AproveLoanGuarantors
              guarantor={data[0]}
              viewFile={viewFile}
              validate={validate1}
              isValid={guarantor1}
            />
            <AproveLoanGuarantors
              guarantor={data[1]}
              viewFile={viewFile}
              validate={validate2}
              isValid={guarantor2}
            />
          </>
        )}
        <dialog
          onClick={() => setFileChosen({ open: false, src: "" })}
          className={`${fileChosen.open ? "opacity-100" : "opacity-0 scale-0"} transition-opacity fixed h-screen w-screen bg-black bg-opacity-50 z-[100] flex items-center justify-center px-4 top-0`}
        >
          <figure className="relative">
            <img
              src={fileChosen.src}
              alt="Hola Mundo"
              className="max-w-[250px] max-h-[250px] aspect-square md:max-w-[70vw] md:max-h-[70vh]"
            />
            <button
              type="button"
              onClick={() => setFileChosen({ open: false, src: "" })}
            >
              <CloseIcon className="absolute top-2 right-2 h-6 w-6 rounded-full p-1 bg-contrast cursor-pointer hover:bg-tertiary transition-colors" />
            </button>
          </figure>
        </dialog>
      </div>
    </div>
  );
}

export default ApproveLoanPage;

const data: GuarantorData[] = [
  {
    name: "Carlos",
    lastName: "Perez",
    DNI: "12345678",
    CUIT: "20123456783",
    email: "string@string.com",
    phoneNumber: "12345678",
    photo: file,
    front: file,
    back: file,
    salary: file,
    salary2: file,
    salary3: file,
    proofOfAddress: file,
  },
  {
    name: "Juan",
    lastName: "Alvarez",
    DNI: "12345678",
    CUIT: "20123456783",
    email: "string@string.com",
    phoneNumber: "12345678",
    photo: file,
    front: file,
    back: file,
    salary: file,
    salary2: file,
    salary3: file,
    proofOfAddress: file,
  },
];
