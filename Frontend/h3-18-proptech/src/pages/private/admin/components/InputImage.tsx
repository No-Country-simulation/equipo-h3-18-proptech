import { useState } from "react";
import { CloseIcon, EyeIcon } from "../../../../components/icons";
import { createPortal } from "react-dom";

interface ImageProps {
  title: string;
  file: string;
}

export const InputImage = ({ title, file }: ImageProps) => {
  const modalRoot = document.getElementById("modal");

  const [fileChosen, setFileChosen] = useState({
    open: false,
    src: "",
  });

  const viewFile = () => {
    if (file.endsWith(".pdf")) {
      file = file.replace(".pdf", ".jpg");
      window.open(file, "_blank")?.focus();
    } else if (file.endsWith(".ai")) {
      file = file.replace(".ai", ".jpg");
      window.open(file, "_blank")?.focus();
    } else {
      setFileChosen({ open: true, src: file });
    }
  };

  return (
    <>
      <div className="flex gap-4 w-full">
        <div className="flex-1 py-2 px-4 shadow-md shadow-tertiary border-[3px] rounded-lg border-primary text-ellipsis max-w-[50vw] whitespace-nowrap overflow-hidden md:w-full">
          {title}
        </div>
        <button
          onClick={viewFile}
          type="button"
          className="p-2 md:p-3 bg-background shadow-md shadow-tertiary rounded-lg hover:bg-tertiary transition-colors"
        >
          <EyeIcon className="h-6 w-6" />
        </button>
      </div>
      {modalRoot &&
        createPortal(
          <dialog
            onClick={() => setFileChosen({ open: false, src: "" })}
            className={`${fileChosen.open ? "opacity-100" : "opacity-0 scale-0"} transition-opacity fixed h-screen w-screen bg-black bg-opacity-50 z-[100] flex items-center justify-center px-4 top-0 left-0`}
          >
            <figure className="relative">
              <img
                src={fileChosen.src}
                alt="Hola Mundo"
                className="max-w-[250px] max-h-[250px] aspect-square md:max-w-[70vw] md:max-h-[70vh]"
              />
              <button
                type="button"
                onClick={() => setFileChosen({ open: false, src: "" })}
              >
                <CloseIcon className="absolute top-2 right-2 h-6 w-6 rounded-full p-1 bg-contrast cursor-pointer hover:bg-tertiary transition-colors" />
              </button>
            </figure>
          </dialog>,
          modalRoot
        )}
    </>
  );
};
