import { useState, useEffect } from "react";

const useFetchVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [originalVehicles, setOriginalVehicles] = useState([]);

  const fetchVehicles = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/vehicles/");
      const data = await res.json();
      setVehicles(data.vehicles);
      setOriginalVehicles(data.vehicles);
    } catch (error) {
      console.error("Error al cargar los vehículos:", error);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return { vehicles, setVehicles, originalVehicles, setOriginalVehicles, fetchVehicles };
};

export default useFetchVehicles;
