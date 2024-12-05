import { Carousel, HomeSteps, ImageData, InvestmentSimulator } from "./components";

const images: ImageData[] = [
  {
    img: "assets/carouselinversor1.jpg",
    text: "Inversor Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, cum. Obcaecati eveniet perferendis voluptate.",
  },
  {
    img: "assets/carouselinversor2.jpg",
    text: "Dinero Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, cum. Obcaecati eveniet perferendis voluptate.",
  },
  {
    img: "assets/carouselinversor3.jpg",
    text: "Ganancias Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, cum. Obcaecati eveniet perferendis voluptate.",
  },
  {
    img: "assets/carouselinversor4.jpg",
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
