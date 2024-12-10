interface Props {
  text: string;
  isLastOne: boolean;
  owner: "user" | "chatbot"
}

export function ChatbotMessageBox({ text = "", isLastOne, owner }: Props) {
  return (
    <article className={`flex gap-4 items-start ${owner === "chatbot" ? "justify-start" : "justify-end"}`}>
      <span
        className={
          isLastOne
            ? "rounded-full bg-slate-100 text-xl my-2 transition-all"
            : "rounded-full text-xl my-2 invisible"
        }
      >
        <img src="/assets/bot.png" className="w-8 h-8"/>
      </span>
      <p className={`px-2 py-1 my-2 max-w-[70%] rounded-lg ${owner === "chatbot" ? "bg-slate-100" : "bg-secondary text-contrast text-center"}`}>
        {text}
      </p>
    </article>
  );
}

export default ChatbotMessageBox;
