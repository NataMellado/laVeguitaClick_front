"use client";
import React, { useState, useEffect } from 'react';
import SupplierTable from '@/components/SupplierTable';
import SupplierModal from '@/components/SupplierModal';
import StatusModal from '@/components/StatusModal';
import useStatusModal from '@/hooks/useStatusModal';
import useEditing from '@/hooks/useEditing';
import CustomButton from '@/components/CustomButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const SupplierManagement = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [originalSuppliers, setOriginalSuppliers] = useState([]);

  // Hooks
  const { showModal, message, status, showStatusModal, setShowModal } = useStatusModal();
  const { editingId, isEditing, startEditing, stopEditing } = useEditing();

  // Cargar datos de proveedores
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/suppliers/')
      .then((res) => res.json())
      .then((data) => {
        setSuppliers(data.suppliers);
        setOriginalSuppliers(data.suppliers);
      })
      .catch((error) => console.error('Error al cargar los proveedores:', error));

    // Cargar el mensaje de localStorage si existe
    const message = localStorage.getItem('statusMessage');
    const status = localStorage.getItem('statusType');

    // Función para mostrar el modal de estado
    if (message && status) {
      showStatusModal(message, status);
      localStorage.removeItem('statusMessage');
      localStorage.removeItem('statusType');
    };
    }, []);

  // Función para abrir el modal de proveedor
  const handleAddSupplier = () => setIsSupplierModalOpen(true);

  // Manejar edición de proveedor
  const handleEdit = (event, id) => {
    event.preventDefault();

    // Cancelar la edición actual y revertir cambios si ya hay un proveedor en edición
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

  // Manejar guardado de cambios
  const handleSave = (event, supplierId) => {
    event.preventDefault();
    const supplierToSave = suppliers.find((supplier) => supplier.id === supplierId);

    fetch(`http://127.0.0.1:8000/api/suppliers/${supplierId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(supplierToSave),
    })
      .then((res) => res.json())
      .then((data) => {
        stopEditing();
        setOriginalSuppliers((prevSuppliers) =>
          prevSuppliers.map((supplier) =>
            supplier.id === supplierId ? supplierToSave : supplier
          )
        );
        showStatusModal(data.message, data.status);
      })
      .catch((error) => console.error('Error al guardar el proveedor:', error));
      showStatusModal("Error al guardar el proveedor", "error");
  };

  // Manejar eliminación de proveedor
  const handleDelete = (supplierId) => {
    fetch(`http://127.0.0.1:8000/api/suppliers/${supplierId}/`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
     
        setSuppliers((prevSuppliers) =>
          prevSuppliers.filter((supplier) => supplier.id !== supplierId)
        );
        showStatusModal(data.message, data.status);
      })
      .catch((error) => {
        console.error('Error al eliminar el proveedor:', error);
        showStatusModal("Error al eliminar el proveedor", "error");
      });
    };
  

  // Manejar cambio en los campos
  const handleChange = (event, id) => {
    const { name, value } = event.target;
    const updatedSuppliers = suppliers.map((supplier) =>
      supplier.id === id ? { ...supplier, [name]: value } : supplier
    );
    setSuppliers(updatedSuppliers);
  };

  return (

    <div className="overflow-y-hidden">
      <div className='flex mb-3'>
        {/* Tìtulo */}
        <h1 className="text-md font-bold mb-2">Gestionar Proveedores</h1>

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
        handleDelete={handleDelete}
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

    </div>
  );
};

export default SupplierManagement;
