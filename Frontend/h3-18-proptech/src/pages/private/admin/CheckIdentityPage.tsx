import { useForm } from "react-hook-form";
import { FileDropzone } from "../../../components/common";

export function CheckIdentityPage() {
  const { setValue } = useForm();
  return (
    <section className="flex-1 flex flex-col relative w-full">
      <section>
        <h1 className="text-title-large-semi-bold">Aprobar identidad</h1>
      </section>
      <section className="flex flex-wrap px-10 gap-12 w-full items-center justify-center">
        <FileDropzone
          fileType="both"
          label="Selfie"
          name="Photo"
          setValue={setValue}
        />
        <FileDropzone
          fileType="both"
          label="Reverso del DNI"
          name="BackDNI"
          setValue={setValue}
        />
        <FileDropzone
          fileType="both"
          label="Anverso del DNI"
          name="FronDNI"
          setValue={setValue}
        />
      </section>
    </section>
  );
}

export default CheckIdentityPage;
