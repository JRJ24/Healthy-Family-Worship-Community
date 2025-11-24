import { Link } from "react-router-dom";

const NotFoundPage = () => {
  const colors = {
    soft: "#BFA2DB",   // Lavanda (Header BG)
    dark: "#241433",   // Morado Oscuro (Accent)
    text: "#000000"    // Negro (Text)
  };

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#FDFBFD] font-sans">
      
      {/* --- FONDO AMBIENTAL --- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Círculo Lavanda Superior */}
        <div 
          className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full blur-[100px] opacity-40" 
          style={{ backgroundColor: colors.soft }} 
        />
        {/* Círculo Morado Inferior */}
        <div 
          className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full blur-[100px] opacity-20" 
          style={{ backgroundColor: colors.dark }} 
        />
      </div>

      {/* <Background bgVariant={"mesh"} /> */}

      {/* --- CONTENEDOR PRINCIPAL --- */}
      <div className="relative z-10 w-full max-w-3xl px-6 text-center">
        
        {/* TEXTO GIGANTE 404 DE FONDO */}
        <h1 
          className="pointer-events-none select-none text-[160px] font-black leading-none sm:text-[250px]"
          aria-hidden="true"
          style={{ color: colors.soft, opacity: 0.3 }}
        >
          404
        </h1>

        {/* TARJETA DE CRISTAL (Glassmorphism) */}
        <div className="relative -mt-24 mx-auto rounded-3xl border border-white/60 bg-white/50 p-8 shadow-2xl backdrop-blur-md sm:-mt-32 sm:p-12">
          
          {/* Badge pequeño */}
          <div 
            className="mb-6 inline-flex items-center justify-center rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest ring-1 ring-inset"
            style={{ 
              backgroundColor: `${colors.soft}30`, // 30 es transparencia hex
              color: colors.dark,
              borderColor: `${colors.soft}80`
            }}
          >
            Error 404
          </div>

          <h2 
            className="mb-4 text-3xl font-extrabold sm:text-4xl"
            style={{ color: colors.dark }}
          >
            Página no encontrada
          </h2>
          
          <p className="mb-8 text-lg leading-relaxed text-slate-600">
            Lo sentimos, la página que buscas no existe o ha sido movida. 
            <br className="hidden sm:block" />
            Verifica la URL o regresa al inicio.
          </p>

          {/* BOTONES DE ACCIÓN */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            
            {/* BOTÓN PRINCIPAL (Color Acento) */}
            <Link
              to="/"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-8 py-3.5 font-semibold text-white transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ 
                backgroundColor: colors.dark, 
                boxShadow: `0 10px 25px -10px ${colors.dark}80` // Sombra con el color del acento
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                Ir al Inicio
              </span>
            </Link>

            {/* BOTÓN SECUNDARIO (Borde Lavanda/Oscuro) */}
            <button
              onClick={() => window.history.back()}
              className="group inline-flex items-center gap-2 rounded-xl border-2 bg-transparent px-8 py-3.5 font-semibold transition-colors hover:bg-white"
              style={{ 
                borderColor: colors.soft, 
                color: colors.dark 
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 transition-transform group-hover:-translate-x-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
              Regresar
            </button>
          </div>

        </div>

        {/* Footer pequeño */}
        <div className="mt-12 flex justify-center gap-6 text-sm font-medium opacity-60" style={{ color: colors.dark }}>
          <Link to="/contacto" className="hover:underline">¿Necesitas ayuda?</Link>
          <span>&bull;</span>
          <Link to="/" className="hover:underline">Volver al Home</Link>
        </div>

      </div>
    </main>
  );
}

export default NotFoundPage;