import { useState } from "react";

const useVehicleManagement = ({
  vehicles,
  setVehicles,
  originalVehicles,
  fetchVehicles,
  showStatusModal,
  startEditing,
  stopEditing,
  editingId,
  isEditing,
  setIsVehicleModalOpen,
}) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);

  const handleAddVehicle = () => {
    setIsVehicleModalOpen(true);
  };

  const openConfirmModal = (vehicleId) => {
    setVehicleToDelete(vehicleId);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = () => {
    handleDelete(vehicleToDelete);
    setIsConfirmModalOpen(false);
  };

  const handleEdit = (event, id) => {
    event.preventDefault();

    if (isEditing && editingId !== null) {
      const revertedVehicle = originalVehicles.find((vehicle) => vehicle.id === editingId);
      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle) => (vehicle.id === editingId ? revertedVehicle : vehicle))
      );
    }
    startEditing(id);
  };

  const handleSave = (event, vehicleId) => {
    event.preventDefault();

    const normalizeVehicle = (vehicle) => ({
        ...vehicle,
        driver: vehicle.driver?.id ?? vehicle.driver,
    });

    const vehicleToSave = normalizeVehicle(vehicles.find((vehicle) => vehicle.id === vehicleId));
    const originalVehicle = normalizeVehicle(originalVehicles.find((vehicle) => vehicle.id === vehicleId));

    if (JSON.stringify(vehicleToSave) === JSON.stringify(originalVehicle)) {
      showStatusModal("No se han realizado cambios", "info");
      stopEditing();
      return;
    }

    fetch(`http://127.0.0.1:8000/api/vehicles/${vehicleId}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vehicleToSave),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success" && data.vehicle) {
          stopEditing();
          fetchVehicles();
          showStatusModal(data.message, data.status);
        } else {
          stopEditing();
          setVehicles(originalVehicles);
          showStatusModal(data.message, data.status);
        }
      })
      .catch((error) => {
        console.error("Error al guardar el vehículo:", error);
        setVehicles(originalVehicles);
        stopEditing();
        showStatusModal("Error al guardar el vehículo", "error");
      });
  };

  const handleChange = (event, id) => {
    const { name, value } = event.target;

    const updatedVehicles = vehicles.map((vehicle) =>
      vehicle.id === id
        ? {
            ...vehicle,
            [name]: value === "null" ? null : value,
          }
        : vehicle
    );

    setVehicles(updatedVehicles);
  };

  const handleDelete = (vehicleId) => {
    fetch(`http://127.0.0.1:8000/api/vehicles/${vehicleId}/`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        stopEditing();
        fetchVehicles();
        showStatusModal(data.message, data.status);
      })
      .catch((error) => {
        stopEditing();
        console.error("Error al eliminar el vehículo:", error);
        showStatusModal("Error al eliminar el vehículo", "error");
      });
  };

  return {
    handleAddVehicle,
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

export default useVehicleManagement;
