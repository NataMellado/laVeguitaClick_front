import { useState } from "react";

const useOrderManagement = ({
  orders,
  setOrders,
  originalOrders,
  fetchOrders,
  showStatusModal,
  startEditing,
  stopEditing,
  editingId,
  isEditing,
  setIsOrderModalOpen,
}) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  const handleAddOrder = () => {
    setIsOrderModalOpen(true);
  };

  const openConfirmModal = (orderId) => {
    setOrderToDelete(orderId);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = () => {
    handleDelete(orderToDelete);
    setIsConfirmModalOpen(false);
  };

  const handleEdit = (event, id) => {
    event.preventDefault();

    if (isEditing && editingId !== null) {
      const revertedOrder = originalOrders.find((order) => order.id === editingId);
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === editingId ? revertedOrder : order))
      );
    }
    startEditing(id);
  };

  const handleSave = (event, orderId) => {
    event.preventDefault();
  
    const normalizeOrder = (order) => ({
      ...order,
      vehicle: order.vehicle?.id ?? order.vehicle,
    });
  
    const orderToSave = normalizeOrder(orders.find((order) => order.id === orderId));
    const originalOrder = normalizeOrder(originalOrders.find((order) => order.id === orderId));
  
    if (JSON.stringify(orderToSave) === JSON.stringify(originalOrder)) {
      showStatusModal("No se han realizado cambios", "info");
      stopEditing();
      return;
    }
  
    fetch(`http://127.0.0.1:8000/api/orders/${orderId}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: orderToSave.status, vehicle: orderToSave.vehicle }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success" && data.order) {
          fetchOrders();
        }
        stopEditing();
        showStatusModal(data.message, data.status);
      })
      .catch((error) => {
        console.error("Error al guardar la orden:", error);
        showStatusModal("Error al guardar la orden", "error");
      });
  };
  
  

  const handleChange = (event, id) => {
    const { name, value } = event.target;
  
    const updatedOrders = orders.map((order) =>
      order.id === id
        ? {
            ...order,
            [name]: value === "null" ? null : value,
          }
        : order
    );
  
    setOrders(updatedOrders);
  };



  const handleDelete = (orderId) => {
    fetch(`http://127.0.0.1:8000/api/orders/${orderId}/`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        stopEditing();
        fetchOrders();
        showStatusModal(data.message, data.status);
      })
      .catch((error) => {
        stopEditing();
        console.error("Error al eliminar la orden:", error);
        showStatusModal("Error al eliminar la orden", "error");
      });
  };

  

  return {
    handleAddOrder,
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

export default useOrderManagement;
