import React from "react";
import { useLocation, Link } from "react-router-dom";

const Cart = () => {
  const { state } = useLocation();
  const item = state?.item ?? null;

  if (!item) {
    return (
      <div className="px-6 pt-24">
        <h2 className="text-2xl font-semibold mb-4">Your Cart is empty</h2>
        <p className="mb-4">Add items to cart from the listing.</p>
        <Link to="/" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 pt-24">
      <h2 className="text-2xl font-semibold mb-4">Cart</h2>

      <div className="max-w-3xl border rounded-lg p-4 shadow">
        {item.image && (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-64 object-cover rounded mb-4"
          />
        )}

        <h3 className="text-xl font-bold mb-2">{item.name}</h3>
        <p className="text-gray-600 mb-1">Brand: {item.brand}</p>
        <p className="text-green-600 font-bold mb-3">৳ {item.price}</p>

        <div className="flex gap-2">
          <button className="btn btn-success">Checkout</button>
          <Link to="/" className="btn btn-ghost">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
