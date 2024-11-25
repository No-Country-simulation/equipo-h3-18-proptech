import Chatbot from "../components/Chatbot/Chatbot";
import LoanSimulator from "../components/Home/LoanSimulator";

export function HomePage() {
  return (
    <div className="relative flex-1">
      <LoanSimulator/>
      <Chatbot/>
    </div>
  );
}

export default HomePage;
