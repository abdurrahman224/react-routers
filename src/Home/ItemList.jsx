import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ItemList = () => {
  const { state } = useLocation();
  const passedItems = state?.items ?? null;
  const initialId = state?.initialId ?? null;
  const [items, setItems] = useState(passedItems ?? []);
  const [loading, setLoading] = useState(!passedItems);

  useEffect(() => {
    if (!passedItems) {
      fetch("/JSON/Dummy.json")
        .then((r) => r.json())
        .then((json) => {
          const all = json.flatMap((c) => c.items ?? []);
          setItems(all);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [passedItems]);

  const itemsPerPage = 8;
  const navigate = useNavigate();

  const initialIndex = useMemo(() => {
    if (!initialId) return 0;
    return items.findIndex((it) => it.id === initialId);
  }, [items, initialId]);

  const [currentPage, setCurrentPage] = useState(() => {
    if (!initialId) return 1;
    return Math.floor((initialIndex >= 0 ? initialIndex : 0) / itemsPerPage) + 1;
  });

  useEffect(() => {
    if (initialId && initialIndex >= 0) {
      setCurrentPage(Math.floor(initialIndex / itemsPerPage) + 1);
    }
  }, [initialId, initialIndex]);

  if (loading) return <div className="py-20 text-center">Loading...</div>;

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const start = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(start, start + itemsPerPage);

  const openCart = (item) => navigate("/cart", { state: { item } });

  return (
    <div className="px-6 py-20">
      <h2 className="text-2xl font-semibold mb-6">Listing</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentItems.map((item) => (
          <div key={item.id} className="border rounded-lg shadow-md p-4">
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded mb-2"
              />
            )}
            <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-600 mb-1">Brand: {item.brand}</p>
            <p className="text-green-600 font-bold mb-3">৳ {item.price}</p>
            <div className="flex gap-2">
              <button
                onClick={() => openCart(item)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemList;
