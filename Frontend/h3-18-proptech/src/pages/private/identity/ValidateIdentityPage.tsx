import { useForm } from "react-hook-form";
import { Button, FileDropzone, TextInput } from "../../../components/common";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateIdentitySchema } from "./models/ValidateIdentity.model";
import { useEffect } from "react";

interface ValidateIdentityForm {
  cuit: string;
  dni: string;
  files: File[];
}

function ValidateIdentityPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ValidateIdentityForm>({
    defaultValues: { cuit: "", dni: "", files: [] },
    resolver: zodResolver(validateIdentitySchema),
  });

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const onSubmit = (data: ValidateIdentityForm) => {
    console.log(data);
    toast.success("Formulario enviado exitosamente");
  };
  return (
    <section className="flex-1 flex flex-col py-6 gap-4 px-4 md:px-16">
      <h1 className="text-headline-medium-medium text-center">
        Validar mi identidad
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-[800px] flex flex-col gap-4"
      >
        <p className="text-title-large-regular">
          Para completar la validación de tu identidad, sube imágenes claras de
          los siguientes documentos en formato JPG o PDF:
        </p>
        <ul className="ps-8 list-disc">
          <li className="text-title-large-regular">Ambas caras de tu DNI.</li>
          <li className="text-title-large-regular">
            Una selfie en la que tu rostro sea claramente visible.
          </li>
        </ul>
        <article className="flex flex-col gap-y-6 gap-x-3 transition">
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <TextInput
              label="DNI"
              name="dni"
              register={register}
              error={errors.dni}
            />
            <TextInput
              label="CUIT"
              name="cuit"
              register={register}
              error={errors.cuit}
            />
          </section>
          <FileDropzone
            fileType="both"
            setValue={setValue}
            name="files"
            error={errors.files}
            maxFiles={3}
          />
        </article>
        <Button
          color="primary-blue"
          size="large"
          type="submit"
          classname="self-center mt-2"
        >
          Validar Identidad
        </Button>
      </form>
    </section>
  );
}

export default ValidateIdentityPage;
