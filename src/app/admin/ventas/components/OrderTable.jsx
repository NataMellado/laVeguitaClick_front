"use client";
import React, { useEffect, useState } from "react";
import OrderRow from "./OrderRow";
import OrderDetailsModal from "./OrderDetailsModal";

const OrderTable = ({ orders, handleChange, handleEdit, handleSave, handleDelete }) => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/vehicles/")
      .then((res) => res.json())
      .then((data) => setVehicles(data.vehicles))
      .catch((error) => console.error("Error al cargar los vehículos:", error));
  }, []);

  const handleViewDetails = (orderId) => {
    const order = orders.find((o) => o.id === orderId);
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  return (
    <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-9rem)] sm:max-h-[calc(100vh-5rem)] rounded-lg border border-gray-300 bg-white">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-xs leading-normal">
            <th className="py-3 px-4 text-left">ID</th>
            <th className="py-3 px-4 text-left">Usuario</th>
            <th className="py-3 px-4 text-right">Precio Total</th>
            <th className="py-3 px-4 text-left">Fecha de Creación</th>
            <th className="py-3 px-4 text-left">Fecha de Actualización</th>
            <th className="py-3 px-4 text-left">Estado</th>
            <th className="py-3 px-4 text-left">Vehículo</th>
            <th className="py-3 px-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {orders.map((order) => (
            <OrderRow
              key={order.id}
              order={order}
              vehicles={vehicles}
              handleChange={handleChange}
              handleEdit={handleEdit}
              handleSave={handleSave}
              handleDelete={handleDelete}
              handleViewDetails={handleViewDetails}
            />
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default OrderTable;
