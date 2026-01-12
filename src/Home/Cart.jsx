import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCart, removeItem, setQty, clearCart } from "../features/cart/cartSlice";
import { QuantitySelector, EmptyState } from "../components";
import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(selectCart) || { items: [] };
  const items = cart.items || [];

  const total = items.reduce(
    (s, it) => s + Number(it.price || 0) * Number(it.qty || 1),
    0
  );

  const handleQtyChange = (item, newQty) => {
    dispatch(setQty({ id: item.id, category: item.category, qty: newQty }));
  };

  const handleRemove = (item) => {
    dispatch(removeItem({ id: item.id, category: item.category }));
    toast.info(`${item.name} removed from cart`);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.info("Cart cleared");
  };

  if (!items.length) {
    return (
      <div className="pt-24">
        <EmptyState
          title="Your Cart is Empty"
          message="Add items to your cart to see them here."
          actionLabel="Start Shopping"
          actionTo="/"
        />
      </div>
    );
  }

  return (
    <div className="px-6 pt-24 pb-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h1>

        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <div
              key={`${item.category || ""}::${item.id}`}
              className="flex gap-4 items-center bg-white border rounded-lg p-4 shadow-sm"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
              )}

              <div className="flex-1">
                <Link
                  to={`/products/${encodeURIComponent(item.category || "")}/${item.id}`}
                  className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition"
                >
                  {item.name}
                </Link>
                <p className="text-sm text-gray-500">{item.brand}</p>
                <p className="text-green-600 font-bold mt-1">৳ {item.price}</p>
              </div>

              <div className="flex flex-col items-end gap-3">
                <QuantitySelector
                  quantity={item.qty || 1}
                  onIncrease={() => handleQtyChange(item, (item.qty || 1) + 1)}
                  onDecrease={() => handleQtyChange(item, Math.max(1, (item.qty || 1) - 1))}
                  size="sm"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleRemove(item)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium transition"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => navigate(`/products/${encodeURIComponent(item.category || "")}/${item.id}`)}
                    className="text-blue-500 hover:text-blue-700 text-sm font-medium transition"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Footer */}
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-3">
              <button
                onClick={handleClearCart}
                className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition font-medium"
              >
                Clear Cart
              </button>
              <Link
                to="/"
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition font-medium"
              >
                Continue Shopping
              </Link>
            </div>

            <div className="text-right">
              <p className="text-gray-500 text-sm">Subtotal</p>
              <p className="text-3xl font-bold text-green-600">৳ {total.toFixed(2)}</p>
            </div>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition font-medium text-lg"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
