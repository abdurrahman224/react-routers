import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category, image, isActive = false, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(category);
    }
    navigate(`/products/${encodeURIComponent(category)}`);
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      role="button"
      tabIndex={0}
      className="text-center cursor-pointer group"
    >
      <div
        className={`w-28 h-28 mx-auto rounded-full overflow-hidden transition-all duration-300 shadow-md group-hover:shadow-lg group-hover:scale-105 ${
          isActive ? "ring-4 ring-blue-500 ring-offset-2" : ""
        }`}
      >
        <img
          src={image}
          alt={category}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <p className="mt-3 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
        {category}
      </p>
    </div>
  );
};

export default CategoryCard;
