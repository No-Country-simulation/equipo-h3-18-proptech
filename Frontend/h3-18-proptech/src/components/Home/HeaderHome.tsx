import SwitchButton from "../common/SwitchButton";

interface Props {
  action: () => void;
}

export const HeaderHome = ({ action }: Props) => {
  return (
    <div className="h-[136px]  bg-tertiary justify-center flex items-center">
      <p className=" text-title-large-regular max-w-[340px]">
        Elige tu perfil y accede a la información que se adapte a tus
        necesidades.
      </p>
      <SwitchButton action={action} />
    </div>
  );
};
