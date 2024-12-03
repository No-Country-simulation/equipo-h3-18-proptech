import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, UseFormSetValue } from "react-hook-form";
import { TextInput, FileDropzone, Button } from "../../../components/common";
import { guarantorDataSchema } from "./models/Financing.models";
import { Guarantor } from "../../../interfaces/Guarantor";

interface Props {
  guarantors: {
    name: string;
    lastname: string;
    CUIT: string;
    DNI: string;
    email: string;
    phoneNumber: string;
    files: File[];
  }[];
  externalSetValue: UseFormSetValue<any>;
  viewGuarantorForm: React.Dispatch<any>;
  editIndex?: number;
}

function AddGuarantorForm({
  externalSetValue,
  guarantors,
  viewGuarantorForm,
  editIndex,
}: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Guarantor>({
    defaultValues:
      editIndex !== undefined
        ? {
            name: guarantors[editIndex].name,
            lastname: guarantors[editIndex].lastname,
            CUIT: guarantors[editIndex].CUIT,
            DNI: guarantors[editIndex].DNI,
            email: guarantors[editIndex].email,
            phoneNumber: guarantors[editIndex].phoneNumber,
            files: guarantors[editIndex].files,
          }
        : {
            name: "",
            lastname: "",
            CUIT: "",
            DNI: "",
            email: "",
            phoneNumber: "",
            files: [],
          },
    resolver: zodResolver(guarantorDataSchema),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = async (data: Guarantor) => {
    if (editIndex !== undefined) {
      const newGuarantors = guarantors.map((guarantor, index) =>
        index === editIndex ? data : guarantor
      );
      externalSetValue("guarantors", newGuarantors);
    } else {
      externalSetValue("guarantors", [...guarantors, data]);
    }
    viewGuarantorForm(false);
  };

  return (
    <section className="flex-1 flex flex-col py-6 gap-4 px-4 md:px-16">
      <h1 className="text-headline-medium-medium text-center">
        Información personal del Garante
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-[800px] flex flex-col gap-4"
      >
        <p className="text-title-large-regular">
          Asegúrate de proporcionar datos completos y precisos sobre tus
          garantes. Estos datos son esenciales para evaluar y procesar tu
          solicitud de financiación de manera ágil. Recuerda que es
          indispensable adjuntar los documentos requeridos en formato JPG o PDF
          y verificar que estén actualizados y en formato correcto.
        </p>
        <article className="flex flex-col gap-y-6 gap-x-3 transition">
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3">
            <TextInput
              label="Nombre"
              name="name"
              register={register}
              error={errors.name}
            />
            <TextInput
              label="Apellido"
              name="lastname"
              register={register}
              error={errors.lastname}
            />
            <TextInput
              label="DNI"
              name="DNI"
              register={register}
              error={errors.DNI}
            />
            <TextInput
              label="CUIT"
              name="CUIT"
              register={register}
              error={errors.CUIT}
            />
            <TextInput
              label="Correo Electrónico"
              type="email"
              name="email"
              register={register}
              error={errors.email}
            />
            <TextInput
              label="Teléfono"
              name="phoneNumber"
              type="tel"
              register={register}
              error={errors.phoneNumber}
            />
          </section>
          <FileDropzone
            fileType="both"
            setValue={setValue}
            name="files"
            error={errors.files}
            maxFiles={7}
            files={
              editIndex !== undefined ? guarantors[editIndex].files : undefined
            }
          />
        </article>
        <Button
          color="primary-blue"
          size="large"
          type="submit"
          classname="self-center mt-2"
        >
          Guardar Garante
        </Button>
      </form>
    </section>
  );
}

export default AddGuarantorForm;
