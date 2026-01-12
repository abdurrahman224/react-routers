import React from "react";

const QuantitySelector = ({ quantity, onIncrease, onDecrease, size = "md" }) => {
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2",
    lg: "px-4 py-3 text-lg",
  };

  return (
    <div className="flex items-center border rounded-md overflow-hidden">
      <button
        onClick={onDecrease}
        className={`${sizeClasses[size]} hover:bg-gray-100 transition font-medium`}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <div className={`${sizeClasses[size]} min-w-[40px] text-center font-medium`}>
        {quantity}
      </div>
      <button
        onClick={onIncrease}
        className={`${sizeClasses[size]} hover:bg-gray-100 transition font-medium`}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
