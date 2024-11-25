import CardStep from "./components/CardStep";

export const HomeStepsInvestor = () => {
  return (
    <div className="h-[500px]  bg-contrast  justify-center flex items-center flex-col my-16">
      <p className=" text-headline-medium-medium mt-4">Todo en simples pasos</p>
      <p className=" text-title-large-regular mt-4 mb-10 max-w-[700px]">
        Conoce cómo funciona nuestra plataforma en unos simples pasos y comienza
        a gestionar tu inversión rápidamente.
      </p>
      <div className="flex gap-6">
        <CardStep
          img="https://picsum.photos/160/160"
          title="Registro y validación"
        >
          Regístrate en la plataforma y valida tu identidad para garantizar
          seguridad y confianza en las operaciones.
        </CardStep>
        <CardStep
          img="https://picsum.photos/160/160"
          title="Explora opciones de financiamiento"
        >
          Accede a herramientas que te permiten simular condiciones de crédito,
          evaluar montos, plazos y tasas de interés según las oportunidades
          disponibles.
        </CardStep>
        <CardStep
          img="https://picsum.photos/160/160"
          title="Consulta reportes y métricas"
        >
          Usa el panel de control personalizado para analizar estadísticas
          clave, proyecciones y tendencias de tus inversiones.
        </CardStep>
        <CardStep
          img="https://picsum.photos/160/160"
          title="Gestiona tus Inversiones"
        >
          Realiza seguimientos de tus rendimientos, ajusta tus estrategias según
          los informes y optimiza tus decisiones de inversión.
        </CardStep>
      </div>
    </div>
  );
};
