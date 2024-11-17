"use client";
import React from "react";

const CustomButton = ({ label, onClick, icon }) => {
  return (
    <div className="relative ml-auto">
        <button
        onClick={onClick}
        className="bg-sky-600 hover:bg-sky-700 transition-colors duration-300 text-white text-sm font-bold py-1 px-3 rounded flex items-center"
        >
        {label}
        {icon && <span className="ml-2">{icon}</span>}
        </button>
    </div>
  );
};

export default CustomButton;
