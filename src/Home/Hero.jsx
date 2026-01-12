// import React, { useEffect, useState } from "react";
// import Category from "./Category";


// const Hero = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`${import.meta.env.BASE_URL}JSON/Dummy.json`)
//       .then((response) => response.json())
//       .then((jsonData) => {
//         setData(jsonData);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching data:", err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <div>loading...</div>;

//   return <div className="py-20">
  
//  <Category data={data}/>
  
  
  
//   </div>;
// };

// export default Hero;




import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PRICE_RANGES = [
  { key: "under-2000", label: "Under ৳2,000", min: 0, max: 1999 },
  { key: "2000-5000", label: "৳2,000 - ৳5,000", min: 2000, max: 5000 },
  { key: "5000-10000", label: "৳5,000 - ৳10,000", min: 5000, max: 10000 },
  { key: "10000-20000", label: "৳10,000 - ৳20,000", min: 10000, max: 20000 },
  { key: "above-20000", label: "Above ৳20,000", min: 20001, max: Infinity },
];

const Hero = () => {
  const { state } = useLocation();
  const passedItems = state?.items ?? null;
  const initialId = state?.initialId ?? null;
  const [items, setItems] = useState(passedItems ?? []);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(!passedItems);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");

  useEffect(() => {
    if (!passedItems) {
      fetch("/JSON/Dummy.json")
        .then((r) => r.json())
        .then((json) => {
          // keep grouped data and flattened items
          setGroups(json);
          const all = json.flatMap((c) => (c.items ?? []).map((it) => ({ ...it, category: c.category })));
          setItems(all);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [passedItems]);

  const itemsPerPage = 8;
  const navigate = useNavigate();

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(groups.map((g) => g.category).filter(Boolean)))],
    [groups]
  );

  const subcategoriesForSelected = useMemo(() => {
    if (!selectedCategory || selectedCategory === "All") return [];
    const group = groups.find((g) => g.category === selectedCategory);
    if (!group) return [];
    if (Array.isArray(group.subcategories)) return group.subcategories.map((s) => s.name).filter((n) => n !== "All");
    if (Array.isArray(group.items)) return [];
    return [];
  }, [groups, selectedCategory]);
  // Sorting
  const [sortOpen, setSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState("alpha-asc");

  // control collapse/expand of the COLLECTIONS sidebar
  const [collectionsOpen, setCollectionsOpen] = useState(true);
  // price filter state (single-select key or null)
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const sortOptions = [
    { key: "alpha-asc", label: "Alphabetical (A-Z)" },
    { key: "alpha-desc", label: "Alphabetical (Z-A)" },
    { key: "price-asc", label: "Price: Low to High" },
    { key: "price-desc", label: "Price: High to Low" },
  ];

  const filteredItems = useMemo(() => {
    let result = [];
    if (!selectedCategory || selectedCategory === "All") {
      result = items;
    } else {
      const group = groups.find((g) => g.category === selectedCategory);
      if (!group) return [];
      if (Array.isArray(group.subcategories)) {
        if (selectedSubcategory) {
          const sub = group.subcategories.find((s) => s.name === selectedSubcategory);
          result = (sub?.items ?? []).map((it) => ({ ...it, category: group.category }));
        } else {
          result = group.subcategories.flatMap((s) => s.items ?? []).map((it) => ({ ...it, category: group.category }));
        }
      } else {
        // legacy: group has items directly
        result = (group.items ?? []).map((it) => ({ ...it, category: group.category }));
      }
    }

    // apply price filtering (if a range is selected)
    if (!selectedPriceRange) return result;
    const range = PRICE_RANGES.find((r) => r.key === selectedPriceRange);
    if (!range) return result;
    return result.filter((it) => {
      const price = Number(it.price) || 0;
      const minOk = range.min == null || price >= range.min;
      const maxOk = range.max == null || price <= range.max;
      return minOk && maxOk;
    });
  }, [items, groups, selectedCategory, selectedSubcategory, selectedPriceRange]);

  // compute pagination indices and sorted slice
  const initialIndex = useMemo(() => {
    if (!initialId) return -1;
    return filteredItems.findIndex((it) => it.id === initialId);
  }, [filteredItems, initialId]);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (initialId && initialIndex >= 0) {
      const t = setTimeout(() => {
        setCurrentPage(Math.floor(initialIndex / itemsPerPage) + 1);
      }, 0);
      return () => clearTimeout(t);
    }
  }, [initialId, initialIndex]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));
  const start = (currentPage - 1) * itemsPerPage;

  const sortedItems = useMemo(() => {
    const arr = [...filteredItems];
    switch (sortOption) {
      case "alpha-asc":
        return arr.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
      case "alpha-desc":
        return arr.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
      case "price-asc":
        return arr.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
      case "price-desc":
        return arr.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
      default:
        return arr;
    }
  }, [filteredItems, sortOption]);

  const currentItems = sortedItems.slice(start, start + itemsPerPage);

  const openCart = (item) => navigate("/cart", { state: { item } });

  const openProduct = (item) => {
    const cat = encodeURIComponent(item.category || "");
    navigate(`/product/${cat}/${item.id}`, { state: { item } });
  };

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    // default to first real subcategory (exclude 'All'), or clear to show all group items
    const group = groups.find((g) => g.category === cat);
    const subs = (group?.subcategories ?? []).map((s) => s.name).filter((n) => n !== "All");
    setSelectedSubcategory(subs.length ? subs[0] : null);
    setCurrentPage(1);
  };

  const handleSubcategoryClick = (sub) => {
    setSelectedSubcategory(sub);
    setCurrentPage(1);
  };

  if (loading) return <div className="py-20 text-center">Loading...</div>;

  return (
    <div className="px-6 py-20">
      <h2 className="text-2xl font-semibold mb-6">Listing</h2>

      <div className="flex gap-6">
        <aside className="w-64 hidden lg:block">
          <div className="border rounded p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => setCollectionsOpen((s) => !s)}
                className="flex items-center gap-2 text-left w-full"
                aria-expanded={collectionsOpen}
              >
                <span className="font-semibold">COLLECTIONS</span>
              </button>
              <button
                onClick={() => setCollectionsOpen((s) => !s)}
                className="ml-2 focus:outline-none"
                aria-label={collectionsOpen ? "Collapse collections" : "Expand collections"}
              >
                <span className="text-sm">
                  {collectionsOpen ? <ChevronDown /> : <ChevronUp />}
                </span>
              </button>
            </div>

            {collectionsOpen && (
              <>
                <ul className="space-y-2">
                  {categories.map((cat) => {
                    const isActive = selectedCategory === cat;
                    return (
                      <li key={cat}>
                        <button
                          onClick={() => handleCategoryClick(cat)}
                          className={`w-full text-left px-3 py-2 rounded flex items-center justify-between ${isActive ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
                        >
                          <span>{cat}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
                {selectedCategory !== "All" && subcategoriesForSelected.length > 0 && (
                  <div className="mt-4">
                    <h5 className="font-semibold mb-2">Subcategories</h5>
                    <ul className="space-y-2">
                      {subcategoriesForSelected.map((sub) => {
                        const isActive = selectedSubcategory === sub;
                        return (
                          <li key={sub}>
                            <button
                              onClick={() => handleSubcategoryClick(sub)}
                              className={`w-full text-left px-3 py-2 rounded ${isActive ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
                            >
                              {sub}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
                {/* PRICE filter (BDT) */}
                <div className="mt-4">
                  <h5 className="font-semibold mb-2">PRICE (BDT)</h5>
                  <ul className="space-y-2">
                    {PRICE_RANGES.map((r) => (
                      <li key={r.key} className="flex items-center gap-2">
                        <input
                          id={`price-${r.key}`}
                          type="checkbox"
                          checked={selectedPriceRange === r.key}
                          onChange={() => {
                            setSelectedPriceRange((prev) => (prev === r.key ? null : r.key));
                            setCurrentPage(1);
                          }}
                        />
                        <label htmlFor={`price-${r.key}`} className="select-none">
                          {r.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </aside>

        <div className="flex-1">
          {/* Sort control */}
          <div className="-mt-17 flex items-center justify-end">
            <div className="flex  relative text-sm py-4">
              <div className="flex  items-center gap-3 text-gray-700 mr-2">
                <span className="font-semibold">SORT BY:</span>
              </div>
              <button
                onClick={() => setSortOpen((s) => !s)}
                className="bg-black text-white px-3 py-2 rounded flex items-center gap-2"
              >
                <span>
                  {sortOptions.find((o) => o.key === sortOption)?.label || "Sort"}
                </span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {sortOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-black text-white shadow-lg rounded">
                  <ul>
                    {sortOptions.map((opt) => (
                      <li key={opt.key}>
                        <button
                          onClick={() => {
                            setSortOption(opt.key);
                            setSortOpen(false);
                            setCurrentPage(1);
                          }}
                          className={`w-full text-left px-4 py-2 hover:bg-gray-700 ${sortOption === opt.key ? "bg-gray-800" : ""}`}
                        >
                          {opt.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentItems.map((item) => (
              <div
                key={`${item.category}-${item.id}`}
                onClick={() => openProduct(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && openProduct(item)}
                className="border rounded-lg shadow-md p-4 hover:shadow-xl transition cursor-pointer"
              >
                {item.image && (
                  <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded mb-2" />
                )}
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-1">Brand: {item.brand}</p>
                <p className="text-green-600 font-bold mb-3">৳ {item.price}</p>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openCart(item);
                    }}
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
      </div>
    </div>
  );
};

export default Hero;

