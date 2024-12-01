import { useState } from "react";

const useDriverManagement = ({
  drivers,
  setDrivers,
  originalDrivers,
  fetchDrivers,
  showStatusModal,
  startEditing,
  stopEditing,
  editingId,
  isEditing,
  setIsDriverModalOpen,
}) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [driverToDelete, setDriverToDelete] = useState(null);

  const handleAddDriver = () => {
    setIsDriverModalOpen(true);
  };

  const openConfirmModal = (driverId) => {
    setDriverToDelete(driverId);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = () => {
    handleDelete(driverToDelete);
    setIsConfirmModalOpen(false);
  };

  const handleEdit = (event, id) => {
    event.preventDefault();

    if (isEditing && editingId !== null) {
      const revertedDriver = originalDrivers.find(
        (driver) => driver.id === editingId
      );
      setDrivers((prevDrivers) =>
        prevDrivers.map((driver) =>
          driver.id === editingId ? revertedDriver : driver
        )
      );
    }
    startEditing(id);
  };

  const handleSave = async (event, driverId) => {
    event.preventDefault();
    const driverToSave = drivers.find((driver) => driver.id === driverId);
    const originalDriver = originalDrivers.find((driver) => driver.id === driverId);

    if(JSON.stringify(driverToSave) === JSON.stringify(originalDriver)) {
      showStatusModal("No se han realizado cambios", "info");
      stopEditing();
      return;
    }

    fetch(`http://127.0.0.1:8000/api/drivers/${driverId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(driverToSave), 
    })
      .then((res) => res.json())
      .then((data) => {
        stopEditing();
        fetchDrivers();
        showStatusModal(data.message, data.status);
      })
      .catch((error) => {
        console.error("Error al guardar el conductor:", error);
        showStatusModal("Error al guardar el conductor", "error");
      });
  };


  const handleChange = (event, id) => {
    const { name, value } = event.target;

    const updatedDrivers = drivers.map((driver) =>
      driver.id === id
        ? {
            ...driver,
            [name]: value === "null" ? null : value,
          }
        : driver
    );

    setDrivers(updatedDrivers);
  };


  const handleDelete = (driverId) => {
    fetch(`http://127.0.0.1:8000/api/drivers/${driverId}/`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        stopEditing();
        fetchDrivers();
        showStatusModal(data.message, data.status);
      })
      .catch((error) => {
        stopEditing();
        console.error("Error al eliminar el conductor:", error);
        showStatusModal("Error al eliminar el conductor", "error");
      });
  };

  return {
    handleAddDriver,
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

export default useDriverManagement;
