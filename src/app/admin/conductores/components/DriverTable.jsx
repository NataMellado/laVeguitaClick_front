"use client";
import React from "react";
import DriverRow from "./DriverRow";

const DriverTable = ({
  drivers,
  handleChange,
  handleChangeUser,
  handleEdit,
  handleSave,
  handleDelete,
}) => {
  return (
    <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-9rem)] sm:max-h-[calc(100vh-5rem)] rounded-lg border border-gray-300 bg-white">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-xs leading-normal">
            <th className="py-3 px-4 text-left">Nombre</th>
            <th className="py-3 px-4 text-left">Apellido</th>
            <th className="py-3 px-4 text-left">Correo</th>
            <th className="py-3 px-4 text-left">Teléfono</th>
            <th className="py-3 px-4 text-left">Número de Licencia</th>
            <th className="py-3 px-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {drivers.map((driver) => (
            <DriverRow
              key={driver.id}
              driver={driver}
              handleChange={handleChange} 
              handleChangeUser={handleChangeUser} 
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

export default DriverTable;
