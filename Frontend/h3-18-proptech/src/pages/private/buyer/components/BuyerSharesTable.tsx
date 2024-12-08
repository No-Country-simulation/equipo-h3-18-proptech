import {
  MercadoPagoDisabledIcon,
  MercadoPagoIcon,
} from "../../../../components/icons";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { CloseIcon } from "../../../../components/icons";
import { useState } from "react";

initMercadoPago("APP_USR-06d4fd1b-77fa-424c-bc8b-2973856f15c0");

export interface DataBuyerSharesTable {
  quotaId: string;
  quotaNumber: string;
  expiredDate: Date;
  stateQuota: number;
  amount: number;
  preferenceID: string;
}

interface Props {
  data: DataBuyerSharesTable[];
}

const quotasState = ["Atrasada", "Pendiente", "Pagada"];

export function BuyerSharesTable({ data }: Props) {
  const [openModal, setOpenModal] = useState({
    open: false,
    id: "",
  });

  const open = (id: string) => {
    setOpenModal({ open: true, id: id });
  };

  return (
    <>
      <table className="w-[1050px] text-base-color text-center bg-contrast ">
        <thead className=" text-title-large-bold  bg-primary text-contrast">
          <tr className="border-b border-[#ccc] h-[70px] ">
            <th>Cuotas</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Monto</th>
            <th>Abonar </th>
          </tr>
        </thead>
        <tbody className="text-body-large-regular">
          {data.map(
            ({
              quotaNumber,
              expiredDate,
              stateQuota,
              amount,
              preferenceID,
            }) => (
              <tr className="border-b border-[#ccc] h-[70px]">
                <td>{quotaNumber}</td>
                <td>{expiredDate.toLocaleDateString()}</td>
                <td
                  className={` ${stateQuota === 2 ? "text-success" : stateQuota === 1 ? "text-primary" : "text-error"}`}
                >
                  {quotasState[stateQuota]}
                </td>
                <td>${amount.toFixed(2)}</td>
                <td className="flex justify-center items-center h-[70px]">
                  {stateQuota === 2 ? (
                    <MercadoPagoDisabledIcon />
                  ) : (
                    <MercadoPagoIcon
                      className=" cursor-pointer"
                      onClick={() => open(preferenceID)}
                    />
                  )}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <RetireMoneyModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
}

export default BuyerSharesTable;

interface ModalProps {
  openModal: {
    open: boolean;
    id: string;
  };
  setOpenModal: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      id: string;
    }>
  >;
}

function RetireMoneyModal({ openModal, setOpenModal }: ModalProps) {
  return (
    openModal.open && (
      <dialog
        className={`${openModal ? "opacity-100" : "opacity-0 scale-0"} transition-opacity fixed h-screen w-screen bg-black bg-opacity-50 z-[100] flex items-center justify-center px-4`}
      >
        <article className="flex flex-col gap-4 transition bg-white p-4 sm:p-8 max-w-[600px] rounded-xl">
          <header className="relative flex justify-between pt-2 items-center">
            <h1 className="text-title-large-bold">Pagar cuota</h1>
            <button
              className="w-fit rounded-xl p-2 hover:bg-slate-100"
              onClick={() => setOpenModal({ open: false, id: "" })}
              type="button"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </header>
          <footer
            onClick={() => setOpenModal({ open: false, id: "" })}
            className="flex gap-12 w-full mx-auto justify-center"
          >
            <Wallet
              initialization={{ preferenceId: openModal.id }}
              customization={{ texts: { valueProp: "smart_option" } }}
              locale="es-AR"
            />
          </footer>
        </article>
      </dialog>
    )
  );
}
