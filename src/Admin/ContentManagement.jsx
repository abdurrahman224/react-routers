const ContentManagement = () => {
  // Sample Content Data
  const contents = [
    {
      id: 1,
      title: "How to learn React",
      author: "Aman",
      date: "2024-03-20",
      status: "Published",
      category: "Tutorial",
    },
    {
      id: 2,
      title: "Modern CSS Tips",
      author: "Rahul",
      date: "2024-03-22",
      status: "Draft",
      category: "Design",
    },
    {
      id: 3,
      title: "State Management in 2024",
      author: "Sanya",
      date: "2024-03-25",
      status: "Published",
      category: "Development",
    },
  ];

  const selectiOption = (
    <select className="select select-bordered w-full max-w-xs">
      <option disabled selected>
        Filter by Category
      </option>
      <option>Tutorial</option>
      <option>Design</option>
      <option>Development</option>
    </select>
  );

  const tablethde = (
    <tr className="text-base">
      <th>Title</th>
      <th>Author</th>
      <th>Date</th>
      <th>Status</th>
      <th className="text-center">Actions</th>
    </tr>
  );

  const button = (
    <>
      <button className="btn btn-sm btn-outline btn-info">View</button>
      <button className="btn btn-sm btn-outline">Edit</button>
      <button className="btn btn-sm btn-outline btn-error">Archive</button>
    </>
  );

  return (
    <div className="p-6 bg-base-100 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Content Library</h1>
          <p className="text-gray-500">Manage your articles and media here.</p>
        </div>
        <button className="btn btn-primary">+ Create New Post</button>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search articles..."
          className="input input-bordered w-full max-w-xs"
        />
        {selectiOption}
      </div>
      {/* Content Table */}
      <div className="card bg-base-100 border border-base-300">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>{tablethde}</thead>
            <tbody>
              {contents.map((item) => (
                <tr key={item.id}>
                  <td className="font-semibold text-primary cursor-pointer hover:underline">
                    {item.title}
                  </td>
                  <td>{item.author}</td>
                  <td>{item.date}</td>
                  <td>
                    <div
                      className={`badge badge-outline ${
                        item.status === "Published"
                          ? "badge-success"
                          : "badge-ghost"
                      }`}
                    >
                      {item.status}
                    </div>
                  </td>
                  <td className="flex justify-center gap-2">{button}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;


// import React, { useState } from 'react';

// const ContentManagement = () => {
//   // Sample Content Data
//   const [contents, setContents] = useState([
//     { id: 1, title: "How to learn React", author: "Aman", date: "2024-03-20", status: "Published", category: "Tutorial" },
//     { id: 2, title: "Modern CSS Tips", author: "Rahul", date: "2024-03-22", status: "Draft", category: "Design" },
//     { id: 3, title: "State Management in 2024", author: "Sanya", date: "2024-03-25", status: "Published", category: "Development" },
//   ]);

//   return (
//     <div className="p-6 bg-base-100 min-h-screen">
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
//         <div>
//           <h1 className="text-3xl font-bold">Content Library</h1>
//           <p className="text-gray-500">Manage your articles and media here.</p>
//         </div>
//         <button className="btn btn-primary">+ Create New Post</button>
//       </div>

//       {/* Filter & Search Bar */}
//       <div className="flex flex-wrap gap-4 mb-6">
//         <input 
//           type="text" 
//           placeholder="Search articles..." 
//           className="input input-bordered w-full max-w-xs" 
//         />
//         <select className="select select-bordered w-full max-w-xs">
//           <option disabled selected>Filter by Category</option>
//           <option>Tutorial</option>
//           <option>Design</option>
//           <option>Development</option>
//         </select>
//       </div>

//       {/* Content Table */}
//       <div className="card bg-base-100 border border-base-300">
//         <div className="overflow-x-auto">
//           <table className="table table-zebra">
//             <thead>
//               <tr className="text-base">
//                 <th>Title</th>
//                 <th>Author</th>
//                 <th>Date</th>
//                 <th>Status</th>
//                 <th className="text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {contents.map((item) => (
//                 <tr key={item.id}>
//                   <td className="font-semibold text-primary cursor-pointer hover:underline">
//                     {item.title}
//                   </td>
//                   <td>{item.author}</td>
//                   <td>{item.date}</td>
//                   <td>
//                     <div className={`badge badge-outline ${item.status === 'Published' ? 'badge-success' : 'badge-ghost'}`}>
//                       {item.status}
//                     </div>
//                   </td>
//                   <td className="flex justify-center gap-2">
//                     <button className="btn btn-sm btn-outline btn-info">View</button>
//                     <button className="btn btn-sm btn-outline">Edit</button>
//                     <button className="btn btn-sm btn-outline btn-error">Archive</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContentManagement;





