import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem, openDrawer } from "../features/cart/cartSlice";
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const passed = state?.item ?? null;
  const [item, setItem] = useState(passed);
  const [qty, setQty] = useState(1);
  const params = useParams();

  const COLOR_MAP = {
    Electronics: { border: "", ring: "" },
    Clothing: { border: "", ring: "" },
    Furniture: { border: "", ring: "" },
    Toys: { border: "", ring: "" },
  };

  useEffect(() => {
    if (passed) return;
    // if params available, try to fetch the specific category and id
    const catParam = params?.category ? decodeURIComponent(params.category) : null;
    const idParam = params?.id ? Number(params.id) : null;
    fetch("/JSON/Dummy.json")
      .then((r) => r.json())
      .then((json) => {
        if (catParam && idParam != null) {
          const cat = json.find((c) => c.category === catParam);
          if (cat) {
            // try direct items
            let found = null;
            if (Array.isArray(cat.items)) {
              found = cat.items.find((it) => Number(it.id) === idParam) ?? null;
            }
            // try subcategories
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
        // fallback to first available item across all categories/subcategories
        const all = json.flatMap((c) => {
          if (Array.isArray(c.items)) return c.items.map((it) => ({ ...it, category: c.category }));
          if (Array.isArray(c.subcategories)) return c.subcategories.flatMap((s) => (s.items ?? []).map((it) => ({ ...it, category: c.category })));
          return [];
        });
        setItem(all[0] ?? null);
      })
      .catch((e) => console.error(e));
  }, [passed, params]);

  if (!item) {
    return (
      <div className="px-6 pt-24">

        <div className="text-center mt-4">
          <Link to="/" className=" ">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const addQty = () => setQty((q) => Math.max(1, q + 1));
  const subQty = () => setQty((q) => Math.max(1, q - 1));
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem({ ...item, qty, category: item.category }));
    dispatch(openDrawer());
  };

  // show toast when item added
  const handleAddToCartWithToast = () => {
    dispatch(addItem({ ...item, qty, category: item.category }));
    dispatch(openDrawer());
    try {
      toast.success(`${item.name} added to cart`);
    } catch (e) {
      // ignore if toast not available
    }
  };



  return (
    <div className="px-6 pt-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-6">
          <div className={` shadow p-4 ${COLOR_MAP[item.category]?.border || ''}`}>
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-120 object-contain"
              />
            )}
          </div>
          {/* thumbnails could go here */}
        </div>

        <div className={`lg:col-span-6 shadow rounded p-4 ${COLOR_MAP[item.category]?.border || ''}`}>
          <h1 className="text-2xl font-bold mb-3">{item.name}</h1>
          <div className="flex gap-2 items-center mb-4">
            <span className="px-3 py-1 rounded-full bg-gray-100">Brand: {item.brand}</span>
            <span className="px-3 py-1 rounded-full bg-gray-100">Code: {item.id}</span>
            <span className="px-3 py-1 rounded-full bg-green-100">In Stock</span>
          </div>

          <p className="text-xl text-green-600 font-bold mb-4">৳ {item.price}</p>

     

          <div className="flex flex-col  items-start gap-4 mb-6">
            <div className="flex items-center border rounded">
              <button onClick={subQty} className="px-3">-</button>
              <div className="px-4">{qty}</div>
              <button onClick={addQty} className="px-3">+</button>
            </div>

            <div className="flex gap-3">
              <button  className="btn btn-primary ">
                Buy Now
              </button>

              <button onClick={handleAddToCartWithToast} className="btn btn-outline">
                Add to Cart
              </button>
            </div>

           
          </div>

          <div>
            <h4 className="font-semibold mb-2">Description</h4>
            <p className="text-gray-700">{item.description ?? "No description."}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
