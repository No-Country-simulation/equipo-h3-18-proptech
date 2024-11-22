interface Props {
  message: string | undefined;
  final: boolean;
}

function ChatbotMessageBox({ message = "", final }: Props) {
  return (
    <article className="flex gap-4 items-start">
      <span
        className={
          final
            ? "p-1 rounded-full bg-slate-100 border text-xl my-2 transition-all"
            : "p-1 rounded-full border text-xl my-2 invisible"
        }
      >
        🤖
      </span>
      <p className="bg-slate-100 px-2 py-1 my-2 max-w-[70%] rounded-lg self-center">
        {message}
      </p>
    </article>
  );
}

export default ChatbotMessageBox;
