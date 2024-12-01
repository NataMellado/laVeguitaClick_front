import { useState, useEffect } from "react";

const useFetchOrders = (showStatusModal) => {
  const [orders, setOrders] = useState([]);
  const [originalOrders, setOriginalOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/orders/");
      const data = await res.json();
      setOrders(data.orders);
      setOriginalOrders(data.orders);
    } catch (error) {
      console.error("Error al cargar las órdenes:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
    const message = localStorage.getItem("statusMessage");
    const status = localStorage.getItem("statusType");

    if (message && status) {
      showStatusModal(message, status);
      localStorage.removeItem("statusMessage");
      localStorage.removeItem("statusType");
    }
  }, []);

  return { orders, setOrders, originalOrders, setOriginalOrders, fetchOrders };
};

export default useFetchOrders;
