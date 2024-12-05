import { SwitchButton } from "../../../components/common";

export const HeaderHome = () => {
  return (
    <div className="py-4 md:py-10 bg-tertiary justify-center flex items-center">
      <p className=" hidden md:block text-title-large-regular max-w-[340px]">
        Elige tu perfil y accede a la información que se adapte a tus
        necesidades.
      </p>
      <SwitchButton/>
    </div>
  );
};
