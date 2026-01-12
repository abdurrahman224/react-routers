import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCart, removeItem, setQty, clearCart } from "../features/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(selectCart) || { items: [] };
  const items = cart.items || [];

  const total = items.reduce((s, it) => s + (Number(it.price || 0) * (Number(it.qty) || 0)), 0);

  if (!items.length) {
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
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>

      <div className="space-y-4">
        {items.map((it) => (
          <div key={`${it.category || ""}::${it.id}`} className="flex gap-4 items-center border rounded p-4">
            {it.image && (
              <img src={it.image} alt={it.name} className="w-28 h-28 object-cover rounded" />
            )}

            <div className="flex-1">
              <Link to={`/products/${encodeURIComponent(it.category || "")}/${it.id}`} className="text-lg font-semibold hover:underline">
                {it.name}
              </Link>
              <p className="text-sm text-gray-600">{it.brand}</p>
              <p className="text-green-600 font-bold mt-2">৳ {it.price}</p>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                <button
                  className="btn btn-sm"
                  onClick={() => {
                    const newQty = Math.max(1, (Number(it.qty) || 1) - 1);
                    dispatch(setQty({ id: it.id, category: it.category, qty: newQty }));
                  }}
                >
                  -
                </button>
                <div className="px-3">{it.qty || 1}</div>
                <button
                  className="btn btn-sm"
                  onClick={() => {
                    const newQty = (Number(it.qty) || 1) + 1;
                    dispatch(setQty({ id: it.id, category: it.category, qty: newQty }));
                  }}
                >
                  +
                </button>
              </div>

              <div className="flex gap-2">
                <button className="btn btn-ghost btn-sm" onClick={() => dispatch(removeItem({ id: it.id, category: it.category }))}>
                  Remove
                </button>
                <button className="btn btn-sm btn-primary" onClick={() => navigate(`/products/${encodeURIComponent(it.category || "")}/${it.id}`)}>
                  View
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center border-t pt-4">
          <div className="flex items-center gap-2">
            <button className="btn btn-error btn-sm" onClick={() => dispatch(clearCart())}>
              Clear Cart
            </button>
            <Link to="/" className="btn btn-ghost btn-sm">
              Continue Shopping
            </Link>
          </div>

          <div className="text-right">
            <div className="text-lg font-semibold">Subtotal</div>
            <div className="text-2xl font-bold text-green-600">৳ {total.toFixed(2)}</div>
            <div className="mt-2">
              <button className="btn btn-success ml-2" onClick={() => navigate('/checkout')}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
