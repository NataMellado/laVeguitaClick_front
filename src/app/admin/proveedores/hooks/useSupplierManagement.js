import { useState } from "react";

const useSupplierManagement = ({
  suppliers,
  setSuppliers,
  originalSuppliers,
  fetchSuppliers,
  showStatusModal,
  startEditing,
  stopEditing,
  editingId,
  isEditing,
  setIsSupplierModalOpen,
}) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState(null);

  const handleAddSupplier = () => {
    setIsSupplierModalOpen(true);
  };

  const openConfirmModal = (supplierId) => {
    setSupplierToDelete(supplierId);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = () => {
    handleDelete(supplierToDelete);
    setIsConfirmModalOpen(false);
  };

  const handleEdit = (event, id) => {
    event.preventDefault();

    if (isEditing && editingId !== null) {
      const revertedSupplier = originalSuppliers.find(
        (supplier) => supplier.id === editingId
      );
      setSuppliers((prevSuppliers) =>
        prevSuppliers.map((supplier) =>
          supplier.id === editingId ? revertedSupplier : supplier
        )
      );
    }
    startEditing(id);
  };

  const handleSave = (event, supplierId) => {
    event.preventDefault();
    const supplierToSave = suppliers.find((supplier) => supplier.id === supplierId);
    const originalSupplier = originalSuppliers.find((supplier) => supplier.id === supplierId);

    if (JSON.stringify(supplierToSave) === JSON.stringify(originalSupplier)) {
      showStatusModal("No se han realizado cambios", "info");
      stopEditing();
      return;
    }

    fetch(`http://127.0.0.1:8000/api/suppliers/${supplierId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(supplierToSave),
    })
      .then((res) => res.json())
      .then((data) => {
        stopEditing();
        fetchSuppliers();
        showStatusModal(data.message, data.status);
      })
      .catch((error) => {
        console.error("Error al guardar el proveedor:", error);
        showStatusModal("Error al guardar el proveedor", "error");
      });
  };

  const handleDelete = (supplierId) => {
    fetch(`http://127.0.0.1:8000/api/suppliers/${supplierId}/`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        stopEditing();
        fetchSuppliers();
        showStatusModal(data.message, data.status);
      })
      .catch((error) => {
        stopEditing();
        console.error("Error al eliminar el proveedor:", error);
        showStatusModal("Error al eliminar el proveedor", "error");
      });
  };

  const handleChange = (event, id) => {
    const { name, value } = event.target;
    const updatedSuppliers = suppliers.map((supplier) =>
      supplier.id === id ? { ...supplier, [name]: value } : supplier
    );
    setSuppliers(updatedSuppliers);
  };

  return {
    handleAddSupplier,
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

export default useSupplierManagement;
