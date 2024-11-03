"use client"
import React, { useEffect } from "react";
import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = React.useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products/')
      .then((res) => res.json())
      .then((data) => {
        const featuredProducts = data.products.filter((product) => product.is_featured);
        setFeaturedProducts(featuredProducts);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="p-4 sm:p-8">
      <h2 className="text-2xl font-bold mb-8">Destacados</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <a
          href="/productos"
          className="text-green-500 font-semibold hover:underline"
        >
          Ver todos los productos
        </a>
      </div>
    </div>
  );
};

export default FeaturedProducts;
