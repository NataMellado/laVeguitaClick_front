"use client";

import React from 'react';
import Link from 'next/link';

const CrearCuentaPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-cover bg-center" style={{ backgroundImage: "url('/images/fondo.png')" }}>
      
      {/* Formulario de Registro */}
      <main className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-8 bg-white bg-opacity-80 rounded-lg sm:shadow-lg sm:backdrop-blur-md min-h-screen mt-5 sm:min-h-0 sm:mt-28">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Crear cuenta</h2>
        
        <form className="w-full flex flex-col gap-4" method="post" action="/api/registrar/">
          <input
            id="usernameInput"
            name="username"
            type="text"
            placeholder="Nombre de usuario"
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          <input
            id="emailInput"
            name="email"
            type="email"
            placeholder="Correo electrónico"
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          <input
            id="passwordInput"
            name="password"
            type="password"
            placeholder="Contraseña"
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          <input
            id="confirmpasswordInput"
            name="confirmpassword"
            type="password"
            placeholder="Confirma tu contraseña"
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            Continuar
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-700">
            ¿Ya tienes cuenta?{' '}
            <Link href="/ingresar" className="text-green-500 hover:underline">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default CrearCuentaPage;
