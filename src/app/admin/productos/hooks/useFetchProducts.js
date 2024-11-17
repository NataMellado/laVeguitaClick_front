import { useState, useEffect } from "react";

const useFetchProducts = (showStatusModal) => {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch para obtener los productos
        const res = await fetch("http://127.0.0.1:8000/api/products/");
        const data = await res.json();
        setProducts(data.products);
        setOriginalProducts(data.products);

        // Manejo de mensajes desde localStorage
        const message = localStorage.getItem("statusMessage");
        const status = localStorage.getItem("statusType");

        if (message && status) {
          showStatusModal(message, status);
          localStorage.removeItem("statusMessage");
          localStorage.removeItem("statusType");
        }
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  return { products, setProducts, originalProducts, setOriginalProducts };
};

export default useFetchProducts;
