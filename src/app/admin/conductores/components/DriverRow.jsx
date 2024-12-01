"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";

const DriverRow = ({
  driver,
  handleChange,
  handleEdit,
  handleSave,
  handleDelete,
}) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      {/* Nombre */}
      <td className="py-3 px-4 text-left">
          <div className="whitespace-nowrap truncate-ellipsis">
            {driver.user.first_name}
          </div>
      </td>

      {/* Apellido */}
      <td className="py-3 px-4 text-left">
          <div className="whitespace-nowrap truncate-ellipsis">
            {driver.user.last_name}
          </div>
      </td>

      {/* Correo */}
      <td className="py-3 px-4 text-left">
          <div className="whitespace-nowrap truncate-ellipsis">
            {driver.user?.email}
          </div>
      </td>

      {/* Teléfono */}
      <td className="py-3 px-4 text-left">
        {driver.isEditing ? (
          <input
            name="phone_number"
            type="text"
            value={driver.phone_number}
            onChange={(e) => handleChange(e, driver.id)}
            className="p-2 rounded w-full bg-gray-200"
          />
        ) : (
          <div className="whitespace-nowrap truncate-ellipsis">
            {driver.phone_number || "Sin teléfono"}
          </div>
        )}
      </td>

      {/* Número de Licencia */}
      <td className="py-3 px-4 text-left">
        {driver.isEditing ? (
          <input
            name="license_number"
            type="text"
            value={driver.license_number}
            onChange={(e) => handleChange(e, driver.id)}
            className="p-2 rounded w-full bg-gray-200"
          />
        ) : (
          <div className="whitespace-nowrap truncate-ellipsis">
            {driver.license_number || "Sin licencia"}
          </div>
        )}
      </td>

      {/* Botones de acción */}
      <td className="py-3 px-4 text-center space-x-2">
        {!driver.isEditing ? (
          <button
            onClick={(e) => handleEdit(e, driver.id)}
            className="text-blue-500 hover:underline"
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
        ) : (
          <button
            onClick={(e) => handleSave(e, driver.id)}
            className="text-green-500 hover:underline"
          >
            <FontAwesomeIcon icon={faSave} />
          </button>
        )}
        <button
          onClick={() => handleDelete(driver.id)}
          className="text-red-500 hover:underline"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  );
};

export default DriverRow;
