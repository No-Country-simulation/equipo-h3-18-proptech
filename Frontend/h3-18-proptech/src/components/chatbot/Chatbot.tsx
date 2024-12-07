import { useEffect, useState } from "react";
import { chatbotAnswers } from "./Answers";
import { useChatbotStore } from "../../stores";
import { CloseIcon } from "../icons";
import { ChatbotMessageBox, UserMessageBox } from ".";

const chatbotStyles = {
  visible:
    "fixed top-0 sm:top-auto left-0 sm:left-auto sm:bottom-24 sm:right-4 bg-white z-50 shadow-lg rounded-lg h-screen sm:h-[80%] sm:max-w-[400px] min-w-[200px] w-full origin-bottom-right opacity-100",
  hidden:
    "fixed top-0 sm:top-auto left-0 sm:left-auto sm:bottom-24 sm:right-4 bg-white z-50 shadow-lg rounded-lg h-screen sm:h-[80%] sm:max-w-[400px] min-w-[200px] w-full scale-0 opacity-0",
};

export function Chatbot() {
  const messages = useChatbotStore((state) => state.messages);
  const options = useChatbotStore((state) => state.options);
  const addNewMessages = useChatbotStore((state) => state.addNewMessage);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage = chatbotAnswers.find(
        (message) => message.question === "welcome"
      );
      if (welcomeMessage) addNewMessages(welcomeMessage);
    }
  }, []);

  useEffect(() => {
    document
      .getElementById("chatbotMessagesSection")
      ?.scrollTo({left: 0, top: document.getElementById("chatbotMessagesSection")?.scrollHeight ?? 0, behavior: "smooth"}
      );
  }, [messages]);


  return (
    <>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="rounded-full bg-white fixed bottom-4 right-4 hover:scale-125 transition-all text-xl duration-300 z-50"
      >
        <img src="/assets/bot.png" className="w-14 h-14"/>
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
              className="absolute top-0 bottom-0 right-2 h-fit my-auto rounded-full p-1 hover:bg-gray-50"
              onClick={() => setIsVisible(!isVisible)}
            >
              <CloseIcon className="h-4 w-4" />
            </button>
            <h6 className="text-center font-bold text-lg">Financibot</h6>
          </header>
          <section
            id="chatbotMessagesSection"
            className="overflow-y-scroll h-full ps-2 pe-4 pb-4 mb-2 justify-between transition-all"
          >
            <h4 className="text-2xl text-center mt-3 font-semibold">
              Bienvenido a Financia.ai
            </h4>
            {messages.map(({ text }, index) => (
              <ChatbotMessageBox
                key={index}
                text={text}
                isLastOne={index === messages.length - 1}
              />
            ))}
            {options.map(({ text, action }, index) => {
              return <UserMessageBox key={index} text={text} action={action} />;
            })}
          </section>
        </section>
      </article>
    </>
  );
}

export default Chatbot;
