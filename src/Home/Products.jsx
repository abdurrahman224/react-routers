import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { ProductCard, Pagination, LoadingSpinner, EmptyState } from "../components";

const SORT_OPTIONS = [
  { key: "alpha-asc", label: "Alphabetical (A-Z)" },
  { key: "alpha-desc", label: "Alphabetical (Z-A)" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
];

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

  // Fetch data
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL || "/"}JSON/Dummy.json`)
      .then((r) => r.json())
      .then((json) => setData(json || []))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  // Reset on category change
  useEffect(() => {
    setCurrentPage(1);
    setSelectedSubcategory(null);
  }, [decodedCategory, data]);

  // Get category group and subcategories
  const group = useMemo(
    () => (decodedCategory ? data.find((g) => g.category === decodedCategory) : null),
    [data, decodedCategory]
  );
  const subcats = group?.subcategories ?? [];

  // Get all items
  const allItems = useMemo(() => {
    if (!decodedCategory) {
      return data.flatMap((g) => (g.items ?? []).map((it) => ({ ...it, category: g.category })));
    }
    if (selectedSubcategory) {
      const sub = subcats.find((s) => s.name === selectedSubcategory);
      return (sub?.items ?? []).map((it) => ({ ...it, category: decodedCategory }));
    }
    return (group?.items ?? []).map((it) => ({ ...it, category: decodedCategory }));
  }, [data, decodedCategory, group, subcats, selectedSubcategory]);

  // Sort items
  const sortedItems = useMemo(() => {
    const arr = [...allItems];
    switch (sortOption) {
      case "alpha-asc":
        arr.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
      case "alpha-desc":
        arr.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
        break;
      case "price-asc":
        arr.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
        break;
      case "price-desc":
        arr.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
        break;
      default:
        break;
    }
    return arr;
  }, [allItems, sortOption]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedItems.length / itemsPerPage));
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = sortedItems.slice(startIdx, startIdx + itemsPerPage);

  if (loading) {
    return <LoadingSpinner message="Loading products..." />;
  }

  return (
    <div className="px-6 py-20">
      <div className="flex gap-6">
        {/* Sidebar */}
        {subcats.length > 0 && (
          <aside className="w-64 shrink-0">
            <div className="bg-white border rounded-lg p-4 shadow-sm sticky top-24">
              <h4 className="font-semibold mb-4 text-gray-800">Subcategories</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => {
                      setSelectedSubcategory(null);
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md transition ${
                      selectedSubcategory === null
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    All
                  </button>
                </li>
                {subcats.map((s) => (
                  <li key={s.name}>
                    <button
                      onClick={() => {
                        setSelectedSubcategory(s.name);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md transition ${
                        selectedSubcategory === s.name
                          ? "bg-blue-500 text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {s.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {decodedCategory || "All Products"}
            </h1>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortOpen((s) => !s)}
                className="flex items-center gap-2 px-4 py-2 bg-white border rounded-md shadow-sm hover:bg-gray-50 transition"
              >
                <span className="text-sm font-medium">
                  {SORT_OPTIONS.find((o) => o.key === sortOption)?.label}
                </span>
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {sortOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-50 overflow-hidden">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => {
                        setSortOption(opt.key);
                        setSortOpen(false);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition ${
                        sortOption === opt.key ? "bg-blue-50 text-blue-600 font-medium" : ""
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Products Grid */}
          {allItems.length === 0 ? (
            <EmptyState
              title="No products found"
              message="There are no products in this category yet."
              actionLabel="Browse All"
              actionTo="/"
            />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentItems.map((item) => (
                  <ProductCard
                    key={`${item.category}-${item.id}`}
                    item={item}
                    category={decodedCategory}
                  />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
