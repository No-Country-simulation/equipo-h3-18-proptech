import { Button, Loader } from "../../../../components/common";
import { GreenCheckIcon, RedXIcon } from "../../../../components/icons";
import { InputImage, InputText } from "../components";
import { useState } from "react";

export interface GuarantorData {
  name: string;
  lastName: string;
  DNI: string;
  CUIT: string;
  email: string;
  phoneNumber: string;
  photo: string;
  front: string;
  back: string;
  salary: string;
  salary2: string;
  salary3: string;
  proofOfAddress: string;
}

interface GuarantorProps {
  guarantor: GuarantorData;
  viewFile: (v: string) => void;
  validate: (v: boolean) => void;
  isValid: boolean 
}

export function AproveLoanGuarantors({
  guarantor,
  viewFile,
  validate,
  isValid
}: GuarantorProps) {
  const {
    name,
    lastName,
    DNI,
    CUIT,
    email,
    phoneNumber,
    photo,
    front,
    back,
    salary,
    salary2,
    salary3,
    proofOfAddress,
  } = guarantor;
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(false);

  const handleValidate = (v: boolean) => {
    setShow(true)
    setLoader(true);
    validate(v);
    setTimeout(() => {
      setLoader(false);
    }, 500);
  };

  return (
    <>
      <div className="w-[890px] px-6 py-6 text-base-color bg-contrast drop-shadow-md shadow-md shadow-[#00000025] mx-auto">
        <h4 className="text-title-large-regular m-6">Datos del Garante</h4>
        <div className="flex gap-4 my-4">
          <InputText title="Nombre">{name}</InputText>
          <InputText title="Apellido">{lastName}</InputText>
        </div>
        <div className="flex gap-4 my-4">
          <InputText title="DNI">{DNI}</InputText>
          <InputText title="CUIT">{CUIT}</InputText>
        </div>
        <div className="flex gap-4 my-4">
          <InputText title="Email">{email}</InputText>
          <InputText title="Teléfono">{phoneNumber}</InputText>
        </div>
        <div className="flex gap-4 my-8">
          <InputImage title={"Frente del DNI"} action={() => viewFile(front)} />
          <InputImage title={"Dorso del DNI"} action={() => viewFile(back)} />
        </div>
        <div className="flex gap-4 my-8">
          <InputImage title={"Selfie"} action={() => viewFile(photo)} />
          <InputImage title={"Recibo 1"} action={() => viewFile(salary)} />
        </div>
        <div className="flex gap-4 my-8">
          <InputImage title={"Recibo 2"} action={() => viewFile(salary2)} />
          <InputImage title={"Recibo 3"} action={() => viewFile(salary3)} />
        </div>
        <div className="flex gap-4 my-8 mb-4">
          <InputImage
            title={"Servicio"}
            action={() => viewFile(proofOfAddress)}
          />
          <div className="w-full flex items-center text-headline-small-medium justify-center">
            {show ? loader ? (
              <Loader />
            ) : isValid ? (
                <>
                  <span className="text-success">Validado</span>
                  <GreenCheckIcon className="h-12" />
                </>
              ) : (
                <>
                  <span className="text-error">Rechazado</span>
                  <RedXIcon className="h-12" />
                </>
                    ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4 my-6">
        <Button
          size="small"
          color="primary-blue"
          onClick={() => handleValidate(true)}
        >
          Aprobar
        </Button>
        <Button
          size="small"
          color="secondary"
          onClick={() => handleValidate(false)}
        >
          Rechazar
        </Button>
      </div>
    </>
  );
}

export default AproveLoanGuarantors;
