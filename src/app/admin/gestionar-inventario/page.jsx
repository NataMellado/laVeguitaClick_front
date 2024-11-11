"use client";
import React, { useState, useEffect } from 'react';
import ProductTable from '@/components/ProductTable';
import ProductModal from '@/components/ProductModal';
import StatusModal from '@/components/StatusModal';

const InventoryManagement = () => {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');

  // Cargar datos de productos
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products/')
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error('Error al cargar los productos:', error));
      
      // Recargar el mensaje de localStorage si existe
      const message = localStorage.getItem('statusMessage');
      const type = localStorage.getItem('statusType');
      
      // Función para mostrar el modal de estado
      if (message && type) {
        setStatusMessage(message);
        setStatusType(type);
        setShowStatusModal(true);

        // Limpiar el mensaje de localStorage
        localStorage.removeItem('statusMessage');
        localStorage.removeItem('statusType');
      };
    }, []);

  // Mostrar modal de estado
  const handleStatusModal = (message, type) => {
    setStatusMessage(message);
    setStatusType(type);
    setShowStatusModal(true);
  };

   // Manejar adición de producto desde el modal
   const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setIsModalOpen(false);
  };

  // Manejar edición de producto
  const handleEdit = (event, id) => {
    event.preventDefault();
    setEditingProductId(id);
  };

  // Manejar guardado de cambios
  const handleSave = (event, productId) => {
    event.preventDefault();
    const productToSave = products.find((product) => product.id === productId);
    
    if (!productToSave.category) {
      alert("Por favor selecciona una categoría válida.");
      return;
    }

    fetch(`http://127.0.0.1:8000/api/products/${productId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productToSave),
    })
      .then((res) => res.json())
      .then((data) => {
        setEditingProductId(null);
        setProducts((prevProducts) =>
          prevProducts.map((product) => 
            product.id === productId ? { ...product, isEditing: false } : product
          )
        );
        handleStatusModal(data.message, 'success');
      })
      .catch((error) => {
        console.error('Error al guardar el producto:', error);
        handleStatusModal('Error al guardar el producto', 'error');
      });
  };

  // Manejar eliminación de producto
  const handleDelete = (productId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      fetch(`http://127.0.0.1:8000/api/products/${productId}/`, {
        method: 'DELETE',
      })
      .then((res) => res.json())
      .then((data) => {
          // Filtra el producto eliminado del estado
          setProducts((prevProducts) =>
              prevProducts.filter((product) => product.id !== productId)
          );
          handleStatusModal(data.message, 'success');
      })
        .catch((error) => {
          console.error('Error al eliminar el producto:', error);
          handleStatusModal('Error al eliminar el producto', 'error');
        });
    };
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
      <div className='flex mb-3'>
        
        {/* Título */}
        <h1 className="text-md font-bold mb-2">Gestionar Inventario</h1>
        
        {/* Botón para abrir el modal */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-sky-600 hover:bg-sky-700 transition-colors duration-300 text-white text-sm font-bold py-1 px-3 rounded ml-auto">
          Agregar Producto
        
        </button>
      </div>

      {/* Tabla de productos */}
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

      {/* Modal para añadir productos */}
      {isModalOpen && (
        <ProductModal
          onClose={() => setIsModalOpen(false)}
          onAddProduct={handleAddProduct}
          showStatusModal={handleStatusModal}
        />
      )}

      {/* Modal de estado */}
      <StatusModal
        message={statusMessage}
        type={statusType}
        showModal={showStatusModal}
        setShowModal={setShowStatusModal}
      />

    </div>
  );
};

export default InventoryManagement;
