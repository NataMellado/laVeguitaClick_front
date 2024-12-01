"use client";
import React, { useState } from "react";

const SupplierModal = ({ onClose, fetchSuppliers, showStatusModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Manejar el cambio de entrada
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Añadir un nuevo proveedor
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/suppliers/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

      .then((res) => res.json())
      .then((data) => {
        fetchSuppliers();
        showStatusModal(data.message, data.status);
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
        });
        onClose();
      })
      .catch((error) => {
        console.error("Error:", error);
        showStatusModal("Error al añadir el proveedor", "error");
      });
  };

  return (
    <div className="fixed  inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white overflow-y-auto p-4 rounded-lg  w-full max-w-md max-h-[90vh]">
        <div className="flex  mb-4">
          
          {/* Tìtulo */}
          <h1 className="text-md font-semibold">Añadir proveedor</h1>
          
          {/* Botón para cerrar */}
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-xl ml-auto font-semibold"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Nombre */}
          <div>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nombre del proveedor"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-2 py-1 border rounded-md"
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-2 py-1 border rounded-md"
            />
          </div>

          {/* Teléfono */}
          <div>
            <input
              type="number"
              id="phone"
              name="phone"
              placeholder="Teléfono"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-2 py-1 border rounded-md"
            />
          </div>

          {/* Dirección */}
          <div>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Dirección"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-2 py-1 border rounded-md"
            />
          </div>

          {/* Botón para añadir proveedor */}
          <button
            type="submit"
            className="w-full bg-sky-600 text-white font-semibold text-sm py-2 px-4 rounded-md hover:bg-sky-700 transition-colors duration-300"
          >
            Añadir proveedor
          </button>
        </form>
      </div>
    </div>
  );
};

export default SupplierModal;
