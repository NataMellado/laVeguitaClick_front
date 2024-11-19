"use client";
import React, { useState, useEffect } from 'react';

// Componentes
import OrderTable from './components/OrderTable';
import OrderModal from './components/OrderModal';
import StatusModal from '@/components/StatusModal';
import ConfirmModal from '@/components/ConfirmModal';

// Hooks
import useFetchOrders from './hooks/useFetchOrders';
import useOrderManagement from './hooks/useOrderManagement';
import useStatusModal from '@/hooks/useStatusModal';
import useEditing from '@/hooks/useEditing';
import CustomButton from '@/components/CustomButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const OrderManagement = () => {

  // Estados
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Hooks
  const { showModal, message, status, showStatusModal, setShowModal } = useStatusModal();
  const { orders, setOrders, originalOrders, setOriginalOrders } = useFetchOrders(showStatusModal);
  const { editingId, isEditing, startEditing, stopEditing } = useEditing();
  const {
    handleAddOrder,
    openConfirmModal,
    confirmDelete,
    handleEdit,
    handleSave,
    handleDelete,
    handleChange,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
  } = useOrderManagement({
    orders,
    setOrders,
    originalOrders,
    setOriginalOrders,
    showStatusModal,
    startEditing,
    stopEditing,
    editingId,
    isEditing,
    setIsOrderModalOpen,
  });

  return (

    <div className="overflow-y-hidden">
      <div className='flex mb-3'>
        {/* Título */}
        <h1 className="text-md font-bold mb-2">Ventas</h1>

        {/* Botón de añadir orden */}
        <CustomButton
          label="Añadir venta"
          onClick={handleAddOrder}
          icon={<FontAwesomeIcon icon={faPlus} />}
        />
      </div>

      <OrderTable
        orders={orders.map((order) => ({
          ...order,
          isEditing: order.id === editingId,
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

      {/* Modal para añadir orden */}
      {isOrderModalOpen && (
        <OrderModal
          onClose={() => setIsOrderModalOpen(false)}
          onAddOrder={handleAddOrder}
          showStatusModal={showStatusModal}
        />
      )}

      <ConfirmModal
        message="¿Estás seguro de que deseas eliminar esta orden?"
        showModal={isConfirmModalOpen}
        setShowModal={setIsConfirmModalOpen}
        onConfirm={confirmDelete}
        onCancel={() => setIsConfirmModalOpen(false)}
      />
    </div>
  );
};

export default OrderManagement;
