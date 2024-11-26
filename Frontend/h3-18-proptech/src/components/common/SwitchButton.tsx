import { useSwitchStore } from "../../stores";

export default function SwitchButton() {
  const { role, setBuyer, setInvestor } = useSwitchStore();

  const handleClickBuyer = () => {
    setBuyer();
  };

  const handleClickInvestor = () => {
    setInvestor();
  };

  return (
    <div className="bg-primaryVar1 rounded-2xl text-title-medium-semi-bold text-contrast h-[60px] w-[250px] sm:w-[342px] text-center flex items-center justify-evenly">
      <ButtonOnOff on={role === "buyer"} action={handleClickBuyer}>
        Comprador
      </ButtonOnOff>
      <ButtonOnOff on={role === "investor"} action={handleClickInvestor}>
        Inversor
      </ButtonOnOff>
    </div>
  );
}

interface Props {
  children: string;
  on: boolean;
  action: () => void;
}

function ButtonOnOff({ children, on, action }: Props) {
  return (
    <button
      className={`${on ? "bg-contrast text-base-color" : ""} w-[110px] sm:w-[150px] h-[44px] rounded-lg m-auto`}
      onClick={action}
      disabled={on}
    >
      {children}
    </button>
  );
}
