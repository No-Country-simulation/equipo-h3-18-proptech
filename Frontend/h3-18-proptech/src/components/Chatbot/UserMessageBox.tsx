import { useChatbotStore } from "../../stores";
import { chatbotAnswers } from "./Answers";

interface Props {
  text: string;
  action: string;
}

function UserMessageBox({ text = "", action }: Props) {
  const addNewMessage = useChatbotStore((state) => state.addNewMessage);
  return (
    <article className="flex gap-4 items-start justify-end">
      <button
        onClick={() => {
          const answer = chatbotAnswers.find(
            (answers) => answers.question === action
          );
          if (answer) addNewMessage(answer);
        }}
        className="bg-blue-400 hover:bg-blue-600 text-white px-2 py-1 my-2 max-w-[70%] rounded-lg self-center"
      >
        {text}
      </button>
    </article>
  );
}

export default UserMessageBox;
