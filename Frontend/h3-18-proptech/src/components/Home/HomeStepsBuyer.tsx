import CardStep from "./components/CardStep";

export const HomeStepsBuyer = () => {
  return (
    <div className="h-[500px]  bg-contrast  justify-center flex items-center flex-col my-16">
      <p className=" text-headline-medium-medium mt-4">Todo en simples pasos</p>
      <p className=" text-title-large-regular mt-4 mb-10 max-w-[700px]">
        Conoce cómo funciona nuestra plataforma en unos simples pasos y comienza
        a gestionar tu financiamiento rápidamente.
      </p>
      <div className="flex gap-6">
        <CardStep
          img="https://picsum.photos/160/160"
          title="Registro y validación"
        >
          Regístrate en la plataforma y valida tu identidad para garantizar un
          proceso seguro y confiable.
        </CardStep>
        <CardStep
          img="https://picsum.photos/160/160"
          title="Simulación de Crédito"
        >
          Utiliza el simulador de crédito para conocer las opciones disponibles
          según tus necesidades de financiamiento: monto, plazo y tasa de
          interés.
        </CardStep>
        <CardStep
          img="https://picsum.photos/160/160"
          title="Solicitud de financiamiento"
        >
          Completa tu solicitud de financiamiento directamente en la plataforma,
          proporcionando los datos requeridos para procesarla.
        </CardStep>
        <CardStep
          img="https://picsum.photos/160/160"
          title="Gestión del financiamiento"
        >
          Una vez aprobado, administra tus pagos y monitorea tu progreso a
          través de una interfaz fácil de usar.
        </CardStep>
      </div>
    </div>
  );
};
