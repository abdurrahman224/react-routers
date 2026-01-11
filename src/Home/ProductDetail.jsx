import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const passed = state?.item ?? null;
  const [item, setItem] = useState(passed);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!passed) {
      // try to fetch by id if provided via query or state; fallback to first item
      fetch("/src/JSON/Dummy.json")
        .then((r) => r.json())
        .then((json) => {
          const all = json.flatMap((c) => c.items ?? []);
          setItem(all[0] ?? null);
        })
        .catch((e) => console.error(e));
    }
  }, [passed]);

  if (!item) {
    return (
      <div className="px-6 pt-24">
        <div className="text-center py-20">No product selected.</div>
        <div className="text-center mt-4">
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const addQty = () => setQty((q) => Math.max(1, q + 1));
  const subQty = () => setQty((q) => Math.max(1, q - 1));

  const buyNow = () => {
    navigate("/cart", { state: { item: { ...item, qty } } });
  };

  return (
    <div className="px-6 pt-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-6">
          <div className="border rounded p-4">
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-[480px] object-contain"
              />
            )}
          </div>
          {/* thumbnails could go here */}
        </div>

        <div className="lg:col-span-6">
          <h1 className="text-2xl font-bold mb-3">{item.name}</h1>
          <div className="flex gap-2 items-center mb-4">
            <span className="px-3 py-1 rounded-full bg-gray-100">Brand: {item.brand}</span>
            <span className="px-3 py-1 rounded-full bg-gray-100">Code: {item.id}</span>
            <span className="px-3 py-1 rounded-full bg-green-100">In Stock</span>
          </div>

          <p className="text-xl text-green-600 font-bold mb-4">৳ {item.price}</p>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Key Features</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Feature 1: {item.feature1 ?? "N/A"}</li>
              <li>Feature 2: {item.feature2 ?? "N/A"}</li>
              <li>Feature 3: {item.feature3 ?? "N/A"}</li>
            </ul>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded">
              <button onClick={subQty} className="px-3">-</button>
              <div className="px-4">{qty}</div>
              <button onClick={addQty} className="px-3">+</button>
            </div>

            <button onClick={buyNow} className="btn btn-primary">
              Buy Now
            </button>

            <button
              onClick={() => alert("Added to cart (demo)")}
              className="btn btn-ghost"
            >
              Add to Cart
            </button>
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
