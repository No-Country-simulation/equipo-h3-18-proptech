import { useState } from "react";

interface Props1 {
  action: () => void;
}

export default function SwitchButton({ action }: Props1) {
  const [button1, setButton1] = useState(true);
  const [button2, setButton2] = useState(false);

  const handleClick = () => {
    setButton1(!button1);
    setButton2(!button2);
    action();
  };

  return (
    <div className="bg-primaryVar1 rounded-2xl text-title-medium-semi-bold text-contrast h-[60px] w-[342px] text-center flex items-center justify-evenly">
      <ButtonOnOff on={button1} action={handleClick}>
        Comprador
      </ButtonOnOff>
      <ButtonOnOff on={button2} action={handleClick}>
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
      className={`${on ? "bg-contrast text-base-color" : ""} w-[150px] h-[44px] rounded-lg m-auto`}
      onClick={action}
      disabled={on}
    >
      {children}
    </button>
  );
}
