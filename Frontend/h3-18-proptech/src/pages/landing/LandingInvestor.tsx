import { Carousel, HomeSteps, ImageData, InvestmentSimulator } from "./components";

const images: ImageData[] = [
  {
    img: "assets/carouselinversor1.jpg",
    text: "Invertí con seguridad y control en cada etapa de tu proceso.",
  },
  {
    img: "assets/carouselinversor2.jpg",
    text: "Descubrí oportunidades que impulsan tu futuro financiero.",
  },
  {
    img: "assets/carouselinversor3.jpg",
    text: "Gestioná tu inversión en un solo lugar, fácil y rápido.",
  },
  {
    img: "assets/carouselinversor4.jpg",
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
