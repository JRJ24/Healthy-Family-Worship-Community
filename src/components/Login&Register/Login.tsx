import { useState } from "react";
import { Link } from "react-router";


interface LoginProps {
  onLoginSuccess?: () => void;
}


const Login = ({onLoginSuccess}:LoginProps ) => {
  return (
    <>
      <section className="min-h-screen bg-black">
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
          <div className="w-full max-w-md">
            <h1 className="text-white text-3xl font-bold text-center mb-8">
              Bienvenido a <span className="text-purple-500">CAFSA</span>
            </h1>
            <form
              action=""
              method="post"
              className="bg-zinc-900 p-8 rounded-lg border border-zinc-800 shadow-2xl"
            >
              <div className="mb-6">
                <label
                  htmlFor="username"
                  className="block text-white text-sm font-medium mb-2"
                >
                  Usuario
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full bg-black text-white px-4 py-3 rounded border border-zinc-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                  placeholder="Introduce tu usuario"
                />
              </div>
              <div className="mb-8">
                <label
                  htmlFor="password"
                  className="block text-white text-sm font-medium mb-2"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full bg-black text-white px-4 py-3 rounded border border-zinc-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                  placeholder="Introduce tu contraseña"
                />
              </div>
              <button
                onClick={onLoginSuccess}
                type="submit"
                className="w-full bg-white text-black font-semibold py-3 rounded hover:bg-purple-500 hover:text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] hover:cursor-pointer"
              >
                Iniciar Sesión
              </button>
            </form>
            <span className="block text-center text-sm text-white mt-4">
              ¿No tienes una cuenta?{" "}
              <Link to="/register" className="text-purple-500 hover:underline">
                Regístrate aquí
              </Link>
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
