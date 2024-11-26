import { HeaderHome } from "../../components/Home";
import LandingBuyer from "./LandingBuyer";
import LandingInvestor from "./LandingInvestor";
import { useSwitchStore } from "../../stores";

function LandingPage() {
  const { role } = useSwitchStore();

  return (
    <>
      <HeaderHome />
      {role === "buyer" ? <LandingBuyer /> : <LandingInvestor />}
    </>
  );
}

export default LandingPage;
