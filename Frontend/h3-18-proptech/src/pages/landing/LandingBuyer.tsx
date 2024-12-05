import { Carousel, HomeSteps, ImageData, LoanSimulator } from "./components";

const images: ImageData[] = [
  {
    img: "assets/carouselcomprador1.jpg",
    text: "Comprador Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, cum. Obcaecati eveniet perferendis voluptate.",
  },
  {
    img: "assets/carouselcomprador2.jpg",
    text: "Terreno Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, cum. Obcaecati eveniet perferendis voluptate.",
  },
  {
    img: "assets/carouselcomprador3.jpg",
    text: "Cuotas Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, cum. Obcaecati eveniet perferendis voluptate.",
  },
  {
    img: "assets/carouselcomprador4.jpg",
    text: "Cuotas Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, cum. Obcaecati eveniet perferendis voluptate.",
  },
];

export function LandingBuyer() {
  return (
    <>
      <Carousel images={images} />
      <HomeSteps />
      <div id="simulator" className="pt-16">
        <LoanSimulator />
      </div>
    </>
  );
}

export default LandingBuyer;
