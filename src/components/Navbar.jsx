import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping,  } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <>
      <nav className="flex items-center justify-between py-2 px-4 md:shadow-sm">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" >
          <Image src="/logo.png" alt="La Veguita Click" width={100} height={40} />
          </a>
        </div>

        {/* Search */}
        <div className="hidden md:flex justify-center mx-4">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full max-w-md px-4 py-2 text-sm border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        {/* Login */}
        <div className="flex items-center gap-2 ">
          <button className="flex gap-2 px-3 py-2 text-sm font-semibold text-gray-700 transition duration-150 hover:text-green-600">
            <FontAwesomeIcon icon={faUser} style={{ width: '20px', height: '20px' }} />
            <p className="hidden sm:flex">Ingresar</p>
          </button>

          {/* Cart */}
          <button className="flex px-3 py-2 text-sm font-semibold text-gray-700 transition duration-150 hover:text-green-600">
            <FontAwesomeIcon icon={faCartShopping} style={{ width: '20px', height: '20px' }} />
            <span className="absolute top-2 right-4 w-4 h-4 text-xs text-white bg-red-600 rounded-full flex items-center justify-center">
              3
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Search */}
      <div className="flex md:hidden flex-1 justify-center pb-2 px-4 shadow-sm">
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full px-4 py-2 text-sm border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>
    </>
  );
};

export default Navbar;
