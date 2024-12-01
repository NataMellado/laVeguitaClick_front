import { useState, useEffect } from "react";

const useFetchSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [originalSuppliers, setOriginalSuppliers] = useState([]);

  const fetchSuppliers = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/suppliers/");
      const data = await res.json();
      setSuppliers(data.suppliers);
      setOriginalSuppliers(data.suppliers);
    } catch (error) {
      console.error("Error al cargar los proveedores:", error);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return { suppliers, setSuppliers, originalSuppliers, setOriginalSuppliers, fetchSuppliers };
};

export default useFetchSuppliers;
