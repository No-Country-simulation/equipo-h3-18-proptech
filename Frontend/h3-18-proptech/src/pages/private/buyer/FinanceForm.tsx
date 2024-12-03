import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Button, FileDropzone } from "../../../components/common";
import { FinancingDataForm } from "./models/Financing.models";
import { Guarantor } from "../../../interfaces/Guarantor";
import { useEffect } from "react";

interface Props {
  handleSubmit: UseFormHandleSubmit<FinancingDataForm>;
  setValue: UseFormSetValue<FinancingDataForm>;
  errors: FieldErrors<FinancingDataForm>;
  changeGuarantor: (id?: number) => void;
  onSubmit: (data: FinancingDataForm) => Promise<void>;
  watch: UseFormWatch<any>;
}

function FinanceForm({
  handleSubmit,
  setValue,
  errors,
  changeGuarantor,
  onSubmit,
  watch,
}: Props) {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const guarantors = watch("guarantors") ?? [];
  const files = watch("files")

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
            files={files}
          />
          {guarantors.map((guarantor: Guarantor, index: number) => (
            <div
              className="flex gap-4"
              key={guarantor.name + guarantor.lastname + index}
            >
              <div className="flex-1 py-2 px-4 shadow-md shadow-tertiary border-[3px] rounded-lg border-primary text-ellipsis max-w-[50vw] whitespace-nowrap overflow-hidden md:w-full items-center flex">
                {`Garante nº ${index + 1}: ${guarantor.name + " " + guarantor.lastname}`}
              </div>
              <Button
                size="small"
                color="primary-blue"
                type="button"
                onClick={() => changeGuarantor(index)}
              >
                Editar datos
              </Button>
            </div>
          ))}
        </article>
        {guarantors.length < 2 ? (
          <Button
            color="primary-blue"
            size="large"
            type="button"
            onClick={() => changeGuarantor()}
            classname="mt-2 self-center"
          >
            Agregar Garante
          </Button>
        ) : (
          <Button
            color="primary-orange"
            size="large"
            type="submit"
            classname="self-center mt-2"
          >
            Solicitar Financiación
          </Button>
        )}
      </form>
    </section>
  );
}

export default FinanceForm;
