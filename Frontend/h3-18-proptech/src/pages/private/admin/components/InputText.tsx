interface InputProps {
  children: string;
  title: string;
}

export const InputText = ({ children, title }: InputProps) => {
  return (
    <div className="w-full">
      <p className="text-body-medium-regular p-2">{title}</p>
      <div className="flex-1 py-2 px-4 shadow-md shadow-tertiary border-[3px] rounded-lg border-primary text-ellipsis max-w-[50vw] whitespace-nowrap overflow-hidden md:w-full items-center flex">
        {children}
      </div>
    </div>
  );
};