import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const PRICE_RANGES = [
  { key: "under-2000", label: "Under ৳2,000", min: 0, max: 1999 },
  { key: "2000-5000", label: "৳2,000 - ৳5,000", min: 2000, max: 5000 },
  { key: "5000-10000", label: "৳5,000 - ৳10,000", min: 5000, max: 10000 },
  { key: "10000-20000", label: "৳10,000 - ৳20,000", min: 10000, max: 20000 },
  { key: "above-20000", label: "Above ৳20,000", min: 20001, max: Infinity },
];

const TOP_CATEGORIES = ["Electronics", "Clothing", "Furniture", "Toys"];

const COLOR_MAP = {
  Electronics: { hover: "", ring: "", border: "" },
  Clothing: { hover: "hover:border-pink-300", ring: "ring-pink-500", border: "border-pink-200" },
  Furniture: { hover: "hover:border-amber-300", ring: "ring-amber-500", border: "border-amber-200" },
  Toys: { hover: "hover:border-green-300", ring: "ring-green-500", border: "border-green-200" },
};

const Hero = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL || "/"}JSON/Dummy.json`)
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="py-20 text-center">Loading...</div>;

  return (
 <div className="px-6  min-h-screen flex items-center justify-center">
      <div className=" max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
          {TOP_CATEGORIES.map((cat) => {
            const group = data.find((g) => g.category === cat) || {};
            const img =
              group.subcategories?.[0]?.items?.[0]?.image ||
              group.items?.[0]?.image ||
              `https://picsum.photos/200/200?random=${cat.length}`;

            const active = selectedCategory === cat;

            return (
              <div
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  navigate(`/products/${encodeURIComponent(cat)}`);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" && (setSelectedCategory(cat), navigate(`/products/${encodeURIComponent(cat)}`))
                }
                className=" text-center cursor-pointer"
              >
                <div
                  className={`w-28 h-28 mx-auto rounded-full overflow-hidden  transition-transform transform ${
                    COLOR_MAP[cat]?.hover || ""
                  } ${active ? `ring-2 ${COLOR_MAP[cat]?.ring || ""} ${COLOR_MAP[cat]?.border || ""}` : ""}`}
                >
                  <img
                    src={img}
                    alt={cat}
                    className="w-full h-full object-cover shadow"
                  />
                </div>
                <p className="mt-3 text-sm font-medium">{cat}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Hero;

