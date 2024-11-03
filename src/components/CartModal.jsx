"use client";
import React, { useEffect } from "react";

const CartModal = ({ cartItems, isOpen, toggleModal }) => {
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Evita el scroll en el body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50 "
      onClick={toggleModal}
    >
      <div 
        className="relative max-w-xs w-full h-full bg-white p-4 shadow-lg overflow-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
        >
        {/* Close Button */}
        <button
          onClick={toggleModal}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-xl"
        >
          &times;
        </button>

        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-2 mb-8">
          <h2 className="text-lg font-semibold">
            Tienes {totalItems} productos
          </h2>
        </div>

        {/* Modal Body */}
        <div className="space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-4"
              >
                <span>{item.name}</span>
                <span>
                  {item.quantity} x ${item.price}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No hay productos en el carrito</p>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-between items-center  pt-4 mt-auto">
          <p className="text-lg font-bold">
            Total: $<span>{totalAmount}</span>
          </p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
