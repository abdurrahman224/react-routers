import React from "react";

const Analytics = () => {
  const topContent =
      [
      { title: "React Hooks Guide", views: "8.4k views" },
      { title: "Tailwind CSS Tutorial", views: "5.2k views" },
      { title: "JavaScript 2024 Trends", views: "3.1k views" },
    ];

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Analytics Overview</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-white p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Top Performing Content</h2>
          {topContent.map((content, index) => (
            <div key={index} className="py-3 flex justify-between border-b border-gray-200 last:border-0">
              <span>{content.title}</span>
              <span className="font-semibold text-green-600">{content.views}</span>
            </div>              
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
// import React from "react";

// const Analytics = () => {
//   return (
//     <div className="p-6 bg-base-200 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6">Analytics Overview</h1>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Recent Activity List */}
//         <div className="card bg-white p-6 shadow-lg">
//           <h2 className="text-xl font-bold mb-4">Top Performing Content</h2>
//           <ul className="divide-y divide-gray-200">
//             <li className="py-3 flex justify-between">
//               <span>React Hooks Guide</span>
//               <span className="font-semibold text-green-600">8.4k views</span>
//             </li>
//             <li className="py-3 flex justify-between">
//               <span>Tailwind CSS Tutorial</span>
//               <span className="font-semibold text-green-600">5.2k views</span>
//             </li>
//             <li className="py-3 flex justify-between">
//               <span>JavaScript 2024 Trends</span>
//               <span className="font-semibold text-green-600">3.1k views</span>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Analytics;
