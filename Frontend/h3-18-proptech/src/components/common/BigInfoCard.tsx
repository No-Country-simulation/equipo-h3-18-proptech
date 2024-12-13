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
    <div className="max-w-[520px] min-h-[290px] bg-contrast drop-shadow-md shadow-md shadow-[#00000025] flex flex-col items-center p-8">
      <div className="flex flex-col sm:flex-row w-full min-h-[120px] justify-center items-center gap-x-8 gap-y-4">
        <div className="max-w-[100px] flex justify-center items-center">{icon}</div>
        <p className=" text-title-large-regular max-w-[300px] text-center">
          {children}
        </p>
      </div>
      <div className="min-h-[2px] bg-tertiary w-full my-4"></div>
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
