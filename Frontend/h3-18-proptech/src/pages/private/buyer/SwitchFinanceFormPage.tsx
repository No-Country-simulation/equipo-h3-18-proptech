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
    register
  } = useForm<FinancingDataForm>({
    defaultValues: {
      guarantors: [],
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
    form.append("salaryReceipt1", data.salaryReceipt1);
    form.append("salaryReceipt2", data.salaryReceipt2);
    form.append("salaryReceipt3", data.salaryReceipt3);
    form.append("homeReceipt", data.homeReceipt);
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
          register={register}
        />
      )}
    </>
  );
}

export default SwitchFinanceFormPage;
