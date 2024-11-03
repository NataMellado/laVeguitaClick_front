"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";

const ProductRow = ({
  product,
  handleChange,
  handleEdit,
  handleSave,
  handleDelete,
}) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      {/* Nombre */}
      <td className="py-3 px-6 text-left">
        <input
          name="name"
          type="text"
          value={product.name}
          onChange={(e) => handleChange(e, product.id)}
          disabled={!product.isEditing}
          className={`p-2 rounded w-full ${
            product.isEditing ? "bg-gray-200" : "bg-transparent"
          }`}
        />
      </td>

      {/* Descripción */}
      <td className="py-3 px-6 text-left">
        <input
          name="description"
          type="text"
          value={product.description}
          onChange={(e) => handleChange(e, product.id)}
          disabled={!product.isEditing}
          className={`p-2 rounded w-full ${
            product.isEditing ? "bg-gray-200" : "bg-transparent"
          }`}
        />
      </td>

      {/* Categoría*/}
      <td className="py-3 px-6 text-left">
        <input
          name="category"
          type="text"
          value={product.category}
          onChange={(e) => handleChange(e, product.id)}
          disabled={!product.isEditing}
          className={`p-2 rounded w-full ${
            product.isEditing ? "bg-gray-200" : "bg-transparent"
          }`}
        />
      </td>

      {/* Precio */}
      <td className="py-3 px-6 text-left">
        <input
          name="price"
          type="number"
          value={product.price}
          onChange={(e) => handleChange(e, product.id)}
          disabled={!product.isEditing}
          className={`p-2 rounded w-full ${
            product.isEditing ? "bg-gray-200" : "bg-transparent"
          }`}
        />
      </td>

      {/* Stock */}
      <td className="py-3 px-6 text-left">
        <input
          name="stock"
          type="number"
          value={product.stock}
          onChange={(e) => handleChange(e, product.id)}
          disabled={!product.isEditing}
          className={`p-2 rounded w-full ${
            product.isEditing ? "bg-gray-200" : "bg-transparent"
          }`}
        />
      </td>

      {/* Botones de acción */}
      <td className="py-3 px-6 text-center space-x-2">
        {!product.isEditing ? (
          <button
            onClick={(e) => handleEdit(e, product.id)}
            className="text-blue-500 hover:underline"
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
        ) : (
          <button
            onClick={(e) => handleSave(e, product.id)}
            className="text-green-500 hover:underline"
          >
            <FontAwesomeIcon icon={faSave} />
          </button>
        )}
        <button
          onClick={() => handleDelete(product.id)}
          className="text-red-500 hover:underline"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  );
};

export default ProductRow;
