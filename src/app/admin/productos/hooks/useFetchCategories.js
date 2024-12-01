import { useState, useEffect } from "react";

const useFetchCategories = () => {
  const [categories, setCategories] = useState([]);
  const [originalCategories, setOriginalCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/categories/");
      const data = await res.json();
      setCategories(data.categories);
      setOriginalCategories(data.categories);
    } catch (error) {
      console.error("Error al cargar las categorías:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, setCategories, originalCategories, setOriginalCategories, fetchCategories };
};

export default useFetchCategories;
