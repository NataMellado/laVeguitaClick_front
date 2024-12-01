import { useState, useEffect } from "react";

const useFetchDrivers = (showStatusModal) => {
  const [drivers, setDrivers] = useState([]);
  const [originalDrivers, setOriginalDrivers] = useState([]);

  const fetchDrivers = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/drivers/");
      const data = await res.json();
      setDrivers(data.drivers);
      setOriginalDrivers(data.drivers);
    } catch (error) {
      console.error("Error al cargar los conductores:", error);
    }
  };

  useEffect(() => {
    fetchDrivers();
    const message = localStorage.getItem("statusMessage");
    const status = localStorage.getItem("statusType");

    if (message && status) {
      showStatusModal(message, status);
      localStorage.removeItem("statusMessage");
      localStorage.removeItem("statusType");
    }
  }, []);

  return { drivers, setDrivers, originalDrivers, setOriginalDrivers, fetchDrivers };
};

export default useFetchDrivers;
