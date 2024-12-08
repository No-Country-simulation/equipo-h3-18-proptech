import { toast } from "sonner";
import { Button } from "../common";
import { CloseIcon } from "../icons";
import { InvestInfo } from "../../pages/private/investor/DashboardInvestorPage";

interface Props {
  openModal: boolean;
  setInvestInfo: (value: React.SetStateAction<InvestInfo | undefined>) => void;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  montoAcumulado: number;
}

export function RetireMoneyModal({
  openModal,
  setOpenModal,
  setInvestInfo,
  montoAcumulado,
}: Props) {
  const handleClick = () => {
    setInvestInfo(undefined);
    toast.success(
      "Tu dinero ha sido retirado exitosamente. En unos días recibirás el monto acumulado"
    );
  };

  return (
    <dialog
      className={`${openModal ? "opacity-100" : "opacity-0 scale-0"} transition-opacity fixed h-screen w-screen bg-black bg-opacity-50 z-[100] flex items-center justify-center px-4`}
    >
      <article className="flex flex-col gap-4 transition bg-white p-4 sm:p-8 max-w-[600px] rounded-xl">
        <header className="relative flex justify-between pt-2 items-center">
          <h1 className="text-title-large-bold">Retirar dinero</h1>
          <button
            className="w-fit rounded-xl p-2 hover:bg-slate-100"
            onClick={() => setOpenModal(false)}
            type="button"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </header>
        <p className="text-center py-4 text-title-large-semi-bold">
          ¿Estás seguro que deseas retirar la inversión por un monto de $<span className="text-title-large-bold">{montoAcumulado}</span>?</p>
        <footer
          onClick={() => setOpenModal(false)}
          className="flex gap-12 w-full mx-auto justify-center"
        >
          <Button type="button" color="secondary" size="small">
            Cancelar
          </Button>
          <Button
            type="button"
            color="primary-orange"
            size="small"
            onClick={() => handleClick()}
          >
            Retirar
          </Button>
        </footer>
      </article>
    </dialog>
  );
}

export default RetireMoneyModal;
