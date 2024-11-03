import React from 'react';

const Navbar = () => {
  return (
    <>
    <nav className="flex items-center justify-between py-2 px-4 bg-white md:shadow-sm">
        

      <div className="flex items-center">
        <a href="/" className="text-2xl font-bold text-green-600">
          Logo
        </a>
      </div>

      <div className="hidden md:flex flex-1 justify-center mx-4">
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full max-w-md px-4 py-2 text-sm border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>


      <div className="flex items-center gap-4">

        <button className="flex items-center px-3 py-2 text-sm font-semibold text-gray-700 transition duration-150 hover:text-green-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5 mr-2"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          Ingresar
        </button>

   
        <button className="relative p-2 text-gray-700 hover:text-green-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path d="M7 4h-2l-1.6 8.34a2 2 0 0 0 1.99 2.66H17.6a2 2 0 0 0 1.99-2.66L18 4H7zm3 15c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
          <span className="absolute top-0 right-0 w-4 h-4 text-xs text-white bg-red-600 rounded-full flex items-center justify-center">3</span>
        </button>
      </div>

  
    </nav>

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
