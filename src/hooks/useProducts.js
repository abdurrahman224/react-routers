import { useState, useEffect, useMemo } from "react";

const SORT_OPTIONS = [
  { key: "alpha-asc", label: "Alphabetical (A-Z)" },
  { key: "alpha-desc", label: "Alphabetical (Z-A)" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
];

const useProducts = (category = "") => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [sortOption, setSortOption] = useState("alpha-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Fetch data
  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.BASE_URL || "/"}JSON/Dummy.json`)
      .then((r) => r.json())
      .then((json) => {
        setData(json || []);
        setError(null);
      })
      .catch((e) => {
        console.error("Failed to fetch products:", e);
        setError("Failed to load products");
      })
      .finally(() => setLoading(false));
  }, []);

  // Reset on category change
  useEffect(() => {
    setCurrentPage(1);
    setSelectedSubcategory(null);
  }, [category]);

  // Get category group
  const group = useMemo(
    () => (category ? data.find((g) => g.category === category) : null),
    [data, category]
  );

  // Get subcategories
  const subcategories = group?.subcategories ?? [];

  // Get all items
  const allItems = useMemo(() => {
    if (!category) {
      return data.flatMap((g) =>
        (g.items ?? []).map((it) => ({ ...it, category: g.category }))
      );
    }

    if (selectedSubcategory) {
      const sub = subcategories.find((s) => s.name === selectedSubcategory);
      return (sub?.items ?? []).map((it) => ({ ...it, category }));
    }

    return (group?.items ?? []).map((it) => ({ ...it, category }));
  }, [data, category, group, subcategories, selectedSubcategory]);

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
  const paginatedItems = sortedItems.slice(startIdx, startIdx + itemsPerPage);

  return {
    loading,
    error,
    data,
    group,
    subcategories,
    allItems,
    sortedItems,
    paginatedItems,
    // Sorting
    sortOption,
    setSortOption,
    SORT_OPTIONS,
    // Pagination
    currentPage,
    setCurrentPage,
    totalPages,
    itemsPerPage,
    // Subcategory
    selectedSubcategory,
    setSelectedSubcategory,
  };
};

export default useProducts;
