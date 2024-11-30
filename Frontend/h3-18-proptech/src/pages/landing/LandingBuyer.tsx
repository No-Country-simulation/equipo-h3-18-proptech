import { Carousel, HomeSteps, ImageData } from "../../components/Home";
import LoanSimulator from "../../components/Home/LoanSimulator";

const images: ImageData[] = [
  {
    img: "https://via.placeholder.com/800x400.png?text=Slide+1",
    text: "Comprador Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, cum. Obcaecati eveniet perferendis voluptate.",
  },
  {
    img: "https://via.placeholder.com/800x400.png?text=Slide+2",
    text: "Terreno Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, cum. Obcaecati eveniet perferendis voluptate.",
  },
  {
    img: "https://via.placeholder.com/800x400.png?text=Slide+3",
    text: "Cuotas Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, cum. Obcaecati eveniet perferendis voluptate.",
  },
];

function LandingBuyer() {
  return (
    <>
      <Carousel images={images} />
      <HomeSteps />
      <div id="simulator">
        <LoanSimulator />
      </div>
    </>
  );
}

export default LandingBuyer;
