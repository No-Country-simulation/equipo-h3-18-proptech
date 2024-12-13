import {
  MercadoPagoDisabledIcon,
  MercadoPagoIcon,
} from "../../../../components/icons";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { CloseIcon } from "../../../../components/icons";
import { useState } from "react";
import { createPortal } from "react-dom";

initMercadoPago(import.meta.env.VITE_MERCADO_PAGO_KEY);

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

  const modalContainer = document.querySelector("#modal");

  return (
    <section className="flex flex-col max-w-[1050px] w-full overflow-x-auto">
      <table className="w-full min-w-[600px] text-base-color text-center bg-contrast ">
        <thead className=" text-title-large-bold  bg-primary text-contrast">
          <tr className="border-b border-[#ccc] h-[70px] ">
            <th>Cuotas</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Monto</th>
            <th>Abonar </th>
          </tr>
        </thead>
        {data.length > 0 && (
          <tbody className="text-body-large-regular">
            {data.map(
              ({
                quotaNumber,
                expiredDate,
                stateQuota,
                amount,
                preferenceID,
                quotaId,
              }) => (
                <tr key={quotaId} className="border-b border-[#ccc] h-[70px]">
                  <td>{quotaNumber}</td>
                  <td>{expiredDate.toLocaleDateString()}</td>
                  <td
                    className={`text-title-medium-bold ${stateQuota === 2 ? "text-success" : stateQuota === 1 ? "text-primary" : "text-error"}`}
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
        )}
      </table>
      {data.length === 0 && (
        <h3 className="flex text-body-large-regular my-6 w-full justify-center">
          No hay datos para mostrar
        </h3>
      )}

      {modalContainer &&
        createPortal(
          <dialog
            onClick={() => setOpenModal({ open: false, id: "" })}
            className={`${openModal.open ? "opacity-100" : "opacity-0 scale-0"} transition-opacity fixed h-screen w-screen bg-black bg-opacity-50 z-[100] flex items-center justify-center px-4 top-0 left-0`}
          >
            <article className="flex flex-col gap-2 transition bg-white p-4 sm:p-8 max-w-[600px] rounded-xl">
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
                className="mx-auto justify-center w-[280px] h-[105px]"
              >
                {openModal.id.length > 0 && (
                  <Wallet
                    initialization={{ preferenceId: openModal.id }}
                    customization={{ texts: { valueProp: "smart_option" } }}
                    locale="es-AR"
                  />
                )}
              </footer>
            </article>
          </dialog>,
          modalContainer
        )}
    </section>
  );
}

export default BuyerSharesTable;
