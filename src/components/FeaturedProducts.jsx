import React from "react";
import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Producto A",
      image: "/images/product-a.jpg",
      description: "Descripción del producto A",
      price: 1200,
    },
    {
      id: 2,
      name: "Producto B",
      image: "/images/product-b.jpg",
      description: "Descripción del producto B",
      price: 1990,
    },
    {
      id: 3,
      name: "Producto C",
      image: "/images/product-c.jpg",
      description: "Descripción del producto C",
      price: 1500,
    },
    {
      id: 4,
      name: "Producto D",
      image: "/images/product-d.jpg",
      description: "Descripción del producto D",
      price: 1800,
    },
    {
      id: 5,
      name: "Producto E",
      image: "/images/product-e.jpg",
      description: "Descripción del producto E",
      price: 2100,
    },
    {
      id: 6,
      name: "Producto F",
      image: "/images/product-f.jpg",
      description: "Descripción del producto F",
      price: 2200,
    },
    {
      id: 7,
      name: "Producto G",
      image: "/images/product-g.jpg",
      description: "Descripción del producto G",
      price: 2300,
    },
    {
      id: 8,
      name: "Producto H",
      image: "/images/product-h.jpg",
      description: "Descripción del producto H",
      price: 2400,
    },
  ];

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
