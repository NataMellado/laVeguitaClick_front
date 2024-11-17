import { useState, useEffect } from "react";

const useFetchSuppliers = (showStatusModal) => {
  const [suppliers, setSuppliers] = useState([]);
  const [originalSuppliers, setOriginalSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        // Fetch para obtener los proveedores
        const res = await fetch("http://127.0.0.1:8000/api/suppliers/");
        const data = await res.json();
        setSuppliers(data.suppliers);
        setOriginalSuppliers(data.suppliers);

        // Manejo de mensajes desde localStorage
        const message = localStorage.getItem("statusMessage");
        const status = localStorage.getItem("statusType");

        if (message && status) {
          showStatusModal(message, status);
          localStorage.removeItem("statusMessage");
          localStorage.removeItem("statusType");
        }
      } catch (error) {
        console.error("Error al cargar los proveedores:", error);
      }
    };

    fetchSuppliers();
  }, []);

  return { suppliers, setSuppliers, originalSuppliers, setOriginalSuppliers };
};

export default useFetchSuppliers;
