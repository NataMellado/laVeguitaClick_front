"use client";
import React, { useState, useEffect } from 'react';

// Componentes
import SupplierTable from './components/SupplierTable';
import SupplierModal from './components/SupplierModal';
import StatusModal from '@/components/StatusModal';
import ConfirmModal from '@/components/ConfirmModal';

// Hooks
import useFetchSuppliers from './hooks/useFetchSuppliers';
import useSupplierManagement from './hooks/useSupplierManagement';
import useStatusModal from '@/hooks/useStatusModal';
import useEditing from '@/hooks/useEditing';
import CustomButton from '@/components/CustomButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const SupplierManagement = () => {

  // Estados
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);

  // Hooks
  const { showModal, message, status, showStatusModal, setShowModal } = useStatusModal();
  const { suppliers, setSuppliers, originalSuppliers, setOriginalSuppliers } = useFetchSuppliers(showStatusModal);
  const { editingId, isEditing, startEditing, stopEditing } = useEditing();
  const {
    handleAddSupplier,
    openConfirmModal,
    confirmDelete,
    handleEdit,
    handleSave,
    handleDelete,
    handleChange,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
  } = useSupplierManagement({
    suppliers,
    setSuppliers,
    originalSuppliers,
    setOriginalSuppliers,
    showStatusModal,
    startEditing,
    stopEditing,
    editingId,
    isEditing,
    setIsSupplierModalOpen,
  });
  

  return (

    <div className="overflow-y-hidden">
      <div className='flex mb-3'>
        {/* Tìtulo */}
        <h1 className="text-md font-bold mb-2">Proveedores</h1>

        {/* Botón de añadir proveedor */}
        <CustomButton
          label="Añadir Proveedor"
          onClick={handleAddSupplier}
          icon = {<FontAwesomeIcon icon={faPlus} />}
        />
      </div>

      <SupplierTable
        suppliers={suppliers.map((supplier) => ({
            ...supplier,
            isEditing: supplier.id === editingId,
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

      {/* Modal para añadir proveedor */}
      {isSupplierModalOpen && (
        <SupplierModal
          onClose={() => setIsSupplierModalOpen(false)}
          onAddSupplier={handleAddSupplier}
          showStatusModal={showStatusModal}
        />
      )}

    <ConfirmModal
      message="¿Estás seguro de que deseas eliminar este proveedor?"
      showModal={isConfirmModalOpen}
      setShowModal={setIsConfirmModalOpen}
      onConfirm={confirmDelete}
      onCancel={() => setIsConfirmModalOpen(false)}
    />


    </div>
  );
};

export default SupplierManagement;
