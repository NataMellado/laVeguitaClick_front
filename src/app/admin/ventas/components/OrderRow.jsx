"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faSave,
  faTrash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

const OrderRow = ({
  order,
  vehicles,
  handleChange,
  handleViewDetails,
  handleEdit,
  handleSave,
  handleDelete,
}) => {
   // Mapeo de colores según el estado
   const statusColors = {
    Pendiente: "bg-yellow-100 text-yellow-800 border-none",
    Enviado: "bg-blue-100 text-blue-800 border-none",
    Entregado: "bg-green-100 text-green-800 border-none",
    Cancelado: "bg-red-100 text-red-800 border-none",
  };
  
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      {/* ID */}
      <td className="py-3 px-4 text-left">
        <div className="whitespace-nowrap truncate-ellipsis">{order.id}</div>
      </td>

      {/* Usuario */}
      <td className="py-3 px-4 text-left">
        <div className="whitespace-nowrap truncate-ellipsis">{order.user}</div>
      </td>

      {/* Precio Total */}
      <td className="py-3 px-4 text-right">
        <div className="whitespace-nowrap truncate-ellipsis">
          ${order.total_price.toFixed(2)}
        </div>
      </td>

      {/* Fecha de Creación */}
      <td className="py-3 px-4 text-left">
        <div className="whitespace-nowrap truncate-ellipsis">
          {new Date(order.created_at).toLocaleDateString()}
        </div>
      </td>

      {/* Fecha de Actualización */}
      <td className="py-3 px-4 text-left">
        <div className="whitespace-nowrap truncate-ellipsis">
          {new Date(order.updated_at).toLocaleDateString()}
        </div>
      </td>

      {/* Estado */}
      <td className="py-3 px-4 text-left">
        {order.isEditing ? (
          <select
            name="status"
            value={order.status}
            onChange={(e) => handleChange(e, order.id)}
            className="p-2 rounded w-full bg-gray-200"
          >
            <option value="Pendiente">Pendiente</option>
            <option value="Enviado">Enviado</option>
            <option value="Entregado">Entregado</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        ) : (
          <div
            className={`px-3 py-1 rounded-2xl border text-center font-semibold ${statusColors[order.status]}`}
          >
            {order.status}
          </div>
        )}
      </td>

      {/* Vehículo */}
      <td className="py-3 px-4 text-left">
        {order.isEditing ? (
          <select
            name="vehicle"
            value={order.vehicle === null ? "null" : order.vehicle ? order.vehicle.id : "" }
            onChange={(e) => handleChange(e, order.id)}
            className="p-2 rounded w-full bg-gray-200"
          >
            <option value="" disabled>Selecciona un vehículo</option>
            <option value="null">Sin vehículo</option>

            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.license_plate} ({vehicle.vehicle_type})
              </option>
            ))}
          </select>
          
        ) : (
          <div className="whitespace-nowrap truncate-ellipsis">
            {order.vehicle
              ? `${order.vehicle.license_plate} (${order.vehicle.vehicle_type})`
              : "-"}
          </div>
        )}
      </td>

      {/* Botones de acción */}
      <td className="py-3 px-4 text-center space-x-2">

        {/* Detalles de la orden */}
        <button
          onClick={() => handleViewDetails(order.id)}
          className="text-blue-500 hover:underline"
        >
          <FontAwesomeIcon icon={faEye} />
        </button>

        {/* Editar */}
        {!order.isEditing ? (
          <button
            onClick={(e) => handleEdit(e, order.id)}
            className="text-blue-500 hover:underline"
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
        ) : (
          <button
            onClick={(e) => handleSave(e, order.id)}
            className="text-green-500 hover:underline"
          >
            <FontAwesomeIcon icon={faSave} />
          </button>
        )}

        {/* Eliminar */}
        <button
          onClick={() => handleDelete(order.id)}
          className="text-red-500 hover:underline"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  );
};

export default OrderRow;
