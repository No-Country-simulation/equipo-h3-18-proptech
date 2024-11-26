import SwitchButton from "../common/SwitchButton";

export const HeaderHome = () => {
  return (
    <div className="h-[136px]  bg-tertiary justify-center flex items-center">
      <p className=" hidden sm:block text-title-large-regular max-w-[340px]">
        Elige tu perfil y accede a la información que se adapte a tus
        necesidades.
      </p>
      <SwitchButton/>
    </div>
  );
};
