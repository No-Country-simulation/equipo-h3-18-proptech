import { ReactNode } from "react";

interface PropsInfoCard {
  title: string;
  icon: ReactNode;
  value: string;
}

export function InfoCard({ title, icon, value }: PropsInfoCard) {
  return (
    <div className="w-[250px] h-[165px] bg-contrast drop-shadow-md shadow-md shadow-[#00000025] flex flex-col items-center pt-6 px-4">
      <p className=" text-title-large-bold leading-[44px]">{title}</p>
      <div className="h-[2px] bg-secondary w-full"></div>
      <div className="flex w-full h-full items-center">
        {icon}
        <p className=" text-headline-small-medium mx-auto">{value}</p>
      </div>
    </div>
  );
}

export default InfoCard;
