import { Link, To } from "react-router-dom";
import useTransitionNavigation from "../../hooks/useTransitionNavigation";

interface Props {
  children: string;
  size: "small" | "medium" | "large";
  color: "primary-blue" | "primary-orange" | "secondary";
  type?: "submit" | "reset" | "button" | "link" | undefined;
  action?: () => void;
  to?: To;
  classname?: string;
}

export function Button({
  size,
  color,
  action,
  children,
  type,
  classname,
  to,
}: Props) {
  const sizeStyle = {
    small: "w-[clamp(129px,15vw,159px)] h-[50px]",
    medium: "w-[clamp(191px,25vw,251px)] h-[50px]",
    large: "w-[clamp(260px,30vw,340px)] h-[50px]",
  };

  const colorStyle = {
    "primary-orange": "bg-secondary text-contrast hover:bg-secondaryVar1",
    "primary-blue": "bg-primary text-contrast hover:bg-primaryVar2",
    secondary: "bg-white border-2 border-primary hover:bg-tertiary",
  };

  const navigate = useTransitionNavigation();

  return type === "link" ? (
    <Link
      onClick={(e) => {
        e.preventDefault();
        navigate(to ?? "/");
      }}
      to={to ?? "/"}
      className={`${classname} ${sizeStyle[size]} ${colorStyle[color]} px-2 py-1 text-center flex items-center justify-center rounded-lg transition-colors drop-shadow-lg shadow-md text-title-medium-semi-bold`}
    >
      {children}
    </Link>
  ) : (
    <button
      className={`${classname} ${sizeStyle[size]} ${colorStyle[color]} text-center rounded-lg transition-colors drop-shadow-lg shadow-md text-title-medium-semi-bold`}
      type={type}
      onClick={() => action}
    >
      {children}
    </button>
  );
}

export default Button;
