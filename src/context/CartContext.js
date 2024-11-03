import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        // Si el producto ya está en el carrito, aumenta la cantidad hasta un máximo de 20
        return prevCart.map((item) =>
          item.id === product.id && item.quantity < 20
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Agrega un nuevo producto al carrito con una cantidad inicial de 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const decreaseFromCart = (product) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) =>
          item.id === product.id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
    });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, decreaseFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
