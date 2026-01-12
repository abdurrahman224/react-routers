import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeDrawer, removeItem, setQty, selectCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const CartDrawer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, drawerOpen } = useSelector(selectCart);

  const total = items.reduce(
    (s, it) => s + Number(it.price || 0) * (it.qty || 1),
    0
  );

  const handleClose = () => dispatch(closeDrawer());
  
  const handleViewCart = () => {
    handleClose();
    navigate("/cart");
  };

  const handleCheckout = () => {
    handleClose();
    navigate("/checkout");
  };

  return (
    <>
      {/* Backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 transition-opacity"
          onClick={handleClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-gray-50">
          <h3 className="font-bold text-lg text-gray-800">Cart ({items.length})</h3>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition"
            aria-label="Close cart"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="p-4 overflow-y-auto" style={{ maxHeight: "calc(100% - 180px)" }}>
          {items.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={`${item.category}-${item.id}`} className="flex gap-3 items-start">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 truncate">{item.name}</p>
                    <p className="text-sm text-gray-500">৳ {item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => dispatch(setQty({
                          id: item.id,
                          category: item.category,
                          qty: Math.max(1, (item.qty || 1) - 1),
                        }))}
                        className="w-7 h-7 flex items-center justify-center border rounded hover:bg-gray-100"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm">{item.qty}</span>
                      <button
                        onClick={() => dispatch(setQty({
                          id: item.id,
                          category: item.category,
                          qty: (item.qty || 1) + 1,
                        }))}
                        className="w-7 h-7 flex items-center justify-center border rounded hover:bg-gray-100"
                      >
                        +
                      </button>
                      <button
                        onClick={() => dispatch(removeItem({ id: item.id, category: item.category }))}
                        className="ml-auto text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600">Total</span>
            <span className="text-xl font-bold text-green-600">৳ {total.toFixed(2)}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleViewCart}
              className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition font-medium"
            >
              View Cart
            </button>
            <button
              onClick={handleCheckout}
              className="flex-1 border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition font-medium"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
