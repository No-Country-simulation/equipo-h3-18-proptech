import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FileDropzone, TextInput } from "../../../components/common";
import { useTransitionNavigation } from "../../../hooks";
import { sendValidationInfo } from "../../../services";
import { validateIdentitySchema } from "./models";

interface ValidateIdentityForm {
  CUIT: string;
  DNI: string;
  Front: File;
  Back: File;
  Photo: File;
}

export function ValidateIdentityPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ValidateIdentityForm>({
    defaultValues: { CUIT: "", DNI: "" },
    resolver: zodResolver(validateIdentitySchema),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useTransitionNavigation();
  const [isSendingForm, setIsSendingForm] = useState(false)

  const onSubmit = async (data: ValidateIdentityForm) => {
    const form = new FormData();
    form.append("CUIT", data.CUIT);
    form.append("DNI", data.DNI);
    form.append("Front", data.Front);
    form.append("Back", data.Back);
    form.append("Photo", data.Photo);

    setIsSendingForm(true);
    const response = await sendValidationInfo(form);
    if (response?.status === 200) {
      toast.success(response.data);
      setIsSendingForm(false);
      navigate("/profile");
    } else {
      setIsSendingForm(false);
      if (typeof response?.data === "string") toast.error(response.data);
      else {
        toast.error("Ha ocurrido un error al guardar sus datos");
      }
    }
  };
  return (
    <section className="flex-1 flex flex-col py-6 gap-4 px-4 md:px-16">
      <h1 className="text-headline-medium-medium text-center">
        Validar mi identidad
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-[1000px] flex flex-col gap-4"
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
          </section>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            <FileDropzone
              fileType="both"
              setValue={setValue}
              name="Photo"
              error={errors.Photo}
              label="Foto tipo selfie"
            />
            <FileDropzone
              fileType="both"
              setValue={setValue}
              name="Front"
              error={errors.Front}
              label="Frente del DNI"
            />
            <FileDropzone
              fileType="both"
              setValue={setValue}
              name="Back"
              error={errors.Back}
              label="Reverso del DNI"
            />
          </section>
        </article>
        <Button
          color="primary-blue"
          size="large"
          type="submit"
          classname="self-center mt-2"
          isLoading={isSendingForm}
        >
          Validar Identidad
        </Button>
      </form>
    </section>
  );
}

export default ValidateIdentityPage;
