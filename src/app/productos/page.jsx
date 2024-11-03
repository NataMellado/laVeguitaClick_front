"use client";
import React, { useEffect } from "react";
import ProductCard from "@/components/ProductCard";

const ProductsPage = () => {
  const [products, setProducts] = React.useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products/')
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="p-4 sm:p-8 mt-12">
      <h1 className="text-2xl font-bold  mb-8">Todos los Productos</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
