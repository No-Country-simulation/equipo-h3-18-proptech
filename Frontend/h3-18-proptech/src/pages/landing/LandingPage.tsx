import { LandingBuyer, LandingInvestor } from ".";
import { useSwitchStore } from "../../stores";
import { HeaderHome } from "./components";

export function LandingPage() {
  const { role } = useSwitchStore();

  return (
    <>
      <HeaderHome />
      {role === "buyer" ? <LandingBuyer /> : <LandingInvestor />}
    </>
  );
}

export default LandingPage;
