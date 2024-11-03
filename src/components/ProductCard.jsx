"use client"
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "@/context/CartContext";

const ProductCard = ({ product }) => {
  const { cart, addToCart, removeFromCart, decreaseFromCart } = useCart();

  // Encuentra el producto en el carrito si existe
  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAdd = () => {
    addToCart(product);
  };

  const handleIncrease = () => {
    if (quantity < 20) {
      addToCart(product);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      decreaseFromCart(product);
    } else {
      removeFromCart(product.id);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-md bg-white">

      {/* Imagen del producto */}
      <img
        src={product.image || "/no-image.png"}
        alt={product.name}
        className="w-full h-[7rem] sm:h-[10rem] lg:h-[12rem] object-cover"
      />

      {/* Contenido del producto */}
      <div className="p-4">

        {/* Nombre, descripción y precio */}
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-gray-700 text-sm line-clamp-1">
          {product.description}
        </p>
        <p className="font-extrabold mt-2">${product.price}</p>

        {/* Controles de cantidad */}
        <div className="mt-4">

          {quantity === 0 ? (
            // Botón Agregar cuando la cantidad es 0
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Agregar
            </button>

          ) : (
            // Controles de cantidad cuando la cantidad es mayor a 0
            <div className="flex items-center gap-2">
              {quantity > 1 ? (

                // Botón de disminuir cantidad
                <button
                  onClick={handleDecrease}
                  className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
              ) : (

                // Botón de eliminar producto
                <button
                  onClick={handleDecrease}
                  className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
            
              )}

              {/* Cantidad actual */}
              <input
                type="text"
                readOnly
                value={quantity}
                className="w-12 text-center border rounded-md"
              />

              {/* Botón de aumentar cantidad */}
              <button
                onClick={handleIncrease}
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
