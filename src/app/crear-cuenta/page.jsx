"use client";

import React from "react";
import Link from "next/link";

import { useState } from "react";

const CrearCuentaPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores previos

    // Verificar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/accounts/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 'usuario':username, email, password }),
      });

      if (response.ok) {
        window.location.href = '/ingresar'; // Redirige al usuario a la página de inicio de sesión
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Error al registrar usuario");
      }
    } catch (err) {
      setError("Error de conexión. Por favor, intenta de nuevo.");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/fondo.png')" }}>
      {/* Formulario de Registro */}
      <main className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-8 bg-white bg-opacity-80 rounded-lg sm:shadow-lg sm:backdrop-blur-md min-h-screen mt-5 sm:min-h-0 sm:mt-28">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Crear cuenta
        </h2>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            id="usernameInput"
            name="username"
            type="text"
            placeholder="Nombre de usuario"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
          />
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
          <input
            id="confirmpasswordInput"
            name="confirmpassword"
            type="password"
            placeholder="Confirma tu contraseña"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            ¿Ya tienes cuenta?{" "}
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
