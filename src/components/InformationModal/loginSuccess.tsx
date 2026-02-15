
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { type IRegisterSucess } from "../../types/IUser";
import { useNavigate } from "react-router";


const modalVariants:Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 20,
    transition: { duration: 0.2 },
  },
};

// Animación para el fondo oscuro
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const LoginSucess = ({ openModal, onClose }: IRegisterSucess) => {

  const navigate = useNavigate();

  const handleOnClick = () => {
    onClose();
    setTimeout(() => navigate("/"), 100);
  };
  return (
    <AnimatePresence>
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Fondo oscuro (Overlay) */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            onClick={handleOnClick} // Cierra al hacer click afuera
          />

          {/* Tarjeta del Modal */}
          <motion.div
            className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white p-6 text-center shadow-2xl ring-1 ring-gray-900/5"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            {/* Ícono animado SVG */}
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-10 w-10 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            {/* Títulos y Texto */}
            <h2 className="mb-2 text-2xl font-bold text-gray-800">
              ¡Login Exitoso!
            </h2>

            {/* Botón */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleOnClick}
              className="w-full rounded-xl bg-green-600 px-4 py-3 font-semibold text-white shadow-lg shadow-green-600/30 transition-colors duration-200 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Ven a CAFSA
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginSucess;
