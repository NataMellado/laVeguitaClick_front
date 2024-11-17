"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";

const ProductRow = ({
  product,
  categories,
  handleChange,
  handleEdit,
  handleSave,
  handleDelete,
}) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      
      {/* Nombre */}
      <td className="py-3 px-4 text-left">
      {product.isEditing ? (
          <input
            name="name"
            type="text"
            value={product.name}
            onChange={(e) => handleChange(e, product.id)}
            className="p-2 rounded w-full bg-gray-200"
          />
        ) : (
          <div className="whitespace-nowrap truncate-ellipsis">{product.name}</div>
        )}
      </td>

      {/* Descripción */}
      <td className="py-3 px-4 text-left">
      {product.isEditing ? (
          <input
            name="description"
            type="text"
            value={product.description}
            onChange={(e) => handleChange(e, product.id)}
            className="p-2 rounded w-full bg-gray-200"
          />
        ) : (
          <div className="whitespace-nowrap truncate-ellipsis">{product.description}</div>
        )}
      </td>

      {/* Categoría*/}
      <td className="py-3 px-4 text-left">
      {product.isEditing ? (
          <select
            name="category"
            value={product.category || ""} 
            onChange={(e) => handleChange(e, product.id)}
            className="p-2 rounded w-full bg-gray-200"
          >
            <option value="" disabled>Selecciona una categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        ) : (
          <div className="whitespace-nowrap truncate-ellipsis">{product.category}</div>
        )}
      </td>

      {/* Precio */}
      <td className="py-3 px-4 text-left">
      {product.isEditing ? (
          <input
            name="price"
            type="number"
            value={product.price}
            onChange={(e) => handleChange(e, product.id)}
            className="p-2 rounded w-full bg-gray-200"
          />
        ) : (
          <div className="whitespace-nowrap truncate-ellipsis">{product.price}</div>
        )}
      </td>

      {/* Stock */}
      <td className="py-3 px-4 text-left">
      {product.isEditing ? (
          <input
            name="stock"
            type="number"
            value={product.stock}
            onChange={(e) => handleChange(e, product.id)}
            className="p-2 rounded w-full bg-gray-200"
          />
        ) : (
          <div className="whitespace-nowrap truncate-ellipsis">{product.stock}</div>
        )}
      </td>

      {/* Botones de acción */}
      <td className="py-3 px-4 text-center space-x-2">
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
