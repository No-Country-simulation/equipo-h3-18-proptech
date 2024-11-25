import { useState } from "react";
import { HeaderHome } from "../../components/Home";
import LandingBuyer from "./LandingBuyer";
import LandingInvestor from "./LandingInvestor";

type Mode = "buyer" | "investor";

function LandingPage() {
  const [mode, setMode] = useState<Mode>("buyer");

  const changeMode = () => {
    mode === "buyer" ? setMode("investor") : setMode("buyer");
  };

  return (
    <>
      <HeaderHome action={changeMode} />
      {mode === "buyer" ? <LandingBuyer /> : <LandingInvestor />}
    </>
  );
}

export default LandingPage;
