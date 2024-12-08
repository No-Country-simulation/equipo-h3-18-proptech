import { useState } from "react";
import { Button } from "../../../../components/common";
import { ArrowBackIcon } from "../../../../components/icons";
import { DataUser, UserData } from "../components";

interface Props {
  data: UserData;
  setOpenUserData: React.Dispatch<React.SetStateAction<boolean>>;
}

function LoanStateUserPage({ data, setOpenUserData }: Props) {
  const [openGuarantors, setOpenGuarantors] = useState(false);

  return !openGuarantors ? (
    <section>
      <header className="flex">
        <ArrowBackIcon
          onClick={() => setOpenUserData(false)}
          className=" cursor-pointer"
        />
        <h4 className="text-headline-small-medium mb-6 ml-6">
          Datos del préstamo
        </h4>
      </header>
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
    </section>
  ) : (
    <section>
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
    </section>
  );
}

export default LoanStateUserPage;
