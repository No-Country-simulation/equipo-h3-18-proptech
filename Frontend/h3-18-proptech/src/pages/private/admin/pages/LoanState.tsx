import { useState } from "react";
import { DataUser, UserData } from "../components";
import { ArrowBackIcon } from "../../../../components/icons";
import { Button } from "../../../../components/common";
import { useTransitionNavigation } from "../../../../hooks";

const data: UserData = {
  name: "string",
  lastName: "string",
  DNI: "string",
  CUIT: "string",
  email: "string",
  phoneNumber: "string",
  photo:
    "http://res.cloudinary.com/dwqg0f5ak/image/upload/v1733410659/messi.jpg",
  front: "string",
  back: "string",
  salary: "string",
  salary2: "string",
  salary3: "string",
  proofOfAddress: "string",
};

export function LoanState() {
  const navigate = useTransitionNavigation();
  const [openGuarantors, setOpenGuarantors] = useState(false);

  const goBack = () => {
    navigate("/admin/loans");
  };

  return (
    <div className="bg-[#F8F8F8]">
      <div className="w-[90%] max-w-[1100px] mx-auto my-6">
        {!openGuarantors ? (
          <>
            <div className="flex">
              <ArrowBackIcon onClick={goBack} className=" cursor-pointer" />
              <h4 className="text-headline-small-medium mb-6 ml-6">
                Datos del préstamo
              </h4>
            </div>
            <DataUser data={data} type="usuario" />
            <div className="flex mt-6 justify-center">
              <Button
                size="large"
                color="primary-blue"
                onClick={() => setOpenGuarantors(true)}
              >
                Ver garantes
              </Button>
            </div>
            <div className="flex mt-6 justify-center text-title-large-regular">
              Id: 1920596e-e96f-4f5e-9ffe-2bd3d16d9d0b
            </div>
            <div className="flex mt-6 justify-center">
              <table className=" w-[90%] max-w-[700px] text-base-color text-center bg-contrast drop-shadow-md shadow-md shadow-[#00000025]">
                <thead className=" text-title-large-bold bg-primary text-contrast">
                  <tr className="border-b-2 border-primary h-[76px] ">
                    <th>Cuota</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>Monto</th>
                  </tr>
                </thead>
                <tbody className="text-body-large-regular">
                  <tr className="border-b-2 border-primary h-[76px]">
                    <td>{"1/6"}</td>
                    <td>{"11/06/2024"}</td>
                    <td
                      className={`${true ? "text-success" : "text-error"} text-title-medium-bold`}
                    >
                      {"Pagado"}
                    </td>
                    <td>${"650"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            <div className="flex">
              <ArrowBackIcon
                onClick={() => setOpenGuarantors(false)}
                className=" cursor-pointer"
              />
              <h4 className="text-headline-small-medium mb-6 ml-6">
                Datos de los garantes
              </h4>
            </div>
            <DataUser data={data} type="garante" />
            <div className="h-6"></div>
            <DataUser data={data} type="garante" />
            <div className="h-8"></div>
          </>
        )}
      </div>
    </div>
  );
}

export default LoanState;
