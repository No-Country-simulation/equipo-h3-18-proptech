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
            className={`absolute inset-0 transition-transform transform duration-700 ${
              index === position ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <h3 className="text-headline-medium-medium absolute left-24 bottom-1/2 translate-y-1/2 w-[450px]">
              {text}
            </h3>
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
