"use client";
import React from "react";
import { useUser } from "@/context/UserContext";

const AdminDashboard = () => {
  const { user, loading } = useUser();
  
  if (loading) return <p>Cargando...</p>;

  if (!user) {
    return <p>No tienes permisos para acceder a esta página</p>;
  }
  
  return (
    <div>
      <h1>Bienvenido {user.usuario}</h1>
      <p>Este es el panel de administración</p>
    </div>
  );
};

export default AdminDashboard;
