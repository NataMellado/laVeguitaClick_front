"use client";
import React, { useState, useEffect } from 'react';
import SupplierTable from '@/components/SupplierTable';

const SupplierManagement = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [editingSupplierId, setEditingSupplierId] = useState(null);

  // Cargar datos de proveedores
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/suppliers/')
      .then((res) => res.json())
      .then((data) => setSuppliers(data.suppliers))
      .catch((error) => console.error('Error al cargar los proveedores:', error));
  }, []);

  // Manejar edición de proveedor
  const handleEdit = (event, id) => {
    event.preventDefault();
    setEditingSupplierId(id); // Activa el modo de edición para el proveedor
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
      .then(() => {
        setEditingSupplierId(null); // Desactiva el modo de edición
        setSuppliers((prevSuppliers) =>
          prevSuppliers.map((supplier) =>
            supplier.id === supplierId ? { ...supplier, isEditing: false } : supplier
          )
        );
      })
      .catch((error) => console.error('Error al guardar el proveedor:', error));
  };

  // Manejar eliminación de proveedor
  const handleDelete = (supplierId) => {
    fetch(`http://127.0.0.1:8000/api/suppliers/${supplierId}/`, {
      method: 'DELETE',
    })
      .then(() => {
        // Filtra el proveedor eliminado del estado
        setSuppliers((prevSuppliers) =>
          prevSuppliers.filter((supplier) => supplier.id !== supplierId)
        );
      })
      .catch((error) => console.error('Error al eliminar el proveedor:', error));
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
        <h1 className="text-md font-bold mb-2">Gestionar Proveedores</h1>
        <SupplierTable
        suppliers={suppliers.map((supplier) => ({
            ...supplier,
            isEditing: supplier.id === editingSupplierId
        }))}
        handleChange={handleChange}
        handleEdit={handleEdit}
        handleSave={handleSave}
        handleDelete={handleDelete}
        />

    </div>
  );
};

export default SupplierManagement;
