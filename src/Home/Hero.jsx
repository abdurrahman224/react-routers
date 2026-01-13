import React, { useState, useEffect } from "react";
import { CategoryCard, LoadingSpinner } from "../components";

const TOP_CATEGORIES = ["Electronics", "Clothing", "Furniture", "Toys"];

const Hero = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetch(`${API_BASE}/api/categories`)
      .then((res) => res.json())
      .then((json) => setData(json || []))
      .catch((err) => console.error("Error fetching data:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading categories..." />;
  }

  const getCategoryImage = (category) => {
    const group = data.find((g) => g.category === category) || {};
    return (
      group.subcategories?.[0]?.items?.[0]?.image ||
      group.items?.[0]?.image ||
      `https://picsum.photos/200/200?random=${category.length}`
    );
  };

  return (
    <div className="px-6 min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Shop by Category
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-12">
          {TOP_CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat}
              category={cat}
              image={getCategoryImage(cat)}
              isActive={selectedCategory === cat}
              onClick={setSelectedCategory}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;

