import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeDrawer, removeItem, setQty, selectCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const CartDrawer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, drawerOpen } = useSelector(selectCart);

  const total = items.reduce((s, it) => s + (Number(it.price || 0) * (it.qty || 1)), 0);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        drawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-bold">Cart</h3>
        <button onClick={() => dispatch(closeDrawer())} className="px-2 py-1 text-sm border rounded">
          Close
        </button>
      </div>

      <div className="p-4 overflow-y-auto" style={{ maxHeight: "calc(100% - 160px)" }}>
        {items.length === 0 ? (
          <div className="text-gray-500">Your cart is empty.</div>
        ) : (
          items.map((it) => (
            <div key={`${it.category}-${it.id}`} className="flex gap-3 items-center mb-4">
              {it.image && <img src={it.image} alt={it.name} className="w-16 h-12 object-cover rounded" />}
              <div className="flex-1">
                <div className="font-semibold">{it.name}</div>
                <div className="text-sm text-gray-600">৳ {it.price} x {it.qty}</div>
                <div className="mt-2 flex items-center gap-2">
                  <button onClick={() => dispatch(setQty({ id: it.id, category: it.category, qty: Math.max(1, (it.qty || 1) - 1) }))} className="px-2 py-1 border rounded">-</button>
                  <div className="px-2">{it.qty}</div>
                  <button onClick={() => dispatch(setQty({ id: it.id, category: it.category, qty: (it.qty || 1) + 1 }))} className="px-2 py-1 border rounded">+</button>
                  <button onClick={() => dispatch(removeItem({ id: it.id, category: it.category }))} className="ml-2 text-red-600 text-sm">Remove</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center justify-between mb-3">
          <div className="text-gray-600">Total</div>
          <div className="font-bold">৳ {total}</div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => { dispatch(closeDrawer()); navigate('/cart'); }} className="flex-1 bg-blue-500 text-white px-3 py-2 rounded">View Cart</button>
          <button onClick={() => { dispatch(closeDrawer()); navigate('/checkout'); }} className="flex-1 border px-3 py-2 rounded">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
