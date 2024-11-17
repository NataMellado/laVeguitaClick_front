"use client";
import React, { useState, useEffect } from "react";
import ProductTable from "@/components/ProductTable";
import ProductModal from "@/components/ProductModal";
import CategoryModal from "@/components/CategoryModal";
import StatusModal from "@/components/StatusModal";
import useStatusModal from "@/hooks/useStatusModal";
import useEditing from "@/hooks/useEditing";
import AddDropdown from "@/components/AddDropdown";

const InventoryManagement = () => {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // Hooks
  const { showModal, message, status, showStatusModal, setShowModal } = useStatusModal();
  const { editingId, isEditing, startEditing, stopEditing } = useEditing();

  // Cargar datos de productos
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json())
      .then((data) =>  {
        setProducts(data.products);
        setOriginalProducts(data.products);
      })
      .catch((error) => console.error("Error al cargar los productos:", error));

    // Cargar el mensaje de localStorage si existe
    const message = localStorage.getItem("statusMessage");
    const status = localStorage.getItem("statusType");

    // Función para mostrar el modal de estado
    if (message && status) {
      showStatusModal(message, status);
      localStorage.removeItem("statusMessage");
      localStorage.removeItem("statusType");
    }
  }, []);

  // Funciones para abrir cada modal
  const handleAddProduct = () => setIsProductModalOpen(true);
  const handleAddCategory = () => setIsCategoryModalOpen(true);

  // Opciones para el dropdown de agregar
  const addOptions = [
    { label: "Agregar Producto", onClick: handleAddProduct },
    { label: "Agregar Categoría", onClick: handleAddCategory },
  ];

  // Manejar edición de producto
  const handleEdit = (event, id) => {
    event.preventDefault();

    // Cancelar la edición actual y revertir cambios si ya hay un producto en edición
    if (isEditing && editingId !== null) {
      const revertedProduct = originalProducts.find(
        (product) => product.id === editingId
      );
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === editingId ? revertedProduct : product
        )
      );
    }
    startEditing(id);
  };

  // Manejar guardado de cambios
  const handleSave = (event, productId) => {
    event.preventDefault();
    const productToSave = products.find((product) => product.id === productId);

    fetch(`http://127.0.0.1:8000/api/products/${productId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productToSave),
    })
      .then((res) => res.json())
      .then((data) => {
        stopEditing();
        setOriginalProducts((prevOriginals) =>
          prevOriginals.map((product) =>
            product.id === productId ? { ...productToSave } : product
          )
        );
        showStatusModal(data.message, data.status);
      })
      .catch((error) => {
        console.error("Error al guardar el producto:", error);
        showStatusModal("Error al guardar el producto", "error");
      });
  };

  // Manejar eliminación de producto
  const handleDelete = (productId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      fetch(`http://127.0.0.1:8000/api/products/${productId}/`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
          );
          showStatusModal(data.message, data.status);
        })
        .catch((error) => {
          console.error("Error al eliminar el producto:", error);
          showStatusModal("Error al eliminar el producto", "error");
        });
    }
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
      <div className="flex mb-3">
        {/* Título */}
        <h1 className="text-md font-bold mb-2">Gestionar Inventario</h1>

        {/* Dropdown de agregar */}
        <AddDropdown options={addOptions} />
      </div>

      {/* Tabla de productos */}
      <ProductTable
        products={products.map((product) => ({
          ...product,
          isEditing: product.id === editingId,
        }))}
        handleChange={handleChange}
        handleEdit={handleEdit}
        handleSave={handleSave}
        handleDelete={handleDelete}
      />

      {/* Modal para añadir productos */}
      {isProductModalOpen && (
        <ProductModal
          onClose={() => setIsProductModalOpen(false)}
          onAddProduct={handleAddProduct}
          showStatusModal={showStatusModal}
        />
      )}

      {/* Modal para añadir categorías */}
      {isCategoryModalOpen && (
        <CategoryModal
          onClose={() => setIsCategoryModalOpen(false)}
          onAddCategory={handleAddCategory}
          showStatusModal={showStatusModal}
        />
      )}

      {/* Modal de estado */}
      <StatusModal
        message={message}
        type={status}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default InventoryManagement;
