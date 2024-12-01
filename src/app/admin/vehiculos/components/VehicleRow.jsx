"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";

const VehicleRow = ({
  vehicle,
  drivers,
  handleChange,
  handleEdit,
  handleSave,
  handleDelete,
}) => {

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      {/* Matrícula */}
      <td className="py-3 px-4 text-left">
        {vehicle.isEditing ? (
          <input
            name="license_plate"
            type="text"
            value={vehicle.license_plate}
            onChange={(e) => handleChange(e, vehicle.id)}
            className="p-2 rounded w-full bg-gray-200"
          />
        ) : (
          <div className="whitespace-nowrap truncate-ellipsis">
            {vehicle.license_plate}
          </div>
        )}
      </td>

      {/* Tipo de Vehículo */}
      <td className="py-3 px-4 text-left">
        {vehicle.isEditing ? (
          <select
            name="vehicle_type"
            value={vehicle.vehicle_type}
            onChange={(e) => handleChange(e, vehicle.id)}
            className="p-2 rounded w-full bg-gray-200"
          >
            <option value="Moto">Moto</option>
            <option value="Camioneta">Camioneta</option>
            <option value="Bicicleta">Bicicleta</option>
          </select>
        ) : (
          <div className="whitespace-nowrap truncate-ellipsis">
            {vehicle.vehicle_type}
          </div>
        )}
      </td>

      {/* Modelo */}
      <td className="py-3 px-4 text-left">
        {vehicle.isEditing ? (
          <input
            name="model"
            type="text"
            value={vehicle.model || ""}
            onChange={(e) => handleChange(e, vehicle.id)}
            className="p-2 rounded w-full bg-gray-200"
          />
        ) : (
          <div className="whitespace-nowrap truncate-ellipsis">
            {vehicle.model || "Sin modelo"}
          </div>
        )}
      </td>

      {/* Conductor */}
      <td className="py-3 px-4 text-left">
        {vehicle.isEditing ? (
          <select
            name="driver"
            value={vehicle.driver === null ? "null" : vehicle.driver ? vehicle.driver.id : "" }
            onChange={(e) => handleChange(e, vehicle.id)}
            className="p-2 rounded w-full bg-gray-200"
          >
            <option value="" disabled> Selecciona un conductor</option>
            <option value="null">-</option>

            {drivers.map((driver) => (
              <option key={driver.id} value={driver.id}>
                {driver.user.first_name} {driver.user.last_name}
              </option>
            ))}
          </select>
        ) : (
          <div className="whitespace-nowrap truncate-ellipsis">
            {vehicle.driver?.user
              ? `${vehicle.driver.user.first_name} ${vehicle.driver.user.last_name}`
              : "-"}
          </div>
        )}
      </td>

      {/* Botones de acción */}
      <td className="py-3 px-4 text-center space-x-2">
        {!vehicle.isEditing ? (
          <button
            onClick={(e) => handleEdit(e, vehicle.id)}
            className="text-blue-500 hover:underline"
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
        ) : (
          <button
            onClick={(e) => handleSave(e, vehicle.id)}
            className="text-green-500 hover:underline"
          >
            <FontAwesomeIcon icon={faSave} />
          </button>
        )}
        <button
          onClick={() => handleDelete(vehicle.id)}
          className="text-red-500 hover:underline"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  );
};

export default VehicleRow;
