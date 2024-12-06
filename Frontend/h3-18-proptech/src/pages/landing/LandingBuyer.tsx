import { Carousel, HomeSteps, ImageData, LoanSimulator } from "./components";

const images: ImageData[] = [
  {
    img: "assets/carouselbuyer1.webp",
    text: "El camino hacia tu nuevo lote empieza aquí.",
  },
  {
    img: "assets/carouselbuyer2.webp",
    text: "Elegí el plan de financiación que mejor se adapta a vos.",
  },
  {
    img: "assets/carouselbuyer3.webp",
    text: "Transformá tu sueño en una realidad con nosotros.",
  },
  {
    img: "assets/carouselbuyer4.webp",
    text: "Facilidad y confianza para que des el gran paso.",
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
