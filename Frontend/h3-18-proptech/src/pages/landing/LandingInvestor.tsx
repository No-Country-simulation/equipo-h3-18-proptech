import { Carousel, HomeSteps, ImageData, InvestmentSimulator } from "./components";

const images: ImageData[] = [
  {
    img: "https://via.placeholder.com/800x400.png?text=Slide+1",
    text: "Inversor Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, cum. Obcaecati eveniet perferendis voluptate.",
  },
  {
    img: "https://via.placeholder.com/800x400.png?text=Slide+2",
    text: "Dinero Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, cum. Obcaecati eveniet perferendis voluptate.",
  },
  {
    img: "https://via.placeholder.com/800x400.png?text=Slide+3",
    text: "Ganancias Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, cum. Obcaecati eveniet perferendis voluptate.",
  },
];

export function LandingInvestor() {
  return (
    <>
      <Carousel images={images} />
      <HomeSteps />
      <div id="simulator" className="pt-16">
        <InvestmentSimulator />
      </div>
    </>
  );
}

export default LandingInvestor;
