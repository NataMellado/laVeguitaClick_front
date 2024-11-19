"use client";
import React, { useState, useEffect } from "react";

const OrderModal = ({ onClose, onAddOrder, showStatusModal }) => {
  const [formData, setFormData] = useState({
    user_email: "",
    items: [],
  });
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({ product_id: "", quantity: 1 });
  const [total, setTotal] = useState(0);

  // Cargar productos al montar el componente
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error("Error al cargar productos:", error));
  }, []);

  // Recalcular el total cada vez que los items cambien
  useEffect(() => {
    const newTotal = formData.items.reduce((sum, item) => {
      const product = products.find((p) => p.id === parseInt(item.product_id));
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
    setTotal(newTotal);
  }, [formData.items, products]);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Manejar cambios en el producto seleccionado
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value, 10) : value,
    }));
  };

  // Añadir producto a la lista de items
  const handleAddProduct = () => {
    if (!selectedProduct.product_id || selectedProduct.quantity < 1) return;

    setFormData((prevData) => ({
      ...prevData,
      items: [...prevData.items, selectedProduct],
    }));
    setSelectedProduct({ product_id: "", quantity: 1 });
  };

  // Eliminar un producto de la lista de items
  const handleRemoveProduct = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      items: prevData.items.filter((_, i) => i !== index),
    }));
  };

  // Enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.items.length) {
      showStatusModal("Debe añadir al menos un producto", "error");
      onClose();
      return;
    }
    fetch("http://127.0.0.1:8000/api/orders/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        onAddOrder(data);
        localStorage.setItem("statusMessage", data.message);
        localStorage.setItem("statusType", data.status);
        setFormData({ user_email: "", items: [] });
        onClose();
        window.location.href = "/admin/ventas";
      })
      .catch((error) => {
        console.error("Error:", error);
        showStatusModal("Error al añadir la venta: " + error.message, "error");
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white overflow-y-auto p-4 rounded-lg w-full max-w-md max-h-[90vh]">
        <div className="flex mb-4">
          <h1 className="text-md font-bold">Añadir Venta</h1>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-xl ml-auto font-bold"
          >
            &times;
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            id="user_email"
            name="user_email"
            value={formData.user_email}
            onChange={handleChange}
            required
            placeholder="Correo del usuario"
            className="w-full px-2 py-1 border rounded-md"
          />

          {/* Productos */}
          <div className="flex items-center space-x-2">
            <select
              name="product_id"
              value={selectedProduct.product_id}
              onChange={handleProductChange}
              className="flex-1 px-2 py-1 border rounded-md"
            >
              <option value="" disabled>
                Seleccionar producto
              </option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} - ${product.price}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="quantity"
              value={selectedProduct.quantity}
              onChange={handleProductChange}
              min="1"
              className="w-16 px-2 py-1 border rounded-md"
            />
            <button
              type="button"
              onClick={handleAddProduct}
              className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
            >
              Añadir
            </button>
          </div>

          {/* Listado */}
          {formData.items.length > 0 && (
            <ul className="mt-4 space-y-2">
              {formData.items.map((item, index) => (
                <li key={index} className="flex justify-between items-center p-2 border rounded-md">
                  <span>
                    {products.find((p) => p.id === parseInt(item.product_id))?.name} x{" "}
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveProduct(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Total */}
          <div className="text-right font-bold text-lg">
            Total: ${total.toFixed(0)}
          </div>

          <button
            type="submit"
            className="w-full bg-sky-600 text-white font-bold py-2 px-4 rounded-md hover:bg-sky-700 transition-colors duration-300"
          >
            Guardar Venta
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
