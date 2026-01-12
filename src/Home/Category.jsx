// import React, { useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";

// const Category = ({ data = [] }) => {
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [filteredData, setFilteredData] = useState([]);

//   const handleCategoryChange = (e) => {
//     const category = e.target.value;
//     setSelectedCategory(category);

//     if (category === "All") {
//       setFilteredData(data);
//     } else {
//       const filtered = data.filter((cat) => cat.category === category);
//       setFilteredData(filtered);
//     }
//   };

//   const categories = useMemo(() => {
//     const cats = data.map((cat) => cat.category || "");
//     return ["All", ...Array.from(new Set(cats))];
//   }, [data]);

//   const allItems = useMemo(() => {
//     if (selectedCategory === "All") {
//       return data;
//     }
//     return filteredData.length ? filteredData : [];
//   }, [data, selectedCategory, filteredData]);

//   const navigate = useNavigate();

//   return (
//     <div className="px-6">
//       <div className="my-6">
//         <label className="mr-4 font-semibold">Select Category:</label>
//         <select
//           value={selectedCategory}
//           onChange={handleCategoryChange}
//           className="border px-3 py-2 rounded "
//         >
//           {categories.map((cat) => (
//             <option key={cat} value={cat}>
//               {cat}
//             </option>
//           ))}
//         </select>
//       </div>

//       {allItems.map((category) => (
//         <div key={category.category} className="mb-12">
//           {/* Category Title */}
//           <h2 className="text-2xl font-bold mb-6">{category.category}</h2>

//           {/* Items Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {(category.items ?? []).map((item) => (
//               <div
//                 key={item.id}
//                 onClick={() => navigate("/product", { state: { item } })}
//                 role="button"
//                 tabIndex={0}
//                 className="border rounded-lg shadow-md p-4 hover:shadow-xl transition duration-300 cursor-pointer"
//                 onKeyDown={(e) => e.key === 'Enter' && navigate("/product", { state: { item } })}
//               >
//                 {/* Item Image */}
//                 {item.image && (
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-full h-40 object-cover rounded mb-2"
//                   />
//                 )}

//                 {/* Item Details */}
//                 <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
//                 <p className="text-gray-600 mb-1">Brand: {item.brand}</p>
//                 <p className="text-green-600 font-bold mb-3">৳ {item.price}</p>

//                 {/* Buy Button */}
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     navigate("/cart", { state: { item } });
//                   }}
//                   className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
//                 >
//                   Buy Now
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Category;
