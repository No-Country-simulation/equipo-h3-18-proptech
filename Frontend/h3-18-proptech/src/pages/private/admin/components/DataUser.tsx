import { useState } from "react";
import { CloseIcon } from "../../../../components/icons";
import { InputImage } from "./InputImage";
import { InputText } from "./InputText";

export interface UserData {
  name: string;
  lastName: string;
  DNI: string;
  CUIT: string;
  email: string;
  phoneNumber: string;
  photo?: string;
  front?: string;
  back?: string;
  salary?: string;
  salary2?: string;
  salary3?: string;
  proofOfAddress?: string;
}

interface Props {
  data: UserData;
  type: string;
}

export function DataUser({ data, type }: Props) {
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
  } = data;

  const [fileChosen, setFileChosen] = useState({
    open: false,
    src: "",
  });

  const viewFile = (file: string) => {
    setFileChosen({ open: true, src: file });
  };

  return (
    <>
      <div className="w-[890px] px-6 py-6 text-base-color bg-contrast drop-shadow-md shadow-md shadow-[#00000025] mx-auto">
        <h4 className="text-title-large-regular m-6">Información del {type}</h4>
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
        {salary && salary2 && (
          <div className="flex gap-4 my-8">
            <InputImage title={"Recibo 1"} action={() => viewFile(salary)} />
            <InputImage title={"Recibo 2"} action={() => viewFile(salary2)} />
          </div>
        )}
        {salary3 && proofOfAddress && (
          <div className="flex gap-4 my-8">
            <InputImage title={"Recibo 3"} action={() => viewFile(salary3)} />
            <InputImage
              title={"Servicio"}
              action={() => viewFile(proofOfAddress)}
            />
          </div>
        )}
        {front && back && (
          <div className="flex gap-4 my-8">
            <InputImage
              title={"Frente del DNI"}
              action={() => viewFile(front)}
            />
            <InputImage title={"Dorso del DNI"} action={() => viewFile(back)} />
          </div>
        )}
        {photo && (
          <div className="flex gap-4 my-8 mb-4">
            <InputImage title={"Selfie"} action={() => viewFile(photo)} />
            <div className="w-full "></div>
          </div>
        )}
      </div>
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
    </>
  );
}

export default DataUser;
