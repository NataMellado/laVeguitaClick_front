import React from 'react';
import ProductRow from './ProductRow';

const ProductTable = ({ products, handleChange, handleEdit, handleSave, handleDelete }) => (
  <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-8rem)] sm:max-h-[calc(100vh-4.5rem)] rounded-lg border border-gray-300 bg-white">
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
        {products.map((product) => (
          <ProductRow
            key={product.id}
            product={product}
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

export default ProductTable;
