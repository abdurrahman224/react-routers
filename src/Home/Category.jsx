import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const Category = ({ data = [], selectedCategory: propSelectedCategory = null }) => {
	const [localSelected, setLocalSelected] = useState("All");
	// effectiveSelected uses prop when provided, otherwise local state
	const effectiveSelected = propSelectedCategory ?? localSelected;

	const handleCategoryChange = (e) => {
		const category = e.target.value;
		setLocalSelected(category);
	};

	const categories = useMemo(() => {
		const cats = data.map((cat) => cat.category || "");
		return ["All", ...Array.from(new Set(cats))];
	}, [data]);

	const allItems = useMemo(() => {
		if (effectiveSelected === "All") return data;
		return data.filter((cat) => cat.category === effectiveSelected);
	}, [data, effectiveSelected]);

	const navigate = useNavigate();

	return (
		<div className="px-6">


			{allItems.map((category) => (
				<div key={category.category} className="mb-12">
					<h2 className="text-2xl font-bold mb-6">{category.category}</h2>

					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{(category.items ?? []).map((item) => (
							<div
								key={item.id}
								onClick={() => navigate(`/products/${encodeURIComponent(category.category)}/${item.id}`)}
								role="button"
								tabIndex={0}
								className="border rounded-lg shadow-md p-4 hover:shadow-xl transition duration-300 cursor-pointer"
								onKeyDown={(e) => e.key === "Enter" && navigate(`/products/${encodeURIComponent(category.category)}/${item.id}`)}
							>
								{item.image && (
									<img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded mb-2" />
								)}

								<h3 className="text-lg font-semibold mb-2">{item.name}</h3>
								<p className="text-gray-600 mb-1">Brand: {item.brand}</p>
								<p className="text-green-600 font-bold mb-3">৳ {item.price}</p>

								<button
									onClick={(e) => {
										e.stopPropagation();
										navigate("/cart", { state: { item } });
									}}
									className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
								>
									Buy Now
								</button>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default Category;
