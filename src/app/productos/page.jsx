"use client";
import React from "react";
import ProductCard from "@/components/ProductCard";

const ProductsPage = () => {
  const allProducts = [
    { id: 1, name: "Producto A", image: "/images/product-a.jpg", description: "Descripción del producto A", price: 1200 },
    { id: 2, name: "Producto B", image: "/images/product-b.jpg", description: "Descripción del producto B", price: 1990 },
    { id: 3, name: "Producto C", image: "/images/product-c.jpg", description: "Descripción del producto C", price: 1500 },
    { id: 4, name: "Producto D", image: "/images/product-d.jpg", description: "Descripción del producto D", price: 1800 },
    { id: 5, name: "Producto E", image: "/images/product-e.jpg", description: "Descripción del producto E", price: 2100 },
    { id: 6, name: "Producto F", image: "/images/product-f.jpg", description: "Descripción del producto F", price: 2200 },
    { id: 7, name: "Producto G", image: "/images/product-g.jpg", description: "Descripción del producto G", price: 2300 },
    { id: 8, name: "Producto H", image: "/images/product-h.jpg", description: "Descripción del producto H", price: 2400 },
    { id: 9, name: "Producto I", image: "/images/product-i.jpg", description: "Descripción del producto I", price: 2500 },
    { id: 10, name: "Producto J", image: "/images/product-j.jpg", description: "Descripción del producto J", price: 2600 },
    { id: 11, name: "Producto K", image: "/images/product-k.jpg", description: "Descripción del producto K", price: 2700 },
    { id: 12, name: "Producto L", image: "/images/product-l.jpg", description: "Descripción del producto L", price: 2800 },

  ];

  return (
    <div className="p-4 sm:p-8 mt-12">
      <h1 className="text-2xl font-bold  mb-8">Todos los Productos</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-6">
        {allProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
