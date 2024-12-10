import { toast } from "sonner";
import { Button, NumberInput } from "../common";
import { CloseIcon } from "../icons";
import { InvestInfo } from "../../pages/private/investor/DashboardInvestorPage";
import { useForm } from "react-hook-form";

interface Props {
  openModal: boolean;
  setInvestInfo: (value: React.SetStateAction<InvestInfo | undefined>) => void;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export function InvestModal({ openModal, setOpenModal, setInvestInfo }: Props) {
  const { register, handleSubmit } = useForm<{ monto: number }>();

  const onSubmit = (data: { monto: number }) => {
    setInvestInfo((state) => state && ({
      ...state,
      montoActual: state.montoActual + Number(data.monto),
    }));
    toast.success("Su inversión ha sido realizada exitosamente");
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
            Ingresa el monto que deseas invertir
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
          <NumberInput register={register} label="Monto" name="monto" />
        </ul>
        <footer onClick={() => setOpenModal(false)} className="w-fit mx-auto">
          <Button type="submit" color="primary-orange" size="large">
            Invertir
          </Button>
        </footer>
      </form>
    </dialog>
  );
}

export default InvestModal;
