import Chatbot from "../components/Chatbot/Chatbot";
import LandingPage from "./landing/LandingPage";

export function HomePage() {
  return (
    <div className="relative flex-1">
      <LandingPage />
      <Chatbot />
    </div>
  );
}

export default HomePage;
