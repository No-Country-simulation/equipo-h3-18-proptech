import { useParams } from "react-router-dom";
import { ArrowBackIcon } from "../../../../components/icons";
import { useEffect, useState } from "react";
import { Button } from "../../../../components/common";
import { InputImage, InputText } from "../components";
import {
  getUserToValidate,
  rejectIdentity,
  validateIdentity,
} from "../../../../services/admin";
import { toast } from "sonner";
import LoadingPage from "../../../LoadingPage";
import { useTransitionNavigation } from "../../../../hooks";

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
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

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

  const navigate = useTransitionNavigation();

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

  const validate = () => {
    setIsApproving(true);
    if (id) {
      validateIdentity(id).then((response) => {
        if (response && response?.status < 300) {
          setIsApproving(false);
          toast.success("Usuario validado");
          setTimeout(() => {
            goBack();
          }, 2000);
        } else {
          toast.error("Ha ocurrido un error al validar");
          setIsApproving(false);
        }
      });
    }
  };

  const reject = () => {
    setIsRejecting(true);
    if (id) {
      rejectIdentity(id).then((response) => {
        if (response && response?.status < 300) {
          setIsRejecting(false);
          toast.success("Usuario rechazado");
          setTimeout(() => {
            goBack();
          }, 2000);
        } else {
          toast.error("Ha ocurrido un error");
          setIsRejecting(false);
        }
      });
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="w-full max-w-[1000px] mx-auto my-6 px-4">
        <header className="flex gap-2 md:gap-4 items-center mb-4 md:mb-6">
          <ArrowBackIcon onClick={goBack} className="cursor-pointer h-12 w-12" />
          <h4 className="text-headline-small-medium ">
            Validar usuario
          </h4>
        </header>
        {loading ? (
          <LoadingPage background="transparent" size="page" />
        ) : (
          <>
            <div className="max-w-[890px] px-6 py-6 text-base-color bg-contrast drop-shadow-md shadow-md shadow-[#00000025] mx-auto">
              <h4 className="text-title-large-regular sm:m-6">
                Información del usuario
              </h4>
              <div className="flex flex-col md:flex-row gap-4 my-4">
                <InputText title="Nombre">{name}</InputText>
                <InputText title="Apellido">{lastName}</InputText>
              </div>
              <div className="flex flex-col md:flex-row gap-4 my-4">
                <InputText title="DNI">{dni}</InputText>
                <InputText title="CUIT">{cuit}</InputText>
              </div>
              <div className="flex flex-col md:flex-row gap-4 my-4">
                <InputText title="Email">{email}</InputText>
                <InputText title="Teléfono">{phoneNumber}</InputText>
              </div>
              <div className="flex flex-col md:flex-row gap-y-8 gap-x-4 my-8">
                <InputImage title={"Frente del DNI"} file={frontDNI} />
                <InputImage title={"Dorso del DNI"} file={backDNI} />
              </div>
              <div className="flex flex-col md:flex-row gap-y-8 gap-x-4 mt-8 md:my-8">
                <InputImage title={"Foto del rostro"} file={photo} />
                <div className="w-full"></div>
              </div>
            </div>
            <div className="flex justify-center gap-4 my-6">
              <Button
                size="small"
                color="primary-blue"
                onClick={validate}
                isLoading={isApproving}
              >
                Validar
              </Button>
              <Button
                size="small"
                color="secondary"
                onClick={reject}
                isLoading={isRejecting}
              >
                Rechazar
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ValidateUserPage;
