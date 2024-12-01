"use client";
import React, { useEffect, useState } from "react";
import VehicleRow from "./VehicleRow";

const VehicleTable = ({
  vehicles,
  handleChange,
  handleEdit,
  handleSave,
  handleDelete,
}) => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/drivers/")
      .then((res) => res.json())
      .then((data) => setDrivers(data.drivers))
      .catch((error) =>
        console.error("Error al cargar los conductores:", error)
      );
  }, []);

  return (
    <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-9rem)] sm:max-h-[calc(100vh-5rem)] rounded-lg border border-gray-300 bg-white">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-xs leading-normal">
            <th className="py-3 px-4 text-left">Patente</th>
            <th className="py-3 px-4 text-left">Tipo de Vehículo</th>
            <th className="py-3 px-4 text-left">Modelo</th>
            <th className="py-3 px-4 text-left">Conductor</th>
            <th className="py-3 px-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {vehicles.map((vehicle) => (
            <VehicleRow
              key={vehicle.id}
              vehicle={vehicle}
              drivers={drivers}
              handleChange={handleChange}
              handleEdit={handleEdit}
              handleSave={handleSave}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleTable;
