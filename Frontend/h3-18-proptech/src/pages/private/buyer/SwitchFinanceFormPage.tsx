import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FinanceSchema, FinancingDataForm } from "./models";
import { AddGuarantorForm, FinanceForm } from "./components";

export function SwitchFinanceFormPage() {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FinancingDataForm>({
    defaultValues: {
      files: [],
      guarantors: [],
      // AGREGAR GARANTES
    },
    resolver: zodResolver(FinanceSchema),
  });

  const [guarantorForm, setGuarantorForm] = useState(false);
  const [editGuarantorIndex, setEditGuarantorIndex] = useState<
    number | undefined
  >();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGuarantorView = (id?: number) => {
    if (id !== undefined) {
      setEditGuarantorIndex(id);
    } else {
      setEditGuarantorIndex(undefined);
    }
    setGuarantorForm(true);
    // VER FORM GARANTES
  };

  const onSubmit = async (data: FinancingDataForm) => {
    const form = new FormData();
    form.append("Receipt1", data.files[0]);
    form.append("Receipt2", data.files[1]);
    form.append("Receipt3", data.files[2]);
    form.append("service", data.files[3]);
    // AGREGAR GARANTES
    console.log(data);

    // LLAMAR SERVICIO
  };

  const actualGuarantors = watch("guarantors");

  return (
    <>
      {guarantorForm ? (
        <>
          <AddGuarantorForm
            viewGuarantorForm={setGuarantorForm}
            guarantors={actualGuarantors}
            externalSetValue={setValue}
            editIndex={editGuarantorIndex}
          />
        </>
      ) : (
        <FinanceForm
          handleSubmit={handleSubmit}
          setValue={setValue}
          errors={errors}
          changeGuarantor={handleGuarantorView}
          onSubmit={onSubmit}
          watch={watch}
        />
      )}
    </>
  );
}

export default SwitchFinanceFormPage;
