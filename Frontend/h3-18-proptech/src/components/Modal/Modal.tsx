import { useModalStore } from "../../stores/modal/modal.store";
import { Button } from "../common";
import { CloseIcon } from "../icons";

function Modal() {
  const isOpen = useModalStore((state) => state.isOpen);
  const title = useModalStore((state) => state.title);
  const content = useModalStore((state) => state.content);
  const buttonTitle = useModalStore((state) => state.buttonTitle);
  const buttonLink = useModalStore((state) => state.buttonLink);
  const closeModal = useModalStore((state) => state.closeModal);

  return (
    <dialog
      className={`${isOpen ? "opacity-100" : "opacity-0 scale-0"} transition-opacity fixed h-screen w-screen bg-black bg-opacity-50 z-[100] flex items-center justify-center px-4`}
    >
      <article className="transition bg-white p-4 sm:p-8 max-w-[600px] rounded-xl">
        <header className="relative flex justify-between pt-2 items-center">
          <h1 className="text-title-large-bold">{title}</h1>
          <button className="w-fit rounded-xl p-2 hover:bg-slate-100" onClick={() => closeModal()}>
            <CloseIcon className="w-5 h-5" />
          </button>
        </header>
        <ul className="flex flex-col gap-3 px-4 py-8">
          {content.map(({ label, value, info }) => {
            return (
              <li key={label + value} className="flex flex-col gap-1">
                <div className="flex gap-2 items-center">
                  <label className="text-title-medium-bold">{label}:</label>
                  <span className="text-body-medium-regular">{value}</span>
                </div>
                {info && (
                  <small className="text-body-small-regular-12 font-lato">
                    {info}
                  </small>
                )}
              </li>
            );
          })}
        </ul>
        <footer onClick={() => closeModal()} className="w-fit mx-auto">
          <Button
            type="link"
            color="primary-orange"
            size="large"
            to={buttonLink}
          >
            {buttonTitle}
          </Button>
        </footer>
      </article>
    </dialog>
  );
}

export default Modal;
