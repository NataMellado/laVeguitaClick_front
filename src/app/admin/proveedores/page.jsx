"use client";
import React, { useState, useEffect } from 'react';
import SupplierRow from '../../../components/SupplierRow';

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
    <div className="supplier-management p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Teléfono</th>
              <th className="py-3 px-6 text-left">Dirección</th>
              <th className="py-3 px-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {suppliers.map((supplier) => (
              <SupplierRow
                key={supplier.id}
                supplier={{ ...supplier, isEditing: supplier.id === editingSupplierId }}
                handleChange={handleChange}
                handleEdit={handleEdit}
                handleSave={handleSave}
                handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierManagement;
