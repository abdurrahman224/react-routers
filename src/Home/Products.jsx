import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem, openDrawer } from "../features/cart/cartSlice";
import { toast } from 'react-toastify';

const Products = () => {
  const { category } = useParams();
  const decodedCategory = decodeURIComponent(category || "");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("alpha-asc");
  const [sortOpen, setSortOpen] = useState(false);
  const itemsPerPage = 8;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const SORT_OPTIONS = [
    { key: "alpha-asc", label: "Alphabetical (A-Z)" },
    { key: "alpha-desc", label: "Alphabetical (Z-A)" },
    { key: "price-asc", label: "Price: Low to High" },
    { key: "price-desc", label: "Price: High to Low" },
  ];

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL || "/"}JSON/Dummy.json`)
      .then((r) => r.json())
      .then((json) => setData(json || []))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const COLOR_MAP = {
    Electronics: { hover: "", ring: "", border: "" },
    Clothing: { hover: "", ring: "", border: "" },
    Furniture: { hover: "", ring: "", border: "" },
    Toys: { hover: "", ring: "", border: "border-green-500" },
  };

  const cardHoverClass = (cat) => `${COLOR_MAP[cat]?.hover || "h"}`;

  useEffect(() => {
    // reset page when category or data changes
    setCurrentPage(1);
    setSelectedSubcategory(null);
  }, [decodedCategory, data]);

  const group = useMemo(() => (decodedCategory ? data.find((g) => g.category === decodedCategory) || null : null), [data, decodedCategory]);
  const subcats = group?.subcategories ?? [];

  const allItems = useMemo(() => {
    // If no category in the URL, show all items across categories
    if (!decodedCategory) {
      return data.flatMap((g) => (g.items ?? []).map((it) => ({ ...it, category: g.category })));
    }

    if (selectedSubcategory) {
      const sub = subcats.find((s) => s.name === selectedSubcategory);
      return (sub?.items ?? []).map((it) => ({ ...it, category: decodedCategory }));
    }

    return (group?.items ?? []).map((it) => ({ ...it, category: decodedCategory }));
  }, [data, decodedCategory, group, subcats, selectedSubcategory]);

  const sortedItems = useMemo(() => {
    const arr = [...allItems];
    if (sortOption === "alpha-asc") {
      arr.sort((a, b) => (a.name || "").toString().localeCompare((b.name || "").toString()));
    } else if (sortOption === "alpha-desc") {
      arr.sort((a, b) => (b.name || "").toString().localeCompare((a.name || "").toString()));
    } else if (sortOption === "price-asc") {
      arr.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
    } else if (sortOption === "price-desc") {
      arr.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
    }
    return arr;
  }, [allItems, sortOption]);

  const totalPages = Math.max(1, Math.ceil(sortedItems.length / itemsPerPage));
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = sortedItems.slice(startIdx, startIdx + itemsPerPage);

  if (loading) return <div className="py-20 text-center">Loading...</div>;

  return (
    <div className="px-6 py-20">
      <div className="flex gap-6">
        {/* Sidebar for subcategories */}
        {subcats.length > 0 && (
          <aside className="w-64 py-14 block">
            <div className="border rounded p-4">
              <h4 className="font-semibold mb-3">Subcategories</h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => {
                      setSelectedSubcategory(null);
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left px-3 py-2 rounded ${selectedSubcategory === null ? "bg-blue-500 text-white" : "bg-transparent"}`}
                  >
                    All
                  </button>
                </li>
                {subcats.map((s) => {
                  const thumb = s.items?.[0]?.image;
                  const active = selectedSubcategory === s.name;
                  return (
                    <li key={s.name}>
                      <button
                        onClick={() => {
                          setSelectedSubcategory(s.name);
                          setCurrentPage(1);
                        }}
                        className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded ${
                          active ? "bg-blue-500 text-white" : "bg-transparent"
                        }`}
                      >
                      
                        <span>{s.name}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        )}

        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-6">{decodedCategory || "All Products"}</h1>

          {/* Right side: SORT BY control */}
          <div className="flex justify-end py-">
            <div className="relative flex items-center justify-center -mt-16 text-left">
              <div className="text-sm font-semibold mr-2 mb-1">SORT BY:</div>
              <button
                onClick={() => setSortOpen((s) => !s)}
                className="flex items-center gap-2 px-3 py-2 border rounded bg-white"
              >
                <span className="text-sm">{SORT_OPTIONS.find((o) => o.key === sortOption)?.label}</span>
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </button>

              {sortOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border rounded shadow-lg z-50">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => {
                        setSortOption(opt.key);
                        setSortOpen(false);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-3 py-2 hover:bg-gray-100 ${sortOption === opt.key ? "bg-gray-200 font-semibold" : ""}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {allItems.length === 0 ? (
            <div className="text-center text-gray-500">No products found for this category.</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentItems.map((item) => (
                  <div
                      key={`${item.category}-${item.id}`}
                      onClick={() => navigate(`/products/${encodeURIComponent(item.category || decodedCategory)}/${item.id}`, { state: { item } })}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && navigate(`/products/${encodeURIComponent(decodedCategory)}/${item.id}`, { state: { item } })}
                      className={` rounded-lg shadow-md p-4 hover:shadow-xl transition-transform transform cursor-pointer hover:scale-105 ${cardHoverClass(item.category || decodedCategory)}`}
                    >
                    {item.image && (
                      <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded mb-2" />
                    )}
                    <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                    <p className="text-gray-600 mb-1">Brand: {item.brand}</p>
                    <p className="text-green-600 font-bold mb-3">৳ {item.price}</p>
                    <div className="flex items-center justify-between gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/cart", { state: { item } });
                        }}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                      >
                        Buy Now
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          try {
                            dispatch(addItem({ ...item, qty: 1, category: item.category || decodedCategory }));
                            dispatch(openDrawer());
                            toast.success(`${item.name} added to cart`);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        className="border px-3 py-1 rounded hover:bg-gray-100 transition"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-8">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                  >
                    Prev
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
