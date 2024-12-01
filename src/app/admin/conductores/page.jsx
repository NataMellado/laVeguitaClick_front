"use client";
import React, { useState } from "react";

// Componentes
import DriverTable from "./components/DriverTable"; 
import DriverModal from "./components/DriverModal"; 
import StatusModal from "../../../components/StatusModal";
import ConfirmModal from "../../../components/ConfirmModal";

// Hooks
import useFetchDrivers from "./hooks/useFetchDrivers"; 
import useDriverManagement from "./hooks/useDriverManagement";
import useStatusModal from "../../../hooks/useStatusModal";
import useEditing from "../../../hooks/useEditing";
import CustomButton from "../../../components/CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const DriverManagement = () => {
  // Estados
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);

  // Hooks
  const { showModal, message, status, showStatusModal, setShowModal } = useStatusModal();
  const { drivers, setDrivers, originalDrivers, fetchDrivers } = useFetchDrivers(showStatusModal);
  const { editingId, isEditing, startEditing, stopEditing } = useEditing();
  const {
    handleAddDriver,
    openConfirmModal,
    confirmDelete,
    handleEdit,
    handleSave,
    handleDelete,
    handleChange,
    handleChangeUser,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
  } = useDriverManagement({
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
  });

  return (
    <div className="overflow-y-hidden">
      <div className="flex mb-3">
        {/* Título */}
        <h1 className="text-lg font-semibold mb-2">Conductores</h1>

        {/* Botón de añadir conductor */}
        <CustomButton
          label="Añadir conductor"
          onClick={handleAddDriver}
          icon={<FontAwesomeIcon icon={faPlus} />}
        />
      </div>

      {/* Tabla de conductores */}
      <DriverTable
        drivers={drivers.map((driver) => ({
          ...driver,
          isEditing: driver.id === editingId,
        }))}
        handleChange={handleChange}
        handleChangeUser={handleChangeUser}
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

      {/* Modal para añadir/editar conductor */}
      {isDriverModalOpen && (
        <DriverModal
          onClose={() => setIsDriverModalOpen(false)}
          onAddDriver={handleAddDriver}
          showStatusModal={showStatusModal}
        />
      )}

      {/* Modal de confirmación */}
      <ConfirmModal
        message="¿Estás seguro de que deseas eliminar este conductor?"
        showModal={isConfirmModalOpen}
        setShowModal={setIsConfirmModalOpen}
        onConfirm={confirmDelete}
        onCancel={() => setIsConfirmModalOpen(false)}
      />
    </div>
  );
};

export default DriverManagement;
