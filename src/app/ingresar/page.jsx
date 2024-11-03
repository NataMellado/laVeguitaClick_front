// /ingresar/page.jsx
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const IngresarPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-cover bg-center" style={{ backgroundImage: "url('/images/fondo.png')" }}>
      
      {/* Formulario de Inicio de Sesión */}
      <main className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-8 bg-white bg-opacity-80 rounded-lg sm:shadow-lg sm:backdrop-blur-md min-h-screen sm:min-h-0 sm:mt-32">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Iniciar sesión</h2>
        
        <form className="w-full flex flex-col gap-4" method="post" action="/api/login/">
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
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            Continuar
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-700">
            ¿Aún no tienes cuenta?{' '}
            <Link href="/crear-cuenta" className="text-green-500 hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default IngresarPage;
