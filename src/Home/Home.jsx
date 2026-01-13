// Home.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [brands, setBrands] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [appliedMin, setAppliedMin] = useState(null);
  const [appliedMax, setAppliedMax] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // 8 items per page
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetch(`${API_BASE}/api/categories`)
      .then((res) => res.json())
      .then((jsonData) => {
        setData(jsonData);
        setFilteredData(jsonData);
        setLoading(false);

        // categories and brands extraction
        const b = Array.from(
          new Set(
            jsonData.flatMap((c) => (c.items ?? []).map((it) => it.brand)).filter(Boolean)
          )
        );
        setBrands(b);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // respond to route params for category or brand
  useEffect(() => {
    const catParam = params?.categoryName ? decodeURIComponent(params.categoryName) : null;
    const brandParam = params?.brandName ? decodeURIComponent(params.brandName) : null;

    if (brandParam && data.length) {
      // filter across all categories by brand, but do NOT hide the brands list
      const items = data.flatMap((c) => c.items ?? []).filter((it) => it.brand === brandParam);
      setFilteredData([{ category: brandParam, items }]);
      setCurrentPage(1);
      return;
    }

    if (catParam && data.length) {
      setSelectedCategory(catParam);
      setCurrentPage(1);
      const filtered = data.filter((cat) => cat.category === catParam);
      setFilteredData(filtered.length ? filtered : []);
      return;
    }

    if (!catParam && !brandParam && data.length) {
      setSelectedCategory("All");
      setFilteredData(data);
    }
  }, [params, data]);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setCurrentPage(1);

    if (category === "All") {
      setFilteredData(data);
      navigate("/");
    } else {
      // navigate to category route (keeps URL in sync)
      navigate(`/category/${encodeURIComponent(category)}`);
      const filtered = data.filter((cat) => cat.category === category);
      setFilteredData(filtered);
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  // Get all categories for the dropdown and sidebar
  const categories = ["All", ...Array.from(new Set(data.map((cat) => cat.category).filter(Boolean)))];

  const activeCategory = params?.categoryName ? decodeURIComponent(params.categoryName) : null;
  const activeBrand = params?.brandName ? decodeURIComponent(params.brandName) : null;

  // If the route param isn't set yet (e.g. immediate after dropdown change),
  // prefer `selectedCategory` when it's not 'All'. This ensures the sidebar
  // shows only the selected category's brands immediately.
  const effectiveCategory = activeCategory || (selectedCategory && selectedCategory !== "All" ? selectedCategory : null);

  // Flatten items for pagination and keep category on each item
  let allItems = filteredData.flatMap((cat) => (cat.items ?? []).map((it) => ({ ...it, category: cat.category })));

  // apply price filter if set
  if (appliedMin !== null || appliedMax !== null) {
    allItems = allItems.filter((it) => {
      if (appliedMin !== null && it.price < appliedMin) return false;
      if (appliedMax !== null && it.price > appliedMax) return false;
      return true;
    });
  }

  // Determine which brands to show in the sidebar:
  // - if 'All' selected, show all brands
  // - otherwise show brands only from the active filtered category (or the single brand when filtering by brand)
  // Show brands list globally unless a specific category is active —
  // if a category is active, show only brands belonging to that category
  const displayedBrands = effectiveCategory
    ? Array.from(
        new Set(
          (data.find((c) => c.category === effectiveCategory)?.items ?? []).map((it) => it.brand).filter(Boolean)
        )
      )
    : brands;

  const sidebarWidth = effectiveCategory ? "w-64" : "w-80";

  const openProduct = (item) => {
    const cat = encodeURIComponent(item.category || "");
    navigate(`/product/${cat}/${item.id}`, { state: { item } });
  };

  const openCart = (item) => {
    navigate("/cart", { state: { item } });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.max(1, Math.ceil(allItems.length / itemsPerPage));

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="px-6 py-20">
      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className={`${sidebarWidth} sticky top-24 hidden lg:block`}>
          {!effectiveCategory && (
            <div className="border rounded p-4 mb-6">
              <h4 className="font-semibold mb-3">COLLECTIONS</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className={`block ${!effectiveCategory ? "font-bold text-blue-600" : ""}`}>
                    <span className="flex items-center">
                      <img
                        src={data[0]?.items?.[0]?.image}
                        alt="All"
                        className="w-20 h-12 object-cover rounded-md mr-3 border"
                      />
                      <span>All</span>
                    </span>
                  </Link>
                </li>
                {categories
                  .filter((c) => c !== "All")
                  .map((cat) => {
                    const catImage = data.find((d) => d.category === cat)?.items?.[0]?.image;
                    return (
                      <li key={cat}>
                        <Link
                          to={`/category/${encodeURIComponent(cat)}`}
                          className={`block ${effectiveCategory === cat ? "font-bold text-blue-600" : ""}`}
                        >
                          <span className="flex items-center">
                            {catImage && (
                              <img
                                src={catImage}
                                alt={cat}
                                className="w-20 h-12 object-cover rounded-md mr-3 border"
                              />
                            )}
                            <span>{cat}</span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          )}

          <div className="border rounded p-4">
            <h4 className="font-semibold mb-3">Brands</h4>
            <ul className="space-y-2">
              {displayedBrands.length ? (
                displayedBrands.map((b) => (
                  <li key={b}>
                    <Link
                      to={`/brand/${encodeURIComponent(b)}`}
                      className={`block ${activeBrand === b ? "font-bold text-blue-600" : ""}`}
                    >
                      {b}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-500">No brands</li>
              )}
            </ul>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1">
          {/* Price Filter (always visible) */}
          <div className="mb-8 flex items-center gap-3">
            <div className="font-semibold">Price Filter:</div>
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="border px-3 py-1 rounded w-24"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="border px-3 py-1 rounded w-24"
            />
            <button
              onClick={() => {
                setAppliedMin(minPrice !== "" ? Number(minPrice) : null);
                setAppliedMax(maxPrice !== "" ? Number(maxPrice) : null);
                setCurrentPage(1);
              }}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Apply
            </button>
            <button
              onClick={() => {
                setMinPrice("");
                setMaxPrice("");
                setAppliedMin(null);
                setAppliedMax(null);
                setCurrentPage(1);
              }}
              className="bg-gray-200 px-3 py-1 rounded"
            >
              Clear
            </button>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentItems.map((item) => (
              <div
                key={`${item.category}-${item.id}-${item.name}`}
                onClick={() => openProduct(item)}
                role="button"
                tabIndex={0}
                className="border rounded-lg shadow-md p-4 hover:shadow-xl transition cursor-pointer"
                onKeyDown={(e) => e.key === "Enter" && openProduct(item)}
              >
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
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 space-x-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
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

export default Home;
