import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  Button,
  FileDropzone,
  NumberInput,
  SelectInput,
  TextFieldWithIcon,
  TextInput,
} from "../../../../components/common";
import { RequestLoanForm } from "../models";
import { Guarantor } from "../../../../interfaces";
import { useTransitionNavigation } from "../../../../hooks";
import { sendLoanRequest } from "../../../../services/buyer";
import { toast } from "sonner";

export function LoanForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<RequestLoanForm>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useTransitionNavigation();

  const guarantors = watch("guarantors") ?? [];
  const salaryReceipt1 = watch("salaryReceipt1");
  const salaryReceipt2 = watch("salaryReceipt2");
  const salaryReceipt3 = watch("salaryReceipt3");
  const homeReceipt = watch("homeReceipt");

  const [isSendingForm, setIsSendingForm] = useState(false);

  const onSubmit = async (data: RequestLoanForm) => {
    setIsSendingForm(true);
    const form = new FormData();

    form.append("Salary", data.salaryReceipt1);
    form.append("Salary2", data.salaryReceipt2);
    form.append("Salary3", data.salaryReceipt3);
    form.append("ProofOfAddress", data.homeReceipt);
    form.append("LotCost", data.lotCost.toString());
    form.append("DownPayment", data.downPayment.toString());
    form.append("QuotasCount", data.quotasCount.toString());
    form.append("CBU", data.CBU);
    data.guarantors.forEach((guarantor, index) => {
      form.append(`Guarantor${index + 1}.Name`, guarantor.name);
      form.append(`Guarantor${index + 1}.LastName`, guarantor.lastname);
      form.append(`Guarantor${index + 1}.DNI`, guarantor.DNI);
      form.append(`Guarantor${index + 1}.CUIT`, guarantor.CUIT);
      form.append(`Guarantor${index + 1}.Email`, guarantor.email);
      form.append(`Guarantor${index + 1}.PhoneNumber`, guarantor.phoneNumber);
      form.append(`Guarantor${index + 1}.Photo`, guarantor.Photo);
      form.append(`Guarantor${index + 1}.Front`, guarantor.Front);
      form.append(`Guarantor${index + 1}.Back`, guarantor.Back);
      form.append(`Guarantor${index + 1}.Salary`, guarantor.salaryReceipt1);
      form.append(`Guarantor${index + 1}.Salary2`, guarantor.salaryReceipt2);
      form.append(`Guarantor${index + 1}.Salary3`, guarantor.salaryReceipt3);
      form.append(
        `Guarantor${index + 1}.ProofOfAddress`,
        guarantor.homeReceipt
      );
    });
    sendLoanRequest(form).then((response) => {
      if (response && response.status < 300) {
        setIsSendingForm(false);
        toast.success(
          "Su solicitud de financiamiento ha sido enviada exitosamente"
        );
        navigate("/buyer");
      } else {
        setIsSendingForm(false);
        if (typeof response?.data === "string") toast.error(response.data);
        else {
          toast.error(
            "Ha ocurrido un error al enviar su solicitud de financiamiento"
          );
        }
      }
    });
  };

  return (
    <section className="flex-1 flex flex-col py-6 gap-4 px-4 md:px-8 lg:px-16 max-w-[1000px] mx-auto">
      <h1 className="text-headline-medium-medium text-start w-full">
        Solicitud de financiación
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto md:px-16 flex flex-col gap-4"
      >
        <p className="text-title-large-regular">
          Para solicitar la financiación, primero se debe indicar el costo del
          lote o terreno, el adelanto a pagar y la cantidad de cuotas deseadas.
        </p>
        <p className="text-title-large-regular">
          Posteriormente, es indispensable subir los siguientes documentos en
          formato JPG o PDF:
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
          Además, deberás completar toda la información requerida para los dos
          garantes del préstamo.
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
            <TextInput
              register={register}
              label="CBU"
              name="CBU"
              error={errors.CBU}
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

          <section className="grid grid-cols-1 px-4 md:px-0 md:grid-cols-2 gap-x-8 gap-y-4 mt-4 justify-center items-center">
            {guarantors.map((guarantor: Guarantor, index: number) => (
              <TextFieldWithIcon
                key={guarantor.name + guarantor.lastname + index}
                text={`Garante nº ${index + 1}: ${guarantor.name + " " + guarantor.lastname}`}
                icon="pencil"
                onClick={() =>
                  navigate("/buyer/loan-request/guarantor", {
                    state: { editIndex: index, guarantors },
                  })
                }
              />
            ))}
          </section>
        </article>
        {guarantors.length < 2 ? (
          <Button
            color="primary-blue"
            size="large"
            type="button"
            onClick={() =>
              navigate("/buyer/loan-request/guarantor", {
                state: { editIndex: undefined, guarantors },
              })
            }
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
            isLoading={isSendingForm}
          >
            Solicitar Financiación
          </Button>
        )}
      </form>
    </section>
  );
}

export default LoanForm;
