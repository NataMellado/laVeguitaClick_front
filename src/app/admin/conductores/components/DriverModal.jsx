"use client"
import React, { useState } from "react";

const DriverModal = ({ onClose, fetchDrivers, showStatusModal }) => {

return (
    <div className="fixed  inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white overflow-y-auto p-4 rounded-lg  w-full max-w-md max-h-[90vh]">
        <div className="flex  mb-4">
          
          {/* Tìtulo */}
          <h1 className="text-md font-semibold">En construcción</h1>
          
          {/* Botón para cerrar */}
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-xl ml-auto font-semibold"
          >
            &times;
          </button>
        </div>

        
      </div>
    </div>
  );
};

export default DriverModal;