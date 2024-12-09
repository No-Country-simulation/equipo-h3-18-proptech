import { ReactNode } from "react";
import Button from "./Button";

export interface PropsInfoCard {
  children: string;
  icon: ReactNode;
  buttonText: string;
  to?: string;
  action?: () => void;
}

export function BigInfoCard({
  children,
  icon,
  buttonText,
  to,
  action,
}: PropsInfoCard) {
  return (
    <div className="w-[520px] h-[290px] bg-contrast drop-shadow-md shadow-md shadow-[#00000025] flex flex-col items-center p-8">
      <div className="flex w-full h-[145px] justify-center items-center">
        <div className="w-[100px] flex justify-center items-center">{icon}</div>
        <p className=" text-title-large-regular w-[300px] text-center">
          {children}
        </p>
      </div>
      <div className="h-[2px] bg-tertiary w-full"></div>
      {to ? (
        <Button
          color="primary-orange"
          size="medium"
          type="link"
          to={to}
          classname="mt-auto"
        >
          {buttonText}
        </Button>
      ) : (
        <Button
          color="primary-orange"
          size="medium"
          type="button"
          onClick={action}
          classname="mt-auto"
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
}

export default BigInfoCard;
