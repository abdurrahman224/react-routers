import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem, openDrawer } from "../features/cart/cartSlice";
import { toast } from "react-toastify";
import { QuantitySelector, LoadingSpinner } from "../components";

const ProductDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  
  const passed = state?.item ?? null;
  const [item, setItem] = useState(passed);
  const [loading, setLoading] = useState(!passed);
  const [qty, setQty] = useState(1);
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    if (passed) return;
    
    const catParam = params?.category ? decodeURIComponent(params.category) : null;
    const idParam = params?.id ? Number(params.id) : null;
    
    setLoading(true);
    fetch(`${API_BASE}/api/categories`)
      .then((r) => r.json())
      .then((json) => {
        if (catParam && idParam != null) {
          const cat = json.find((c) => c.category === catParam);
          if (cat) {
            let found = null;
            if (Array.isArray(cat.items)) {
              found = cat.items.find((it) => Number(it.id) === idParam) ?? null;
            }
            if (!found && Array.isArray(cat.subcategories)) {
              for (const s of cat.subcategories) {
                const f = (s.items ?? []).find((it) => Number(it.id) === idParam) ?? null;
                if (f) {
                  found = f;
                  break;
                }
              }
            }
            if (found) {
              setItem({ ...found, category: catParam });
              return;
            }
          }
        }
        const all = json.flatMap((c) => {
          if (Array.isArray(c.items)) return c.items.map((it) => ({ ...it, category: c.category }));
          if (Array.isArray(c.subcategories)) return c.subcategories.flatMap((s) => (s.items ?? []).map((it) => ({ ...it, category: c.category })));
          return [];
        });
        setItem(all[0] ?? null);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [passed, params]);

  const handleAddToCart = () => {
    dispatch(addItem({ ...item, qty, category: item.category }));
    dispatch(openDrawer());
    toast.success(`${item.name} added to cart`);
  };

  const handleBuyNow = () => {
    dispatch(addItem({ ...item, qty, category: item.category }));
    navigate("/cart");
  };

  if (loading) {
    return <LoadingSpinner message="Loading product..." />;
  }

  if (!item) {
    return (
      <div className="px-6 pt-24 text-center">
        <h2 className="text-xl font-semibold mb-4">Product not found</h2>
        <Link to="/" className="text-blue-500 hover:underline">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 pt-24 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-96 object-contain"
              />
            )}
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{item.name}</h1>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">
                Brand: {item.brand}
              </span>
              <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">
                Code: {item.id}
              </span>
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                In Stock
              </span>
            </div>

            <p className="text-3xl text-green-600 font-bold mb-6">৳ {item.price}</p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <QuantitySelector
                  quantity={qty}
                  onIncrease={() => setQty((q) => q + 1)}
                  onDecrease={() => setQty((q) => Math.max(1, q - 1))}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition font-medium"
                >
                  Buy Now
                </button>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 border-2 border-blue-500 text-blue-500 px-6 py-3 rounded-md hover:bg-blue-50 transition font-medium"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            <div className="border-t pt-6">
              <h4 className="font-semibold text-gray-800 mb-2">Description</h4>
              <p className="text-gray-600 leading-relaxed">
                {item.description ?? "No description available for this product."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
