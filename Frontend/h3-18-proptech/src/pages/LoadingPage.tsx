import { Loader } from "../components/common";

interface Props {
  background: "tertiary" | "contrast" | "transparent";
  size: "page" | "section";
}

function LoadingPage({ background, size }: Props) {
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
      className={`${sizeStyle[size]} ${backgroundStyle[background]}  flex items-center justify-center`}
    >
      <Loader border="bold" borderColor="primary-blue" size="page" />
    </section>
  );
}

export default LoadingPage;
