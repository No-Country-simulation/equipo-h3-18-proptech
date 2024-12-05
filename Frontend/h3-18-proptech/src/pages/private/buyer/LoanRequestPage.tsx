import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FinanceSchema, RequestLoanForm } from "./models";
import { Outlet } from "react-router-dom";

export function LoanRequestPage() {
  const methods = useForm<RequestLoanForm>({
    defaultValues: {
      guarantors: [],
    },
    resolver: zodResolver(FinanceSchema),
  });

  return (
    <FormProvider {...methods} >
      <Outlet/>
    </FormProvider>
  );
}

export default LoanRequestPage;
