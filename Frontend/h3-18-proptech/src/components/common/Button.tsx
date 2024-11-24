interface Props {
  children: string;
  size: "small" | "medium" | "large";
  color: "primary-blue" | "primary-orange" | "secondary";
  action: () => void;
  type?: "submit" | "reset" | "button" | undefined;
}

function Button({ size, color, action, children, type }: Props) {
  const sizeStyle = {
    small: "w-[159px] h-[50px]",
    medium: "w-[251px] h-[50px]",
    large: "w-[340px] h-[50px]",
  };

  const colorStyle = {
    "primary-orange": "bg-secondary text-contrast hover:bg-secondaryVar1",
    "primary-blue": "bg-primary text-contrast hover:bg-primaryVar2",
    secondary: "bg-white border border-primary border-2 hover:bg-tertiary",
  };

  return (
    <button
      className={`${sizeStyle[size]} ${colorStyle[color]} rounded-lg transition-colors drop-shadow-lg shadow-md text-title-medium-semi-bold`}
      type={type}
      onClick={() => action}
    >
      {children}
    </button>
  );
}

export default Button;
