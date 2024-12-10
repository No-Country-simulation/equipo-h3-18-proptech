import { useEffect } from "react";
import { LandingBuyer, LandingInvestor } from ".";
import { useSessionStore, useSwitchStore } from "../../stores";
import { HeaderHome } from "./components";

export function LandingPage() {
  const { role, setRole } = useSwitchStore();
  const sessionRole = useSessionStore((state) => state.role);

  useEffect(() => {
    setRole(sessionRole === "Inversor" ? "investor" : "buyer");
  }, []);

  return (
    <>
      {sessionRole !== "Cliente" && sessionRole !== "Inversor" && (
        <HeaderHome />
      )}
      {role === "buyer" ? <LandingBuyer /> : <LandingInvestor />}
    </>
  );
}

export default LandingPage;
