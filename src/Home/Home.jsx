// Home.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // 8 items per page

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/JSON/Dummy.json")
      .then((res) => res.json())
      .then((jsonData) => {
        setData(jsonData);
        setFilteredData(jsonData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;


    console.log("category",category);
    
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page on category change

    if (category === "All") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((cat) => cat.category === category);
      setFilteredData(filtered);
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  // Get all categories
  const categories = ["All", ...data.map((cat) => cat.category)];

  // Flatten items for pagination
  const allItems =
    selectedCategory === "All"
      ? filteredData.flatMap((cat) => cat.items ?? [])
      : filteredData[0]?.items ?? [];

  const openProduct = (item) => {
    navigate("/product", { state: { item } });
  };

  const openCart = (item) => {
    navigate("/cart", { state: { item } });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(allItems.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="px-6 py-20">
      {/* Category Dropdown */}
      <div className="mb-8">
        <label className="mr-4 font-semibold">Select Category:</label>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border px-3 py-1 rounded"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentItems.map((item) => (
          <div
            key={item.id}
            onClick={() => openProduct(item)}
            role="button"
            tabIndex={0}
            className="border rounded-lg shadow-md p-4 hover:shadow-xl transition cursor-pointer"
            onKeyDown={(e) => e.key === 'Enter' && openProduct(item)}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded mb-2"
            />
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
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
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
  );
};

export default Home;
