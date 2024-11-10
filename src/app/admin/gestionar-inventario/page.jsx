"use client";
import React, { useState, useEffect } from 'react';
import ProductTable from '@/components/ProductTable';

const InventoryManagement = () => {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);

  // Cargar datos de productos
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products/')
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error('Error al cargar los productos:', error));
  }, []);

  // Manejar edición de producto
  const handleEdit = (event, id) => {
    event.preventDefault();
    setEditingProductId(id); // Activa el modo de edición para el producto
  };

  // Manejar guardado de cambios
  const handleSave = (event, productId) => {
    event.preventDefault();
    const productToSave = products.find((product) => product.id === productId);

    
    fetch(`http://127.0.0.1:8000/api/products/${productId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productToSave),
    })
      .then((res) => res.json())
      .then((data) => {
        setEditingProductId(null); // Desactiva el modo de edición
        setProducts((prevProducts) =>
          prevProducts.map((product) => 
            product.id === productId ? { ...product, isEditing: false } : product
          )
        );
      })
      .catch((error) => console.error('Error al guardar el producto:', error));
  };

  // Manejar eliminación de producto
  const handleDelete = (productId) => {
    fetch(`http://127.0.0.1:8000/api/products/${productId}/`, {
      method: 'DELETE',
    })
    .then(() => {
        // Filtra el producto eliminado del estado
        setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
        );
    })
      .catch((error) => console.error('Error al eliminar el producto:', error));
  };

  // Manejar cambio en los campos
  const handleChange = (event, id) => {
    const { name, value } = event.target;
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, [name]: value } : product
    );
    setProducts(updatedProducts);
  };

  return (
    <div className=" overflow-y-hidden">
      <h1 className="text-md font-bold mb-2">Gestionar Inventario</h1>
      <ProductTable
        products={products.map((product) => ({
          ...product,
          isEditing: product.id === editingProductId
        }))}
        handleChange={handleChange}
        handleEdit={handleEdit}
        handleSave={handleSave}
        handleDelete={handleDelete}
      />

    </div>
  );
};

export default InventoryManagement;
