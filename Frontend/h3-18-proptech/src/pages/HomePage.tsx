import { Chatbot } from "../components/chatbot2";
import { LandingPage } from "./landing";
//
export function HomePage() {
  return (
    <div className="relative flex-1">
      <LandingPage />
      <Chatbot/>
    </div>
  );
}

export default HomePage;
