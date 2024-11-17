import { useState } from "react";

const useProductManagement = ({
  products,
  setProducts,
  originalProducts,
  setOriginalProducts,
  showStatusModal,
  startEditing,
  stopEditing,
  editingId,
  isEditing,
  setIsProductModalOpen,
  setIsCategoryModalOpen,
}) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleAddProduct = () => {
    setIsProductModalOpen(true);
  };

  const handleAddCategory = () => {
    setIsCategoryModalOpen(true);
  };

  const openConfirmModal = (productId) => {
    setProductToDelete(productId);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = () => {
    handleDelete(productToDelete);
    setIsConfirmModalOpen(false);
  };

  const handleEdit = (event, id) => {
    event.preventDefault();

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

  const handleDelete = (productId) => {
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
  };

  const handleChange = (event, id) => {
    const { name, value } = event.target;
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, [name]: value } : product
    );
    setProducts(updatedProducts);
  };

  return {
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
  };
};

export default useProductManagement;
