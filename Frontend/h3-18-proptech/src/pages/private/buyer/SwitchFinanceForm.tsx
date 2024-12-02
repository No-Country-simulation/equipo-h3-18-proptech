import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FinanceSchema, FinancingDataForm } from "./models/Financing.models";
import FinanceForm from "./FinanceForm";

function SwitchFinanceForm() {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FinancingDataForm>({
    defaultValues: {
      files: [],
      // AGREGAR GARANTES
    },
    resolver: zodResolver(FinanceSchema),
  });

  const [guarantorForm, setGuarantorForm] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleOnClick = () => {
    setGuarantorForm(true);
    // VER FORM GARANTES
  };

  const onSubmit = async (data: FinancingDataForm) => {
    const form = new FormData();
    form.append("Receipt1", data.files[0]);
    form.append("Receipt2", data.files[1]);
    form.append("Receipt2", data.files[2]);
    form.append("service", data.files[3]);
    // AGREGAR GARANTES
    console.log(data);

    // LLAMAR SERVICIO
  };

  return (
    <>
      {guarantorForm ? (
        <>{/* AGREGAR GARANTES */}</>
      ) : (
        <FinanceForm
          handleSubmit={handleSubmit}
          setValue={setValue}
          errors={errors}
          changeGuarantor={handleOnClick}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
}

export default SwitchFinanceForm;
