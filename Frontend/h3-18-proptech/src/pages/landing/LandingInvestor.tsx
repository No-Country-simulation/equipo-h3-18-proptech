import { Carousel, HomeSteps, ImageData, InvestmentSimulator } from "./components";

const images: ImageData[] = [
  {
    img: "assets/carouselinvestor1.webp",
    text: "Invertí con seguridad y control en cada etapa de tu proceso.",
  },
  {
    img: "assets/carouselinvestor2.webp",
    text: "Descubrí oportunidades que impulsan tu futuro financiero.",
  },
  {
    img: "assets/carouselinvestor3.webp",
    text: "Gestioná tu inversión en un solo lugar, fácil y rápido.",
  },
  {
    img: "assets/carouselinvestor4.webp",
    text: "Descubrí el potencial de una inversión segura y sólida.",
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
