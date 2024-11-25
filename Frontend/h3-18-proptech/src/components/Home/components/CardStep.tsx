import { useState } from "react";

interface Props {
  title: string;
  children: string;
  img?: string;
}

function CardStep({ children, img, title }: Props) {
  const [showInfo, setShowInfo] = useState(false);

  const handleClick = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div
      className="bg-primary rounded-2xl w-[250px] h-[330px] flex items-center flex-col cursor-pointer"
      onClick={handleClick}
    >
      {showInfo ? (
        <div className=" w-[200px] h-[266px] border-2 border-secondary rounded-lg m-auto text-center flex items-center">
          <p className=" text-body-large-regular w-[150px] text-contrast m-auto">
            {children}
          </p>
        </div>
      ) : (
        <>
          <div className="w-[160px] h-[160px] bg-[#d9d9d9] mt-[45px] mb-[32px]">
            {img && <img src={img} alt="" />}
          </div>
          <p className=" text-title-large-semi-bold text-contrast w-[200px] text-center">
            {title}
          </p>
        </>
      )}
    </div>
  );
}

export default CardStep;
