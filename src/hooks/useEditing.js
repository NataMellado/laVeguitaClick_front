import { useState, useEffect } from "react";

const useEditing = () => {
  const [editingId, setEditingId] = useState(null);
  const [tempData, setTempData] = useState({}); // Almacena datos temporales para revertir cambios

  // Salir del modo de edición al presionar Escape
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        revertChanges();
        setEditingId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [editingId]);

  const startEditing = (id, originalData) => {
    setEditingId(id);
    if (originalData) {
      setTempData((prev) => ({ ...prev, [id]: originalData })); // Guarda una copia de los datos originales
    }
  };

  const stopEditing = () => {
    setEditingId(null);
    setTempData((prev) => {
      const { [editingId]: _, ...rest } = prev; // Elimina el dato temporal del producto editado
      return rest;
    });
  };

  const revertChanges = () => {
    if (editingId && tempData[editingId]) {
      return tempData[editingId]; // Retorna los datos originales del producto en edición
    }
    return null;
  };

  return {
    editingId,
    isEditing: (id) => editingId === id,
    startEditing,
    stopEditing,
    revertChanges,
  };
};

export default useEditing;
