import React from 'react';

const Banner = () => {
  return (
    <div className="relative h-64 md:h-[500px] bg-cover bg-right md:bg-center" style={{ backgroundImage: "url('/banner.png')" }}>
      
      <div className="absolute inset-0 flex items-center justify-center pt-40 ps-[1px] md:pt-60 md:ps-[125px]">
        <button className="hidden md:flex px-6 py-3 text-lg font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 transition duration-150">
          Comprar Ahora
        </button>
      </div>
    </div>
  );
};

export default Banner;
