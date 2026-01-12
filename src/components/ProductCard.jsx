import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem, openDrawer } from "../features/cart/cartSlice";
import { toast } from "react-toastify";

const ProductCard = ({ item, category }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const itemCategory = item.category || category || "";

  const handleClick = () => {
    navigate(`/products/${encodeURIComponent(itemCategory)}/${item.id}`, {
      state: { item: { ...item, category: itemCategory } },
    });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addItem({ ...item, qty: 1, category: itemCategory }));
    dispatch(openDrawer());
    toast.success(`${item.name} added to cart`);
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    dispatch(addItem({ ...item, qty: 1, category: itemCategory }));
    navigate("/cart");
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      role="button"
      tabIndex={0}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02]"
    >
      {item.image && (
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-40 object-cover rounded mb-3"
          loading="lazy"
        />
      )}
      <h3 className="text-lg font-semibold mb-2 line-clamp-1">{item.name}</h3>
      <p className="text-gray-500 text-sm mb-1">Brand: {item.brand}</p>
      <p className="text-green-600 font-bold text-lg mb-3">৳ {item.price}</p>
      <div className="flex items-center gap-2">
        <button
          onClick={handleBuyNow}
          className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition text-sm font-medium"
        >
          Buy Now
        </button>
        <button
          onClick={handleAddToCart}
          className="flex-1 border border-gray-300 px-3 py-2 rounded-md hover:bg-gray-50 transition text-sm font-medium"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
