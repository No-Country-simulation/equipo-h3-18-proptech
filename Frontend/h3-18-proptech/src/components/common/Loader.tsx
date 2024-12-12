interface Props {
  size: "button" | "page";
  border: "normal" | "bold";
  borderColor: "primary-blue" | "primary-orange" | "secondary" | "disabled";
  classname?: string;
}

export function Loader({ size, border, borderColor, classname }: Props) {
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
    <span aria-label="Loading icon" className={`${classname} relative flex mx-2 justify-center items-center`} style={{gridArea: "stack",}}>
      <div
        className={`${sizeStyle[size]} rounded-full animate-spin ${borderStyle[border]} border-solid ${borderColorStyle[borderColor]} shadow-md`}
      ></div>
    </span>
  );
}

export default Loader;
