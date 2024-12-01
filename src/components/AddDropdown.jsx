"use client"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

const AddDropdown = ({ options }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative ml-auto">

      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="bg-sky-600 font-semibold  hover:bg-sky-700 transition-colors duration-300 text-white text-md py-1 px-3 rounded"
      >
        Agregar
        <FontAwesomeIcon icon={faChevronDown} className="font-black ps-2" />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                option.onClick();
                setIsDropdownOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                index === 0 ? "rounded-t-lg" : ""
              } ${index === options.length - 1 ? "rounded-b-lg" : ""}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddDropdown;
