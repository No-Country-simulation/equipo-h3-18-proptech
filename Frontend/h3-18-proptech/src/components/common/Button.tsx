import { Link, To } from "react-router-dom";

interface Props {
  children: string;
  size: "small" | "medium" | "large";
  color: "primary-blue" | "primary-orange" | "secondary";
  type?: "submit" | "reset" | "button" | "link" | undefined;
  action?: () => void;
  to?: To;
  classname?: string;
}

function Button({ size, color, action, children, type, classname, to }: Props) {
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

  return type === "link" ? (
    <Link
      to={to ?? "/"}
      className={`${sizeStyle[size]} ${colorStyle[color]} ${classname} flex items-center justify-center rounded-lg transition-colors drop-shadow-lg shadow-md text-title-medium-semi-bold`}
    >
      {children}
    </Link>
  ) : (
    <button
      className={`${sizeStyle[size]} ${colorStyle[color]} ${classname} rounded-lg transition-colors drop-shadow-lg shadow-md text-title-medium-semi-bold`}
      type={type}
      onClick={() => action}
    >
      {children}
    </button>
  );
}

export default Button;
