interface Props {
  text: string;
  isLastOne: boolean;
}

export function ChatbotMessageBox({ text = "", isLastOne }: Props) {
  return (
    <article className="flex gap-4 items-start">
      <span
        className={
          isLastOne
            ? "rounded-full bg-slate-100 text-xl my-2 transition-all"
            : "rounded-full text-xl my-2 invisible"
        }
      >
        <img src="/assets/bot.png" className="w-8 h-8"/>
      </span>
      <p className="bg-slate-100 px-2 py-1 my-2 max-w-[70%] rounded-lg self-center">
        {text}
      </p>
    </article>
  );
}

export default ChatbotMessageBox;
