"use client";
import React from "react";

const OrderDetailsModal = ({ order, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex mb-4">
          <h1 className="text-lg font-semibold">Detalles de la Orden (ID: {order.id})</h1>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-xl ml-auto font-semibold"
          >
            &times;
          </button>
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border border-gray-300">Producto</th>
              <th className="py-2 px-4 border border-gray-300">Cantidad</th>
              <th className="py-2 px-4 border border-gray-300">Precio Unitario</th>
              <th className="py-2 px-4 border border-gray-300">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border border-gray-300">{item.product}</td>
                <td className="py-2 px-4 border border-gray-300">{item.quantity}</td>
                <td className="py-2 px-4 border border-gray-300">${item.price.toFixed(2)}</td>
                <td className="py-2 px-4 border border-gray-300">
                  ${item.total_price.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
