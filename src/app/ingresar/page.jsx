// /ingresar/page.jsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import { useUser } from "@/context/UserContext";

const IngresarPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8000/accounts/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        window.location.href = '/';
      }else {
        console.log(response)
        const errorData = await response.json();
        setError(errorData.error || 'Error al iniciar sesión');
      }
    }catch (err){
      setError('Error al iniciar sesión' + err);
    }
  };
  
  return (
    <div
      className="min-h-screen flex flex-col items-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/fondo.png')" }}>
      {/* Formulario de Inicio de Sesión */}
      <main className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-8 bg-white bg-opacity-80 rounded-lg sm:shadow-lg sm:backdrop-blur-md min-h-screen sm:min-h-0 sm:mt-32">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Iniciar sesión
        </h2>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            id="emailInput"
            name="email"
            type="email"
            placeholder="Correo electrónico"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          <input
            id="passwordInput"
            name="password"
            type="password"
            placeholder="Contraseña"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
            Continuar
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-700">
            ¿Aún no tienes cuenta?{" "}
            <Link
              href="/crear-cuenta"
              className="text-green-500 hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default IngresarPage;
