"use client";
import React, { useState, useEffect } from "react";

const ProductModal = ({ onClose, onAddProduct, showStatusModal }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    category: "",
    image: "",
    is_featured: false,
  });

  // Obtener categorías al cargar el componente
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/categories/")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories))
      .catch((error) => console.error("Error al cargar categorías:", error));
  }, []);

  // Manejar el cambio de entrada
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Añadir un nuevo producto
  const handleSubmit = (e) => {
    e.preventDefault();
     fetch("http://127.0.0.1:8000/api/products/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
    .then((res) => res.json())
    .then((data) => {
        onAddProduct(data);
        localStorage.setItem("statusMessage", data.message);
        localStorage.setItem("statusType", "success");
        setFormData({
          name: "",
          price: "",
          description: "",
          stock: "",
          category: "",
          image: "",
          is_featured: false,
        });
        onClose();
        window.location.href = "/admin/productos";
      })
    .catch((error) => {
      console.error("Error:", error);
      showStatusModal("Error al añadir el producto", "error");
    });
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
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
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

          {/* Producto Destacado */}
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

          {/* Botón para añadir producto */}
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
