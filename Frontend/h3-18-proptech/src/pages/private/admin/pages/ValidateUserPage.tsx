import { useNavigate } from "react-router-dom";
import { ArrowBackIcon, CloseIcon } from "../../../../components/icons";
import { useState } from "react";
import { Button } from "../../../../components/common";
import { InputImage, InputText } from "../components";

const file =
  "https://i.pinimg.com/736x/f4/2c/a2/f42ca243c73da80076b92401edb84489.jpg";

export function ValidateUserPage() {
  const navigate = useNavigate();
  const [fileChosen, setFileChosen] = useState({
    open: false,
    src: "",
  });

  const goBack = () => {
    navigate("/admin/dashboard/validate");
  };

  const viewFile = (file: string) => {
    setFileChosen({ open: true, src: file });
  };

  return (
    <div className="bg-[#F8F8F8]">
      <div className="w-[90%] max-w-[1100px] mx-auto my-6">
        <div className="flex">
          <ArrowBackIcon onClick={goBack} className="cursor-pointer" />
          <h4 className="text-headline-small-medium mb-6 ml-6">
            Validar usuario
          </h4>
        </div>
        <div className="w-[890px] px-6 py-6 text-base-color bg-contrast drop-shadow-md shadow-md shadow-[#00000025] mx-auto">
          <h4 className="text-title-large-regular m-6">
            Información del usuario
          </h4>
          <div className="flex gap-4 my-4">
            <InputText title="Nombre">Nombre</InputText>
            <InputText title="Apellido">Apellido</InputText>
          </div>
          <div className="flex gap-4 my-4">
            <InputText title="DNI">DNI</InputText>
            <InputText title="CUIT">CUIT</InputText>
          </div>
          <div className="flex gap-4 my-4">
            <InputText title="Email">Email</InputText>
            <InputText title="Teléfono">Teléfono</InputText>
          </div>
          <div className="flex gap-4 my-8">
            <InputImage
              title={"Frente del DNI"}
              action={() => viewFile(file)}
            />
            <InputImage title={"Dorso del DNI"} action={() => viewFile(file)} />
          </div>
          <div className="flex gap-4 my-8">
            <InputImage title={"Selfie"} action={() => viewFile(file)} />
            <div className="w-full"></div>
          </div>
        </div>
        <div className="flex justify-center gap-4 my-6">
          <Button size="small" color="primary-blue">
            Validar
          </Button>
          <Button size="small" color="secondary">
            Rechazar
          </Button>
        </div>
        <dialog
          onClick={() => setFileChosen({ open: false, src: "" })}
          className={`${fileChosen.open ? "opacity-100" : "opacity-0 scale-0"} transition-opacity fixed h-screen w-screen bg-black bg-opacity-50 z-[100] flex items-center justify-center px-4 top-0`}
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
        </dialog>
      </div>
    </div>
  );
}

export default ValidateUserPage;
