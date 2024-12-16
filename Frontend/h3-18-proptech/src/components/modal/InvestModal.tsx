import { Button, NumberInput } from "../common";
import { CloseIcon } from "../icons";
import { AddInversion } from "../../pages/private/investor/DashboardInvestorPage";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  openModal: boolean;
  setAction: (inv: AddInversion) => void;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  type: "invert" | "extract";
  maxAmount?: number;
}

export function InvestModal({
  openModal,
  setOpenModal,
  setAction,
  loading,
  type,
  maxAmount,
}: Props) {
  const schema = z.object({
    amount: z
      .number()
      .max(
        maxAmount ? maxAmount : 100000000000000,
        maxAmount ? `No puedes extraer más de $${maxAmount}` : ""
      ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ amount: number }>({ resolver: zodResolver(schema) });

  const onSubmit = (data: { amount: number }) => {
    setAction(data);
  };

  return (
    <dialog
      className={`${openModal ? "opacity-100" : "opacity-0 scale-0"} transition-opacity fixed h-screen w-screen bg-black bg-opacity-50 z-[100] flex items-center justify-center px-4`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="transition bg-white p-4 sm:p-8 max-w-[600px] rounded-xl"
      >
        <header className="relative flex justify-between pt-2 items-center">
          <h1 className="text-title-large-bold">
            Ingresa el monto que deseas{" "}
            {type === "invert" ? "invertir" : "retirar"}
          </h1>
          <button
            className="w-fit rounded-xl p-2 hover:bg-slate-100"
            onClick={() => setOpenModal(false)}
            type="button"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </header>
        <ul className="flex flex-col gap-3 px-4 py-8">
          <NumberInput
            register={register}
            label="Monto"
            name="amount"
            error={errors.amount}
          />
        </ul>
        <footer className="w-fit mx-auto">
          <Button
            type="submit"
            color="primary-orange"
            size="large"
            isLoading={loading}
          >
            {type === "invert" ? "Invertir" : "Retirar"}
          </Button>
        </footer>
      </form>
    </dialog>
  );
}

export default InvestModal;
