import { useNavigate, useParams } from "react-router-dom";
import { ArrowBackIcon, CloseIcon } from "../../../../components/icons";
import { useEffect, useState } from "react";
import { Button, Loader } from "../../../../components/common";
import { InputImage, InputText } from "../components";
import {
  getUserToValidate,
  rejectIdentity,
  validateIdentity,
} from "../../../../services/admin";
import { toast } from "sonner";

export interface UserValidateData {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dni: string;
  cuit: string;
  photo: string;
  frontDNI: string;
  backDNI: string;
}

export function ValidateUserPage() {
  let { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserValidateData>({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dni: "",
    cuit: "",
    photo: "",
    frontDNI: "",
    backDNI: "",
  });

  const {
    name,
    lastName,
    email,
    phoneNumber,
    dni,
    cuit,
    photo,
    frontDNI,
    backDNI,
  } = user;

  const navigate = useNavigate();
  const [fileChosen, setFileChosen] = useState({
    open: false,
    src: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    if (id) {
      getUserToValidate(id)
        .then((response) => {
          if (response && response?.status < 300) {
            setUser(response.data);
          } else {
            toast.error("Ha ocurrido un error al obtener los datos");
          }
        })
        .finally(() => setLoading(false));
    }
  }, []);

  const goBack = () => {
    navigate("/admin/validate");
  };

  const viewFile = (file: string) => {
    if (file.endsWith('.pdf')) {
      file = file.replace(".pdf", ".jpg")
      window.open(file, '_blank')?.focus();
    }else setFileChosen({ open: true, src: file });
  };

  const validate = () => {
    if (id) {
      validateIdentity(id).then((response) => {
        if (response && response?.status < 300) {
          toast.success("Usuario validado");
          setTimeout(() => {
            goBack();
          }, 2000);
        } else {
          toast.error("Ha ocurrido un error al validar");
        }
      });
    }
  };

  const reject = () => {
    if (id) {
      rejectIdentity(id).then((response) => {
        if (response && response?.status < 300) {
          toast.success("Usuario rechazado");
          setTimeout(() => {
            goBack();
          }, 2000);
        } else {
          toast.error("Ha ocurrido un error");
        }
      });
    }
  };

  return (
    <div className="bg-[#F8F8F8] min-h-screen">
      <div className="w-[90%] max-w-[1100px] mx-auto my-6">
        <div className="flex">
          <ArrowBackIcon onClick={goBack} className="cursor-pointer" />
          <h4 className="text-headline-small-medium mb-6 ml-6">
            Validar usuario
          </h4>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="w-[890px] px-6 py-6 text-base-color bg-contrast drop-shadow-md shadow-md shadow-[#00000025] mx-auto">
              <h4 className="text-title-large-regular m-6">
                Información del usuario
              </h4>
              <div className="flex gap-4 my-4">
                <InputText title="Nombre">{name}</InputText>
                <InputText title="Apellido">{lastName}</InputText>
              </div>
              <div className="flex gap-4 my-4">
                <InputText title="DNI">{dni}</InputText>
                <InputText title="CUIT">{cuit}</InputText>
              </div>
              <div className="flex gap-4 my-4">
                <InputText title="Email">{email}</InputText>
                <InputText title="Teléfono">{phoneNumber}</InputText>
              </div>
              <div className="flex gap-4 my-8">
                <InputImage
                  title={"Frente del DNI"}
                  action={() => viewFile(frontDNI)}
                />
                <InputImage
                  title={"Dorso del DNI"}
                  action={() => viewFile(backDNI)}
                />
              </div>
              <div className="flex gap-4 my-8">
                <InputImage
                  title={"Foto del rostro"}
                  action={() => viewFile(photo)}
                />
                <div className="w-full"></div>
              </div>
            </div>
            <div className="flex justify-center gap-4 my-6">
              <Button size="small" color="primary-blue" onClick={validate}>
                Validar
              </Button>
              <Button size="small" color="secondary" onClick={reject}>
                Rechazar
              </Button>
            </div>
          </>
        )}
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
