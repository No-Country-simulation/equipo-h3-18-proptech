import { useEffect, useState } from "react";

interface Props {
  images: ImageData[];
}

export interface ImageData {
  img: string;
  text: string;
}

export const Carousel = ({ images }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slide = () => {
    setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      console.log(currentIndex);
    }, 5000);
  };

  useEffect(() => {
    slide();
  }, []);

  return (
    <div className="relative h-[500px]  bg-[#d9d9d9]">
      <div className="overflow-hidden relative h-[500px] ">
        {images.map(({ img, text }, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform transform ${
              index === currentIndex ? "translate-x-0" : "translate-x-full"
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
            currentIndex={currentIndex}
            setIndex={setCurrentIndex}
          />
        ))}
      </div>
    </div>
  );
};

interface PropsInd {
  currentIndex: number;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}

const Indicator = ({ index, currentIndex, setIndex }: PropsInd) => {
  const handleClick = () => {
    setIndex(index);
  };
  return (
    <button
      className={`${index === currentIndex ? "w-6 bg-primary" : "w-4 bg-contrast"} h-4 rounded mx-1`}
      onClick={handleClick}
    ></button>
  );
};
