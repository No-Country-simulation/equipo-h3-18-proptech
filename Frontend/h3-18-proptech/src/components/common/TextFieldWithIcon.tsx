import { EyeIcon, PencilIcon } from "../icons";

interface Props {
    text: string,
    onClick: () => void;
    icon: "pencil" | "eye"
}

export function TextFieldWithIcon({text, onClick, icon}: Props) {
  return (
    <article
      className="grid grid-cols-[1fr_0.1fr] gap-2 relative items-center"
    >
      <span className="border-[3px] text-body-large-regular py-2 px-3 rounded-md shadow-md focus:outline-none  border-primary truncate">
        {text}
      </span>
      <button
        onClick={onClick}
        type="button"
        className="bg-background p-2 flex items-center justify-center rounded-lg shadow-md shadow-tertiary hover:bg-tertiary transition-colors max-w-10"
      >
        {icon === "pencil" && <PencilIcon className="size-6"/>}
        {icon === "eye" && <EyeIcon className="size-6"/>}
      </button>
    </article>
  );
}

export default TextFieldWithIcon;
