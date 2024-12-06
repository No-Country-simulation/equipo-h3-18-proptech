import { CardStep } from ".";
import { useSwitchStore } from "../../../stores";


export const HomeSteps = () => {
  const { role } = useSwitchStore();

  return (
    <div className="min-h-full  bg-contrast  justify-center flex items-center flex-col mt-16">
      <p className=" text-headline-medium-medium mt-4 ">Todo en simples pasos</p>
      <p className=" text-title-large-regular mt-4 mb-10 w-[90%] md:w-[700px]">
        Conoce cómo funciona nuestra plataforma en unos simples pasos y comienza
        a gestionar tu {role === "buyer" ? "financiamiento" : "inversión"}{" "}
        rápidamente.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {role === "buyer" ? (
          <>
            {cardDataBuyer.map(({ img, title, children }) => (
              <CardStep key={title} img={img} title={title}>
                {children}
              </CardStep>
            ))}
          </>
        ) : (
          <>
            {cardDataInvestor.map(({ img, title, children }) => (
              <CardStep key={title} img={img} title={title}>
                {children}
              </CardStep>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

interface cardData {
  title: string;
  img: string;
  children: string;
}

const cardDataBuyer: cardData[] = [
  {
    img: "https://picsum.photos/160/160",
    title: "Registro y validación",
    children:
      "Regístrate en la plataforma y valida tu identidad para garantizar un proceso seguro y confiable.",
  },
  {
    img: "assets/calculadora.gif",
    title: "Simulación de crédito",
    children:
      "Utiliza el simulador de crédito para conocer las opciones disponibles según tus necesidades de financiamiento: monto, plazo y tasa de interés.",
  },
  {
    img: "https://picsum.photos/160/160",
    title: "Solicitud de financiamiento",
    children:
      "Completa tu solicitud de financiamiento directamente en la plataforma, proporcionando los datos requeridos para procesarla.",
  },
  {
    img: "https://picsum.photos/160/160",
    title: "Gestión del financiamiento",
    children:
      "Una vez aprobado, administra tus pagos y monitorea tu progreso a través de una interfaz fácil de usar.",
  },
];

const cardDataInvestor: cardData[] = [
  {
    img: "https://picsum.photos/160/160",
    title: "Registro y validación",
    children:
      "Regístrate en la plataforma y valida tu identidad para garantizar seguridad y confianza en las operaciones.",
  },
  {
    img: "https://picsum.photos/160/160",
    title: "Explora opciones de financiamiento",
    children:
      "Accede a herramientas que te permiten simular condiciones de crédito, evaluar montos, plazos y tasas de interés según las oportunidades disponibles.",
  },
  {
    img: "https://picsum.photos/160/160",
    title: "Consulta reportes y métricas",
    children:
      "Usa el panel de control personalizado para analizar estadísticas clave, proyecciones y tendencias de tus inversiones.",
  },
  {
    img: "https://picsum.photos/160/160",
    title: "Gestiona tus Inversiones",
    children:
      "Realiza seguimientos de tus rendimientos, ajusta tus estrategias según los informes y optimiza tus decisiones de inversión.",
  },
];
