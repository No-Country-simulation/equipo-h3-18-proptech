import { ChatbotAnswer } from "../../interfaces/Chatbot";
import { chatbotAnswers } from "./Answers";

function UserMessageBox({
    message = "",
    action,
    sendMessage,
  }: {
    message: string;
    action: string;
    sendMessage: (response: ChatbotAnswer) => void;
  }) {
    return (
      <article className="flex gap-4 items-start justify-end">
        <button
          onClick={() => {
            const answer = chatbotAnswers.find(
              (answers) => answers.question === action
            );
            if (answer) sendMessage(answer);
          }}
          className="bg-blue-400 hover:bg-blue-600 text-white px-2 py-1 my-2 max-w-[70%] rounded-lg self-center"
        >
          {message}
        </button>
      </article>
    );
  }

export default UserMessageBox