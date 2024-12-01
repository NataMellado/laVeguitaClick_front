"use client";
import React, { useState, useEffect } from "react";

// Componentes
import ProductTable from "./components/ProductTable";
import ProductModal from "./components/ProductModal";
import CategoryModal from "./components/CategoryModal";
import StatusModal from "../../../components/StatusModal";
import ConfirmModal from "../../../components/ConfirmModal";

// Hooks
import useFetchProducts from "./hooks/useFetchProducts";
import useFetchCategories from "./hooks/useFetchCategories";
import useProductManagement from "./hooks/useProductManagement";
import useStatusModal from "../../../hooks/useStatusModal";
import useEditing from "../../../hooks/useEditing";
import AddDropdown from "../../../components/AddDropdown";

const InventoryManagement = () => {
  // Estados
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // Hooks
  const { showModal, message, status, showStatusModal, setShowModal } = useStatusModal();
  const { products, setProducts, originalProducts, fetchProducts } = useFetchProducts(showStatusModal);
  const { categories, setCategories, fetchCategories } = useFetchCategories(showStatusModal);
  const { editingId, isEditing, startEditing, stopEditing } = useEditing();
  const {
    handleAddProduct,
    handleAddCategory,
    openConfirmModal,
    confirmDelete,
    handleEdit,
    handleSave,
    handleDelete,
    handleChange,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
  } = useProductManagement({
    products,
    setProducts,
    originalProducts,
    fetchProducts,
    showStatusModal,
    startEditing,
    stopEditing,
    editingId,
    isEditing,
    setIsProductModalOpen,
    setIsCategoryModalOpen,
  });



  // Opciones para el dropdown de agregar
  const addOptions = [
    { label: "Agregar Producto", onClick: handleAddProduct },
    { label: "Agregar Categoría", onClick: handleAddCategory },
  ];


  return (
    <div className=" overflow-y-hidden">
      <div className="flex mb-3">
        {/* Título */}
        <h1 className="text-lg font-semibold mb-2">Productos</h1>

        {/* Dropdown de agregar */}
        <AddDropdown options={addOptions} />
      </div>

      {/* Tabla de productos */}
      <ProductTable
        products={products.map((product) => ({
          ...product,
          isEditing: product.id === editingId,
        }))}
        categories={categories}
        handleChange={handleChange}
        handleEdit={handleEdit}
        handleSave={handleSave}
        handleDelete={(id) => openConfirmModal(id)}
      />

      {/* Modal para añadir productos */}
      {isProductModalOpen && (
        <ProductModal
          onClose={() => setIsProductModalOpen(false)}
          fetchProducts={fetchProducts}
          categories={categories}
          showStatusModal={showStatusModal}
        />
      )}

      {/* Modal para añadir categorías */}
      {isCategoryModalOpen && (
        <CategoryModal
          onClose={() => setIsCategoryModalOpen(false)}
          fetchCategories={fetchCategories}
          categories={categories}
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

      {/* Modal de confirmación */}
      <ConfirmModal
        message={"¿Estás seguro de que deseas eliminar este producto?"}
        showModal={isConfirmModalOpen}
        setShowModal={setIsConfirmModalOpen}
        onConfirm={confirmDelete}
        onCancel={() => setIsConfirmModalOpen(false)}
      />
    </div>
  );
};

export default InventoryManagement;
