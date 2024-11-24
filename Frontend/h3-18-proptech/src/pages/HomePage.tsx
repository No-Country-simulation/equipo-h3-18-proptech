import { Link } from "react-router-dom";
import Chatbot from "../components/Chatbot/Chatbot";

export function HomePage() {
  return (
    <div className="relative flex-1">
      <div>HomePage</div>
      <Link to={"./login"} className="text-blue-500">
        Ir al login
      </Link>
      <Link to={"./register"} className="text-blue-500 block">
        Ir al register
      </Link>
      <Link to={"./simular-prestamo"} className="text-blue-500 block">
        Ir al simulador de préstamos
      </Link>
      <Chatbot/>
    </div>
  );
}

export default HomePage;
