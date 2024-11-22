import { useEffect, useState } from "react";
import {
  ChatbotAnswer,
  ChatMessage,
  UserOption,
} from "../../interfaces/Chatbot";
import { chatbotAnswers } from "./Answers";
import ChatbotMessageBox from "./ChatbotMessageBox";
import UserMessageBox from "./UserMessageBox";

const chatbotStyles = {
  visible:
    "absolute sm:fixed top-0 sm:top-auto left-0 sm:left-auto sm:bottom-24 sm:right-4 bg-white z-50 shadow-lg rounded-lg h-screen sm:h-[80%] sm:max-w-[400px] min-w-[200px] w-full origin-bottom-right opacity-100",
  hidden:
    "absolute sm:fixed top-0 sm:top-auto left-0 sm:left-auto sm:bottom-24 sm:right-4 bg-white z-50 shadow-lg rounded-lg h-screen sm:h-[80%] sm:max-w-[400px] min-w-[200px] w-full scale-0 opacity-0",
};

function Chatbot() {
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [myOptions, setMyOptions] = useState<UserOption[]>([]);

  const sendMessage = (response: ChatbotAnswer) => {
    if (response.options.length > 0) {
      setMyOptions([...response.options]);
      setMessages([...messages, response]);
    } else {
      setMessages([...messages, response]);
    }
  };

  useEffect(() => {
    const welcomeMessage = chatbotAnswers.find(
      (message) => message.question === "welcome"
    );
    if (welcomeMessage) sendMessage(welcomeMessage);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="p-2 rounded-full bg-slate-300 border fixed bottom-4 right-4 hover:scale-125 transition-all text-xl"
      >
        🤖
      </button>
      <article
        className={
          isVisible ? chatbotStyles["visible"] : chatbotStyles["hidden"]
        }
        style={{
          transition:
            "width 200ms, height 200ms, max-height 200ms, transform 300ms cubic-bezier(0, 1.2, 1, 1), opacity 83ms ease-out",
        }}
      >
        <section className="flex flex-col relative h-full gap-2">
          <header className="relative w-100 border-b-2 px-1 py-4 rounded-t-lg">
            <button
              className="absolute top-0 bottom-0 right-2"
              onClick={() => setIsVisible(!isVisible)}
            >
              ❌
            </button>
            <h6 className="text-center font-bold text-lg">Financibot</h6>
          </header>
          <section className="overflow-y-scroll h-full ps-2 pe-4 pb-4">
            <h4 className="text-2xl text-center mt-3 font-semibold">
              Bienvenido. ¿Cómo podemos ayudarte?
            </h4>
            {messages.map(({ text }, index) => (
              <ChatbotMessageBox message={text} final={index === messages.length - 1} />
            ))}
            {myOptions.map(({ text, action }) => {
              return (
                <UserMessageBox
                  message={text}
                  action={action}
                  sendMessage={sendMessage}
                />
              );
            })}
          </section>
        </section>
      </article>
    </>
  );
}

export default Chatbot;
