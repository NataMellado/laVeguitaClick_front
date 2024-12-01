"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useUser } from "../../context/UserContext";
import CustomButton from "../../components/CustomButton";
const AdminDashboard = () => {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!user) {
    return <p>No tienes permisos para acceder a esta página</p>;
  }

  return (
    <div className="flex items-center bg-sky-50 rounded-lg shadow-lg mt-8">
      <div className="flex flex-col gap-4 p-6 flex-grow">
        <h1 className="text-2xl font-semibold text-sky-700">
          Bienvenido {user.nombre} {user.apellido}
        </h1>
        <p className="text-gray-600 text-lg">
          Este es el panel de administración
        </p>
        <div>
          <Link href="/">
            <CustomButton label="Ir a la tienda" />
          </Link>
        </div>
      </div>
      <div className="relative flex pe-10">
        <Image
          src="/admin.png"
          alt="Admin Dashboard"
          className="-mt-5 hidden md:block"
          width={290}
          height={290}
        />
        <Image
          src="/admin2.png"
          alt="Admin Dashboard"
          className="-mt-10 hidden md:block"
          width={300}
          height={300}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
