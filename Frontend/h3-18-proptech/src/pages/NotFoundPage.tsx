import { Button } from "../components/common";

export function NotFoundPage() {
  return (
    <section className="flex-1 flex flex-col md:flex-row items-center justify-center gap-x-8 lg:gap-x-16 gap-y-8 py-10 px-4 md:px-10 select-none">
      <img src="/assets/404.webp" className="h-40 sm:h-52 lg:h-64" alt="Error 404 logo" />
      <article className="bg-contrast shadow-md shadow-tertiary px-3 py-4 w-full max-w-[530px]">
        <header className="border-b-2 border-secondary pb-2 pt-5">
          <h2 className="text-headline-small-bold text-center">
            Página no encontrada
          </h2>
        </header>
        <section className="flex flex-col gap-4 px-4 items-center">
          <p className="text-body-large-regular text-center pt-6 pb-4 max-w-[41ch]">
            La página solicitada no está disponible o no existe en este momento.
            Esto puede deberse a un enlace roto, una URL incorrecta o contenido
            eliminado.
          </p>
          <Button type="link" to={"/"} color="primary-blue" size="medium">
            Volver al inicio
          </Button>
        </section>
      </article>
    </section>
  );
}

export default NotFoundPage;
