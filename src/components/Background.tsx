import type { BackgroundProps } from "../types/background";

// Paleta de colores usada (puedes ajustarla si prefieres otros tonos):
// Morado vibrante (reemplaza al azul claro): #A855F7 (similar a tailwind purple-500)
// Negro profundo/Morado oscuro (reemplaza al azul oscuro): #120024 (casi negro con tinte morado)
// Blanco: white

const Background = ({ bgVariant }: BackgroundProps) => (
  <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-white">
    {/* Aseguramos un fondo base blanco para que los gradientes transparentes funcionen bien */}

    {bgVariant === "linear" && (
      <div className="">
        {/* Gradiente lineal suave de blanco a morado a negro */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-[#A855F7]/10 to-[#120024]/10" />

        {/* Orbes de luz */}
        {/* Orbe morado vibrante arriba derecha */}
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#A855F7]/25 blur-3xl" />
        {/* Orbe negro/oscuro abajo izquierda */}
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#120024]/30 blur-3xl" />
      </div>
    )}

    {bgVariant === "diagonal" && (
      <div
        className="absolute inset-0"
        style={{
          // Usando rgba para los morados y negros
          // #A855F7 -> rgba(168, 85, 247, ...)
          // #120024 -> rgba(18, 0, 36, ...)
          backgroundImage:
            "linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(168,85,247,0.15) 40%, rgba(18,0,36,0.15) 100%)",
        }}
      />
    )}

    {bgVariant === "radial" && (
      <div
        className="absolute inset-0"
        style={{
          background:
            // Morado principal arriba izquierda
            "radial-gradient(60% 60% at 20% 20%, rgba(168,85,247,0.2), transparent 60%), " +
            // Negro/oscuro arriba derecha
            "radial-gradient(55% 55% at 80% 25%, rgba(18,0,36,0.25), transparent 62%), " +
            // Morado secundario abajo
            "radial-gradient(45% 45% at 30% 80%, rgba(168,85,247,0.15), transparent 60%)",
        }}
      />
    )}

    {bgVariant === "mesh" && (
      <div
        className="absolute inset-0"
        style={{
          background:
            // Una mezcla más compleja de los tonos morados y negros
            "radial-gradient(40% 40% at 15% 20%, rgba(168,85,247,.22), transparent 60%), " +
            "radial-gradient(35% 35% at 85% 20%, rgba(18,0,36,.25), transparent 60%), " +
            "radial-gradient(30% 30% at 70% 85%, rgba(168,85,247,.18), transparent 60%), " +
            "radial-gradient(30% 30% at 10% 90%, rgba(18,0,36,.20), transparent 60%)",
        }}
      />
    )}

    {bgVariant === "animated" && (
      // NOTA: Para cambiar los colores de esta variante, necesitas
      // modificar la clase personalizada 'bg-animated-brand'
      // en tu archivo tailwind.config.js o en tu CSS global.
      <div className="absolute inset-0 opacity-70 bg-animated-brand" />
    )}
  </div>
);

export default Background;