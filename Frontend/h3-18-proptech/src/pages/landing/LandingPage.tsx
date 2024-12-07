import { LandingBuyer, LandingInvestor } from ".";
import { useSessionStore, useSwitchStore } from "../../stores";
import { HeaderHome } from "./components";

export function LandingPage() {
  const { role } = useSwitchStore();
  const sessionRole = useSessionStore(state => state.role)

  return (
    <>
      {sessionRole !== "Cliente" && sessionRole !== "Inversor" && <HeaderHome />}
      {role === "buyer" ? <LandingBuyer /> : <LandingInvestor />}
    </>
  );
}

export default LandingPage;
