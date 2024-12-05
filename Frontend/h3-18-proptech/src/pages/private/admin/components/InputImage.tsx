import { EyeIcon } from "../../../../components/icons";

interface ImageProps {
  title: string;
  action: () => void;
}

export const InputImage = ({ title, action }: ImageProps) => {
  return (
    <div className="flex gap-4 w-full">
      <div className="flex-1 py-2 px-4 shadow-md shadow-tertiary border-[3px] rounded-lg border-primary text-ellipsis max-w-[50vw] whitespace-nowrap overflow-hidden md:w-full">
        {title}
      </div>
      <button
        onClick={action}
        type="button"
        className="p-2 md:p-3 bg-background shadow-md shadow-tertiary rounded-lg hover:bg-tertiary transition-colors"
      >
        <EyeIcon className="h-6 w-6" />
      </button>
    </div>
  );
};