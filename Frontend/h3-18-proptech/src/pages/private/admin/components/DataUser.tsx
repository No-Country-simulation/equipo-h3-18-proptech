import { InputImage } from "./InputImage";
import { InputText } from "./InputText";

export interface UserData {
  name: string;
  lastName: string;
  dni: string;
  cuit: string;
  email: string;
  phoneNumber: string;
  selfieURL?: string;
  frontDNIURL?: string;
  backDNIURL?: string;
  creditScore?: number;
  salaryURL?: string;
  salary2URL?: string;
  salary3URL?: string;
  proofOfAddressURL?: string;
}

interface Props {
  data: UserData;
  type: string;
}

export const creditScoreData = [
  "Desconocido",
  "Muy confiable",
  "Confiable",
  "Neutral",
  "Poco confiable",
  "No confiable",
];

export function DataUser({ data, type }: Props) {
  const {
    name,
    lastName,
    dni,
    cuit,
    email,
    phoneNumber,
    creditScore,
    selfieURL,
    frontDNIURL,
    backDNIURL,
    salaryURL,
    salary2URL,
    salary3URL,
    proofOfAddressURL,
  } = data;

  return (
    <>
      <div className="w-[890px] px-6 py-6 text-base-color bg-contrast drop-shadow-md shadow-md shadow-[#00000025] mx-auto">
        <h4 className="text-title-large-regular m-6">Información del {type}</h4>
        <div className="flex gap-4 my-4">
          <InputText title="Nombre">{name}</InputText>
          <InputText title="Apellido">{lastName}</InputText>
        </div>
        <div className="flex gap-4 my-4">
          <InputText title="DNI">{dni}</InputText>
          <InputText title="CUIT">{cuit}</InputText>
        </div>
        <div className="flex gap-4 my-4">
          <InputText title="Email">{email}</InputText>
          <InputText title="Teléfono">{phoneNumber}</InputText>
        </div>
        {creditScore && (
          <div className="flex gap-4 my-4">
            <InputText title="Score crediticio">
              {creditScoreData[creditScore]}
            </InputText>
            <div className="w-full "></div>
          </div>
        )}
        {salaryURL && salary2URL && (
          <div className="flex gap-4 my-8">
            <InputImage title={"Recibo 1"} file={salaryURL} />
            <InputImage title={"Recibo 2"} file={salary2URL} />
          </div>
        )}
        {salary3URL && proofOfAddressURL && (
          <div className="flex gap-4 my-8">
            <InputImage title={"Recibo 3"} file={salary3URL} />
            <InputImage title={"Servicio"} file={proofOfAddressURL} />
          </div>
        )}
        {frontDNIURL && backDNIURL && (
          <div className="flex gap-4 my-8">
            <InputImage title={"Frente del DNI"} file={frontDNIURL} />
            <InputImage title={"Dorso del DNI"} file={backDNIURL} />
          </div>
        )}
        {selfieURL && (
          <div className="flex gap-4 my-8 mb-4">
            <InputImage title={"Selfie"} file={selfieURL} />
            <div className="w-full "></div>
          </div>
        )}
      </div>
    </>
  );
}

export default DataUser;
