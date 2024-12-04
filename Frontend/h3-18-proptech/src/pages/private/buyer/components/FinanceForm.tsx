import { useEffect } from "react";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import {
  Button,
  FileDropzone,
  NumberInput,
  SelectInput,
} from "../../../../components/common";
import { FinancingDataForm } from "../models";
import { Guarantor } from "../../../../interfaces";

interface Props {
  handleSubmit: UseFormHandleSubmit<FinancingDataForm>;
  setValue: UseFormSetValue<FinancingDataForm>;
  errors: FieldErrors<FinancingDataForm>;
  changeGuarantor: (id?: number) => void;
  onSubmit: (data: FinancingDataForm) => Promise<void>;
  watch: UseFormWatch<any>;
  register: UseFormRegister<any>;
}

export function FinanceForm({
  handleSubmit,
  setValue,
  errors,
  changeGuarantor,
  onSubmit,
  watch,
  register,
}: Props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const guarantors = watch("guarantors") ?? [];
  const salaryReceipt1 = watch("salaryReceipt1");
  const salaryReceipt2 = watch("salaryReceipt2");
  const salaryReceipt3 = watch("salaryReceipt3");
  const homeReceipt = watch("homeReceipt");

  return (
    <section className="flex-1 flex flex-col py-6 gap-4 px-4 md:px-16 max-w-[1000px] mx-auto">
      <h1 className="text-headline-medium-medium text-start w-full">
        Solicitud de financiación
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto md:px-16 flex flex-col gap-4"
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
        <article className="flex flex-col gap-4">
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
            <NumberInput
              register={register}
              label="Costo del Lote"
              name="lotCost"
              error={errors.lotCost}
            />
            <NumberInput
              register={register}
              label="Adelanto"
              name="downPayment"
              error={errors.downPayment}
            />
            <SelectInput
              register={register}
              label="Cantidad de Cuotas"
              name="quotasCount"
              error={errors.quotasCount}
              options={[
                6, 9, 12, 18, 24, 30, 36, 48, 60, 72, 84, 96, 120, 150, 180,
              ].map((month) => ({
                value: month,
                label: `${month} meses`,
              }))}
            />
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
            <FileDropzone
              fileType="both"
              setValue={setValue}
              name="salaryReceipt1"
              error={errors.salaryReceipt1}
              file={salaryReceipt1}
              label="Recibo de Sueldo #1"
            />

            <FileDropzone
              fileType="both"
              setValue={setValue}
              name="salaryReceipt2"
              error={errors.salaryReceipt2}
              file={salaryReceipt2}
              label="Recibo de Sueldo #2"
            />

            <FileDropzone
              fileType="both"
              setValue={setValue}
              name="salaryReceipt3"
              error={errors.salaryReceipt3}
              file={salaryReceipt3}
              label="Recibo de Sueldo #3"
            />

            <FileDropzone
              fileType="both"
              setValue={setValue}
              name="homeReceipt"
              error={errors.homeReceipt}
              file={homeReceipt}
              label="Comprobante de Domicilio"
            />
          </section>

          {guarantors.map((guarantor: Guarantor, index: number) => (
            <div
              className="flex gap-4 px-2 md:px-8 items-center justify-center sm:justify-start"
              key={guarantor.name + guarantor.lastname + index}
            >
              <div className="flex-1 py-2 px-4 shadow-md shadow-tertiary border-[3px] rounded-lg border-primary max-w-[50vw] sm:max-w-full truncate items-center flex">
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
