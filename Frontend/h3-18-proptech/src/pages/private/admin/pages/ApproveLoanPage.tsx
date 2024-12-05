import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/common";
import {
  ArrowBackIcon,
  CloseIcon,
  GreenCheckIcon,
} from "../../../../components/icons";
import { InputImage, InputText } from "../components";
import { useState } from "react";
import AproveLoanGuarantors, { GuarantorData } from "./AproveLoanGuarantors";

const file =
  "https://i.pinimg.com/736x/f4/2c/a2/f42ca243c73da80076b92401edb84489.jpg";

export function ApproveLoanPage() {
  const navigate = useNavigate();
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
    setFileChosen({ open: true, src: file });
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

  return (
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
                <InputText title="Nombre">Nombre</InputText>
                <InputText title="Apellido">Apellido</InputText>
              </div>
              <div className="flex gap-4 my-4">
                <InputText title="DNI">DNI</InputText>
                <InputText title="CUIT">CUIT</InputText>
              </div>
              <div className="flex gap-4 my-4">
                <InputText title="Email">Email</InputText>
                <InputText title="Teléfono">Teléfono</InputText>
              </div>
              <div className="flex gap-4 my-4">
                <InputText title="Costo del lote">Costo del lote</InputText>
                <InputText title="Adelanto">Adelanto</InputText>
              </div>
              <div className="flex gap-4 my-4">
                <InputText title="Cantidad de cuotas">
                  Cantidad de cuotas
                </InputText>
                <InputText title="Score crediticio">Score crediticio</InputText>
              </div>
              <div className="flex gap-4 my-8">
                <InputImage title={"Recibo 1"} action={() => viewFile(file)} />
                <InputImage title={"Recibo 2"} action={() => viewFile(file)} />
              </div>
              <div className="flex gap-4 my-8 mb-4">
                <InputImage title={"Recibo 3"} action={() => viewFile(file)} />
                <InputImage title={"Servicio"} action={() => viewFile(file)} />
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
