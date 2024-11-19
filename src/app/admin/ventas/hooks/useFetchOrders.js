import { useState, useEffect } from "react";

const useFetchOrders = (showStatusModal) => {
  const [orders, setOrders] = useState([]);
  const [originalOrders, setOriginalOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Fetch para obtener las órdenes
        const res = await fetch("http://127.0.0.1:8000/api/orders/");
        const data = await res.json();
        setOrders(data.orders);
        setOriginalOrders(data.orders);

        // Manejo de mensajes desde localStorage
        const message = localStorage.getItem("statusMessage");
        const status = localStorage.getItem("statusType");

        if (message && status) {
          showStatusModal(message, status);
          localStorage.removeItem("statusMessage");
          localStorage.removeItem("statusType");
        }
      } catch (error) {
        console.error("Error al cargar las órdenes:", error);
      }
    };

    fetchOrders();
  }, []);

  return { orders, setOrders, originalOrders, setOriginalOrders };
};

export default useFetchOrders;
