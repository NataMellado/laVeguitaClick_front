"use client";
import React, { useState, useEffect } from "react";

const CategoryModal = ({ onClose, fetchCategories, showStatusModal, categories }) => {
  const [formData, setFormData] = useState({ name: "" });

  // Manejar el cambio de entrada
  const handleChange = (e) => {
    const { name } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: e.target.value,
    }));
  };

  // Añadir una nueva categoría
  const handleSubmit = (e) => {
    e.preventDefault();
      fetch("http://127.0.0.1:8000/api/categories/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
    .then((res) => res.json())
    .then((data) => {
      fetchCategories();
      showStatusModal(data.message, data.status);
      setFormData({ name: "" });
    })
    .catch((error) => {
      console.error("Error:", error);
      showStatusModal("Error al añadir la categoría", "error");
    });
  };

  // Eliminar una categoría
  const handleDelete = (categoryId) => {
      fetch(`http://127.0.0.1:8000/api/categories/${categoryId}/`, {
          method: "DELETE", 
        })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.message);
          });
        }
        return res.json();
      })
      .then((data) => {
        fetchCategories();
        showStatusModal(data.message, data.status);
      })
    .catch((error) => {
      showStatusModal(error.message, "error");
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white overflow-y-auto p-4 rounded-lg w-full max-w-md max-h-[90vh]">
        <div className="flex mb-4">
          <h1 className="text-md font-semibold">Categorías</h1>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-xl ml-auto font-semibold"
          >
            &times;
          </button>
        </div>

        {/* Formulario para añadir categoría */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nombre de la categoría"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-2 py-1 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-sky-600 text-white font-semibold text-sm py-2 px-4 rounded-md hover:bg-sky-700 transition-colors duration-300"
          >
            Añadir Categoría
          </button>
        </form>

        {/* Listado de categorías */}
        <div className="mt-4">
          <h2 className="font-semibold text-sm mb-2">Categorías existentes</h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li
                key={category.id}
                className="flex justify-between items-center p-2 border rounded-md"
              >
                <span>{category.name}</span>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
