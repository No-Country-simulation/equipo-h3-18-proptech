import { Carousel, HomeSteps, ImageData, LoanSimulator } from "./components";

const images: ImageData[] = [
  {
    img: "assets/carouselcomprador1.jpg",
    text: "El camino hacia tu nuevo lote empieza aquí.",
  },
  {
    img: "assets/carouselcomprador2.jpg",
    text: "Elegí el plan de financiación que mejor se adapta a vos.",
  },
  {
    img: "assets/carouselcomprador3.jpg",
    text: "Transformá tu sueño en una realidad con nosotros.",
  },
  {
    img: "assets/carouselcomprador4.jpg",
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
