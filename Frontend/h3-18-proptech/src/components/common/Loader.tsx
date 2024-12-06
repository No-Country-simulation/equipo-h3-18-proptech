interface Props {
  size: "button" | "page";
  border: "normal" | "bold";
  borderColor: "primary-blue" | "primary-orange" | "secondary" | "disabled";
}

export function Loader({ size, border, borderColor }: Props) {
  const sizeStyle = {
    button: "size-8",
    page: "size-20",
  };

  const borderStyle = {
    normal: "border-[6px]",
    bold: "border-8",
  };

  const borderColorStyle = {
    "primary-blue": "border-primaryVar1 border-t-contrast",
    "primary-orange": "border-secondary border-t-contrast",
    secondary: "border-contrast border-t-primary",
    disabled: "border-constrast border-t-primary",
  };

  return (
    <div className="relative flex mx-2 justify-center items-center">
      <div
        className={`${sizeStyle[size]} rounded-full animate-spin ${borderStyle[border]} border-solid ${borderColorStyle[borderColor]} shadow-md`}
      ></div>
    </div>
  );
}

export default Loader;
