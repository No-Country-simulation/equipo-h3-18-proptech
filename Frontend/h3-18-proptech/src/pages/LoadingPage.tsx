import { Loader } from "../components/common";

interface Props {
  background: "tertiary" | "contrast" | "transparent";
  size: "page" | "section";
  classname?: string;
}

function LoadingPage({ background, size, classname }: Props) {
  const sizeStyle = {
    page: "min-h-screen",
    section: "flex-1",
  };

  const backgroundStyle = {
    tertiary: "bg-tertiary",
    contrast: "bg-contrast",
    transparent: "bg-transparent"
  };

  return (
    <section
      className={`${sizeStyle[size]} ${backgroundStyle[background]} ${classname} flex items-center justify-center`}
    >
      <Loader border="bold" borderColor="primary-blue" size="page" />
    </section>
  );
}

export default LoadingPage;
