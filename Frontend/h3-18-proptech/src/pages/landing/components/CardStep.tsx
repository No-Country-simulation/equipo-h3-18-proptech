import { useState } from "react";

interface Props {
  title: string;
  children: string;
  img?: string;
}

export function CardStep({ children, img, title }: Props) {
  const [showInfo, setShowInfo] = useState(false);

  const handleClick = () => {
    setShowInfo(!showInfo);
  };

  const handleMouseEnter = () => {
    setShowInfo(true);
  };

  const handleMouseLeave = () => {
    setShowInfo(false);
  };

  return (
    <article onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div
        className={`relative bg-primary rounded-2xl w-[250px] h-[330px] flex items-center flex-col cursor-pointer transition ease-in-out duration-1000 transform-style-3d  ${showInfo && "transform rotate-y-180"}`}
        onClick={handleClick}
      >
        <div className=" w-[200px] h-[266px] border-2 border-secondary rounded-lg m-auto text-center flex items-center transform rotate-y-180 backface-hidden">
          <p className=" text-body-large-regular w-[150px] text-contrast m-auto">
            {children}
          </p>
        </div>
        <div
          className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] 
        backface-hidden h-full"
        >
          <div className="w-[160px] h-[160px] bg-[#d9d9d9] mt-[45px] mb-[32px] mx-auto">
            {img && <img src={img} alt="" />}
          </div>
          <p className=" text-title-large-semi-bold text-contrast w-[200px] text-center">
            {title}
          </p>
        </div>
      </div>
    </article>
  );
}

export default CardStep;
