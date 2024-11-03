"use client";
import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const { cart } = useCart();

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between py-2 px-4 shadow-md bg-white">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/">
            <Image src="/logo.png" alt="La Veguita Click" width={100} height={40} />
          </a>
        </div>

        {/* Search */}
        <div className="hidden md:flex justify-center mx-4">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full max-w-md px-4 py-2 text-sm border rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-600"
          />
        </div>

        {/* Login y Cart */}
        <div className="flex items-center gap-2 ">
          <a href="/ingresar" className="flex gap-2 px-3 py-2 text-sm font-semibold text-gray-700 transition duration-150 hover:text-green-600">
            <FontAwesomeIcon icon={faUser} style={{ width: '20px', height: '20px' }} />
            <p className="hidden sm:flex">Ingresar</p>
          </a>

          {/* Cart */}
          <button className="flex px-3 py-2 text-sm font-semibold text-gray-700 transition duration-150 hover:text-green-600">
            <FontAwesomeIcon icon={faCartShopping} style={{ width: '20px', height: '20px' }} />
            
            {/* Cantidad de productos en el carrito */}
            {totalQuantity > 0 && (
              <span className="absolute top-2 right-4 w-4 h-4 text-xs text-white bg-red-600 rounded-full flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </button>
        </div>
      </nav>

    </>
  );
};

export default Navbar;
