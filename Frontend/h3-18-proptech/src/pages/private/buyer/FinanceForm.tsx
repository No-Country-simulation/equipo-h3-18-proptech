import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormSetValue,
} from "react-hook-form";
import { Button, FileDropzone } from "../../../components/common";
import { FinancingDataForm } from "./models/Financing.models";

interface Props {
  handleSubmit: UseFormHandleSubmit<FinancingDataForm>;
  setValue: UseFormSetValue<FinancingDataForm>;
  errors: FieldErrors<FinancingDataForm>;
  changeGuarantor: () => void;
  onSubmit: (data: FinancingDataForm) => Promise<void>;
}

function FinanceForm({
  handleSubmit,
  setValue,
  errors,
  changeGuarantor,
  onSubmit,
}: Props) {
  return (
    <section className="flex-1 flex flex-col py-6 gap-4 px-4 md:px-16">
      <h1 className="text-headline-medium-medium text-center">
        Solicitud de financiación
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-[800px] flex flex-col gap-4"
      >
        <p className="text-title-large-regular">
          Para solicitar la financiación, es indispensable completar los datos
          del formulario y subir los siguientes documentos en formato JPG o PDF:
        </p>
        <ul className="ps-8 list-disc">
          <li className="text-title-large-regular">
            Los últimos tres recibos de sueldo.
          </li>
          <li className="text-title-large-regular">
            Un comprobante de servicio reciente que valide tu domicilio actual.
          </li>
        </ul>
        <p className="text-title-large-regular">
          Además, deberás completar la información requerida para dos garantes.
        </p>
        <article className="flex flex-col gap-y-6 gap-x-3 transition">
          <FileDropzone
            fileType="both"
            setValue={setValue}
            name="files"
            error={errors.files}
            maxFiles={4}
          />
          <div className="flex gap-4">
            <div className="flex-1 py-2 px-4 shadow-md shadow-tertiary border-[3px] rounded-lg border-primary text-ellipsis max-w-[50vw] whitespace-nowrap overflow-hidden md:w-full">
              Garante nº 1
            </div>
            <Button
              size="small"
              color="primary-blue"
              type="button"
              disabled={true}
            >
              Editar datos
            </Button>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 py-2 px-4 shadow-md shadow-tertiary border-[3px] rounded-lg border-primary text-ellipsis max-w-[50vw] whitespace-nowrap overflow-hidden md:w-full">
              Garante nº 2
            </div>
            <Button
              size="small"
              color="primary-blue"
              type="button"
              disabled={true}
            >
              Editar datos
            </Button>
          </div>
        </article>
        <Button
          color="primary-blue"
          size="large"
          type="button"
          classname="self-center mt-2"
          action={changeGuarantor}
        >
          Agregar Garante
        </Button>
        <Button
          color="primary-orange"
          size="large"
          type="submit"
          classname="self-center mt-2"
        >
          Solicitar Financiación
        </Button>
      </form>
    </section>
  );
}

export default FinanceForm;
