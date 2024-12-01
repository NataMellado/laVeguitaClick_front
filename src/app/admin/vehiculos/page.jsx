"use client";
import React, { useState } from "react";

// Componentes
import VehicleTable from "./components/VehicleTable"; 
import VehicleModal from "./components/VehicleModal"; 
import StatusModal from "../../../components/StatusModal";
import ConfirmModal from "../../../components/ConfirmModal";

// Hooks
import useFetchVehicles from "./hooks/useFetchVehicles";
import useVehicleManagement from "./hooks/useVehicleManagement";
import useStatusModal from "../../..//hooks/useStatusModal";
import useEditing from "../../..//hooks/useEditing";
import CustomButton from "../../..//components/CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const VehicleManagement = () => {
  // Estados
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);

  // Hooks
  const { showModal, message, status, showStatusModal, setShowModal } = useStatusModal();
  const { vehicles, setVehicles, originalVehicles, fetchVehicles } = useFetchVehicles(showStatusModal);
  const { editingId, isEditing, startEditing, stopEditing } = useEditing();
  const {
    handleAddVehicle,
    openConfirmModal,
    confirmDelete,
    handleEdit,
    handleSave,
    handleDelete,
    handleChange,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
  } = useVehicleManagement({
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
  });

  return (
    <div className="overflow-y-hidden">
      <div className="flex mb-3">
        {/* Título */}
        <h1 className="text-lg font-semibold mb-2">Vehículos</h1>

        {/* Botón de añadir vehículo */}
        <CustomButton
          label="Añadir vehículo"
          onClick={handleAddVehicle}
          icon={<FontAwesomeIcon icon={faPlus} />}
        />
      </div>

      {/* Tabla de vehículos */}
      <VehicleTable
        vehicles={vehicles.map((vehicle) => ({
          ...vehicle,
          isEditing: vehicle.id === editingId,
        }))}
        handleChange={handleChange}
        handleEdit={handleEdit}
        handleSave={handleSave}
        handleDelete={(id) => openConfirmModal(id)}
      />

      {/* Modal de estado */}
      <StatusModal
        message={message}
        type={status}
        showModal={showModal}
        setShowModal={setShowModal}
      />

      {/* Modal para añadir/editar vehículo */}
      {isVehicleModalOpen && (
        <VehicleModal
          onClose={() => setIsVehicleModalOpen(false)}
          onAddVehicle={fetchVehicles}
          showStatusModal={showStatusModal}
        />
      )}

      {/* Modal de confirmación */}
      <ConfirmModal
        message="¿Estás seguro de que deseas eliminar este vehículo?"
        showModal={isConfirmModalOpen}
        setShowModal={setIsConfirmModalOpen}
        onConfirm={confirmDelete}
        onCancel={() => setIsConfirmModalOpen(false)}
      />
    </div>
  );
};

export default VehicleManagement;
