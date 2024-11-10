"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";

const SupplierRow = ({
  supplier,
  handleChange,
  handleEdit,
  handleSave,
  handleDelete,
}) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      
      {/* Nombre */}
      <td className="py-3 px-4 text-left">
        {supplier.isEditing ? (
          <input
            name="name"
            type="text"
            value={supplier.name}
            onChange={(e) => handleChange(e, supplier.id)}
            className="p-2 rounded w-full bg-gray-200"
          />
        ) : (
          <div className="whitespace-nowrap truncate-ellipsis">{supplier.name}</div>
        )}
      </td>

      {/* Email */}
      <td className="py-3 px-4 text-left">
      {supplier.isEditing ? (
          <input
            name="email"
            type="email"
            value={supplier.email}
            onChange={(e) => handleChange(e, supplier.id)}
            disabled={!supplier.isEditing}
            className={`p-2 rounded w-full ${
              supplier.isEditing ? "bg-gray-200" : "bg-transparent"
            }`}
          />
        ) : (
          <div className="whitespace-nowrap truncate-ellipsis">{supplier.email}</div>
        )}
      </td>

      {/* Teléfono */}
      <td className="py-3 px-4 text-left">
        {supplier.isEditing ? (
          <input
            name="phone"
            type="text"
            value={supplier.phone}
            onChange={(e) => handleChange(e, supplier.id)}
            disabled={!supplier.isEditing}
            className={`p-2 rounded w-full ${
              supplier.isEditing ? "bg-gray-200" : "bg-transparent"
            }`}
          />
        ) : (
          <div className="whitespace-nowrap truncate-ellipsis">{supplier.phone}</div>
        )}
      </td>

      {/* Dirección */}
      <td className="py-3 px-4 text-left">
        {supplier.isEditing ? (
          <input
            name="address"
            type="text"
            value={supplier.address}
            onChange={(e) => handleChange(e, supplier.id)}
            disabled={!supplier.isEditing}
            className={`p-2 rounded w-full ${
              supplier.isEditing ? "bg-gray-200" : "bg-transparent"
            }`}
          />
        ) : (
          <div className="whitespace-nowrap truncate-ellipsis">{supplier.address}</div>
        )}
      </td>

      {/* Botones de acción */}
      <td className="py-3 px-4 text-center space-x-2">
        {!supplier.isEditing ? (
          <button
            onClick={(e) => handleEdit(e, supplier.id)}
            className="text-blue-500 hover:underline"
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
        ) : (
          <button
            onClick={(e) => handleSave(e, supplier.id)}
            className="text-green-500 hover:underline"
          >
            <FontAwesomeIcon icon={faSave} />
          </button>
        )}
        <button
          onClick={() => handleDelete(supplier.id)}
          className="text-red-500 hover:underline"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  );
};

export default SupplierRow;
