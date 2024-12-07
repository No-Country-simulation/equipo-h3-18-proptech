import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FinanceSchema, RequestLoanForm } from "./models";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserbyToken } from "../../../services";
import LoadingPage from "../../LoadingPage";
import { toast } from "sonner";
import { useTransitionNavigation } from "../../../hooks";

export function LoanRequestPage() {
  const [loading, setLoading] = useState(true);
  const navigate = useTransitionNavigation();

  useEffect(() => {
    getUserbyToken().then((response) => {
      if (response && response.status < 300) {
        if (response.data.stateValidation == 2) {
          setLoading(false);
        } else {
          toast.error(
            "Para poder realizar una solicitud de financiamiento, primero debe validar su identidad"
          );
          navigate("/profile");
        }
      } else {
        toast.error("Ha ocurrido un error al verificar su identidad");
        navigate("/buyer");
      }
    });
  }, []);

  const methods = useForm<RequestLoanForm>({
    defaultValues: {
      guarantors: [],
    },
    resolver: zodResolver(FinanceSchema),
  });

  return loading ? (
    <LoadingPage background="contrast" size="page" />
  ) : (
    <FormProvider {...methods}>
      <Outlet />
    </FormProvider>
  );
}

export default LoanRequestPage;
