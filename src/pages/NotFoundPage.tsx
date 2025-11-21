import { Link } from "react-router-dom";
import Background from "../components/Background";

const NotFoundPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Background bgVariant={"mesh"} />

      {/* Contenido */}
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm backdrop-blur">
          <span className="inline-block h-2 w-2 rounded-full bg-[#00A6E7]" />
          Error 404
        </div>

        {/* Número grande */}
        <h1 className="text-[96px] font-extrabold leading-none tracking-tight text-transparent sm:text-[128px] bg-clip-text bg-gradient-to-b from-[#00A6E7] to-[#005AA5] drop-shadow">
          404
        </h1>

        {/* Título y mensaje */}
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">
          Ups… página no encontrada
        </h2>
        <p className="mt-3 max-w-xl text-slate-600">
          La página que buscas pudo moverse, cambiar de nombre o no existir.
        </p>

        {/* Acciones */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 rounded-xl bg-[#005AA5] px-5 py-3 text-white shadow-lg transition hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#00A6E7]/60"
          >
            {/* Ícono Home */}
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 transition-transform group-hover:-translate-y-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 10.5L12 3l9 7.5" />
              <path d="M5 10v10h14V10" />
              <path d="M9 20v-6h6v6" />
            </svg>
            Volver al inicio
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300/70 bg-white/80 px-5 py-3 text-slate-700 shadow-sm backdrop-blur transition hover:bg-white"
          >
            Explorar
          </Link>
        </div>

        {/* Bloque decorativo inferior */}
        <div className="pointer-events-none mt-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/60 bg-white/70 p-4 text-left shadow-sm backdrop-blur">
            <p className="text-xs font-medium text-slate-500">Sugerencia</p>
            <p className="mt-1 text-sm text-slate-700">
              Revisa la URL o usa el botón para regresar al Home.
            </p>
          </div>
          <div className="rounded-2xl border border-white/60 bg-white/70 p-4 text-left shadow-sm backdrop-blur">
            <p className="text-xs font-medium text-slate-500">Atajo</p>
            <p className="mt-1 text-sm text-slate-700">
              Presiona{" "}
              <span className="rounded bg-slate-100 px-1 py-0.5">H</span> para
              ir al inicio.
            </p>
          </div>
          <div className="rounded-2xl border border-white/60 bg-white/70 p-4 text-left shadow-sm backdrop-blur">
            <p className="text-xs font-medium text-slate-500">Soporte</p>
            <p className="mt-1 text-sm text-slate-700">
              Si el problema persiste, contáctanos desde el Home.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage;