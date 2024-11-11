"use client";
import React, { useState, useEffect} from 'react';
import ProductRow from './ProductRow';

const ProductTable = ({ products, handleChange, handleEdit, handleSave, handleDelete }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/categories/")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories))
      .catch((error) => console.error("Error al cargar las categorías:", error));
  }, []);

  return (

    <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-9rem)] sm:max-h-[calc(100vh-5rem)] rounded-lg border border-gray-300 bg-white">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-xs leading-normal">
            <th className="py-3 px-4 text-left">Nombre</th>
            <th className="py-3 px-4 text-left">Descripción</th>
            <th className="py-3 px-4 text-left">Categoría</th>
            <th className="py-3 px-4 text-left">Precio</th>
            <th className="py-3 px-4 text-left">Stock</th>
            <th className="py-3 px-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {products.map((product, index) => (
            <ProductRow
              key={`${product.id}-${index}`}
              product={product}
              categories={categories}
              handleChange={handleChange}
              handleEdit={handleEdit}
              handleSave={handleSave}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
