"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ProductModal = ({ onClose, onAddProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    category: "",
    image: "",
    is_featured: false,
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/products/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al añadir el producto");
      }

      const data = await response.json();
      console.log("Producto añadido:", data);

      // Llama a onAddProduct para actualizar el inventario
      onAddProduct(data);

      // Limpia el formulario después de añadir el producto
      setFormData({
        name: "",
        price: "",
        description: "",
        stock: "",
        category: "",
        image: "",
        is_featured: false,
      });

      // Cierra el modal
      window.location.href = "/admin/gestionar-inventario";
      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed  inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white overflow-y-auto p-4 rounded-lg  w-full max-w-md max-h-[90vh]">
        
        <div className="flex  mb-4">
            <h1 className="text-md font-bold">Añadir Producto</h1>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 text-xl ml-auto font-bold"
            >
                &times;
            </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Nombre */}
          <div>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nombre del Producto"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-2 py-1 border rounded-md"
            />
          </div>

          {/* Precio */}
          <div>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Precio"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full px-2 py-1 border rounded-md"
            />
          </div>

          {/* Descripción */}
          <div>
            <textarea
              id="description"
              name="description"
              placeholder="Descripción"
              value={formData.description}
              onChange={handleChange}
              required
              rows="1"
              className="w-full px-2 py-1 border rounded-md"
            />
          </div>

            {/* Stock */}
          <div>
            <input
              type="number"
              id="stock"
              name="stock"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleChange}
              required
              className="w-full px-2 py-1 border rounded-md"
            />
          </div>

            {/* Categoría */}
          <div>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full mt-1 px-2 py-1 border rounded-md"
            >
              <option value="">Seleccione una categoría</option>
              <option value="verduras">Verduras</option>
              <option value="frutas">Frutas</option>
              <option value="cereales">Cereales y Legumbres</option>
              <option value="frutos-secos">Frutos Secos y Semillas</option>
            </select>
          </div>

            {/* Imagen */}
          <div>
            <input
              type="text"
              id="image"
              name="image"
              placeholder="URL de la Imagen"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              <input
                type="checkbox"
                id="is_featured"
                name="is_featured"
                checked={formData.is_featured}
                onChange={handleChange}
                className="mr-2"
              />
              Producto Destacado
            </label>
          </div>


          <button
            type="submit"
            className="w-full bg-sky-600 text-white font-bold text-sm py-2 px-4 rounded-md hover:bg-sky-700 transition-colors duration-300"
          >
            Añadir Producto
          </button>
        </form>
 
      </div>
    </div>
  );
};

export default ProductModal;
