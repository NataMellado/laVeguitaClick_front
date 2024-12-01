"use client";
import React, { useState } from "react";

const VehicleModal = ({ onClose, onAddVehicle, showStatusModal }) => {
  const [formData, setFormData] = useState({
    license_plate: "",
    vehicle_type: "",
    model: "",
  });



  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "number" && value === "" ? null : value,
    }));
  };


  // Añadir un nuevo vehículo
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/vehicles/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        onAddVehicle(data);
        showStatusModal(data.message, data.status);
        setFormData({
          license_plate: "",
          vehicle_type: "",
          model: "",
        });
        onClose();
      })
      .catch((error) => {
        console.error("Error:", error);
        showStatusModal("Error al añadir el vehículo: " + error.message, "error");
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white overflow-y-auto p-4 rounded-lg w-full max-w-md max-h-[90vh]">
        <div className="flex mb-4">
          {/* Título */}
          <h1 className="text-lg font-semibold">Añadir vehículo</h1>
          {/* Botón para cerrar */}
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-xl ml-auto font-semibold"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Patente */}
          <div>
            <input
              type="text"
              id="license_plate"
              name="license_plate"
              placeholder="Patente"
              value={formData.license_plate}
              onChange={handleChange}
              required
              className="w-full px-2 py-1 border rounded-md"
            />
          </div>

          {/* Tipo de vehículo */}
          <div>
            <select
              id="vehicle_type"
              name="vehicle_type"
              value={formData.vehicle_type}
              onChange={handleChange}
              required
              className="w-full px-2 py-1 border rounded-md"
            >
              <option value="" disabled>
                Selecciona un tipo de vehículo
              </option>
              <option value="Moto">Moto</option>
              <option value="Camioneta">Camioneta</option>
              <option value="Bicicleta">Bicicleta</option>
            </select>
          </div>

          {/* Modelo */}
          <div>
            <input
              type="text"
              id="model"
              name="model"
              placeholder="Modelo (opcional)"
              value={formData.model}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded-md"
            />
          </div>

          {/* Botón para añadir vehículo */}
          <button
            type="submit"
            className="w-full bg-sky-600 text-white font-semibold text-sm py-2 px-4 rounded-md hover:bg-sky-700 transition-colors duration-300"
          >
            Añadir vehículo
          </button>
        </form>
      </div>
    </div>
  );
};

export default VehicleModal;
