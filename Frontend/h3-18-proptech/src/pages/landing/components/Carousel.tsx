import { useEffect, useState } from "react";

interface Props {
  images: ImageData[];
}

export interface ImageData {
  img: string;
  text: string;
}

export const Carousel = ({ images }: Props) => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (position < images.length - 1) {
        setPosition(position + 1);
      } else {
        setPosition(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [position]);

  const handleNewPosition = (position: number) => {
    if (position >= 0 && position < images.length) {
      setPosition(position);
    }
  };

  return (
    <div className="relative h-[500px]  bg-[#d9d9d9]">
      <div className="overflow-hidden relative h-[500px] ">
        {images.map(({ img, text }, index) => (
          <div
            key={index}
            className={`absolute inset-0 transform duration-700 transition-all ${
              index === position ? "opacity-100" : "opacity-0"
            }`}
          >
            <section className="font-nunito text-contrast absolute font-bold text-center bg-gradient-to-r from-blue-500/30 to-orange-400/30 size-full flex items-center justify-center select-none">
              <div className="relative size-full flex items-center justify-center">
                <span className="max-w-[18ch] text-4xl md:text-6xl self-center md:absolute md:top-36 md:left-28 drop-shadow-2xl px-8" style={{textShadow: "#000000 1px 0 10px"}}>{text}</span>
              </div>
            </section>
            <img
              src={img}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
        {images.map(({}, index) => (
          <Indicator
            key={index}
            index={index}
            position={position}
            setPosition={handleNewPosition}
          />
        ))}
      </div>
    </div>
  );
};

interface PropsInd {
  position: number;
  index: number;
  setPosition: (position: number) => void;
}

const Indicator = ({ index, position, setPosition }: PropsInd) => {
  const handleClick = () => {
    setPosition(index);
  };
  return (
    <button
      className={`${index === position ? "w-6 bg-primary" : "w-4 bg-contrast"} transition-all duration-700 h-4 rounded mx-1`}
      onClick={handleClick}
    ></button>
  );
};
