"use client";
import React from 'react';
import SupplierRow from './SupplierRow';

const SupplierTable = ({ suppliers, handleChange, handleEdit, handleSave, handleDelete }) => (
  
  <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-9rem)] sm:max-h-[calc(100vh-5rem)] rounded-lg border border-gray-300 bg-white">
      <table className="min-w-full">
      <thead>
        <tr className="bg-gray-200 text-gray-600 uppercase text-xs leading-normal">
          <th className="py-3 px-4 text-left">Nombre</th>
          <th className="py-3 px-4 text-left">Email</th>
          <th className="py-3 px-4 text-left">Teléfono</th>
          <th className="py-3 px-4 text-left">Dirección</th>
          <th className="py-3 px-4 text-center">Acciones</th>
        </tr>
      </thead>
      <tbody className="text-gray-700 text-sm">
        {suppliers.map((supplier) => (
          <SupplierRow
            key={supplier.id}
            supplier={supplier}
            handleChange={handleChange}
            handleEdit={handleEdit}
            handleSave={handleSave}
            handleDelete={handleDelete}
          />
        ))}
      </tbody>
    </table>
  </div>
);

export default SupplierTable;
