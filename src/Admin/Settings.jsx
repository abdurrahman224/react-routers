import React, { useState } from "react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "Profile", label: "User Profile" },
    { id: "Security", label: "Security" },
    { id: "Notifications", label: "Notifications" },
  ];

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* --- Sidebar Tabs --- */}
        <div className="flex flex-col gap-2 w-full lg:w-64 bg-white p-4 rounded-lg shadow h-fit">
          {tabs.map((tabs) => (
            <button
              onClick={() => setActiveTab(tabs.id)}
              className={`btn btn-ghost justify-start${
                activeTab === tabs.id
                  ? "btn-active bg-primary text-white hover:bg-primary"
                  : ""
              }`}
            >
              {tabs.label}
            </button>
          ))}
        </div>
        <div className="flex-1 bg-white p-6 rounded-lg shadow">
          {activeTab === "Profile" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">User Profile </h2>
            </div>
          )}

          {activeTab === "Security" && (
            <div>
              <h2 className="text-2xl font-bold mb-4" >Security Content</h2>
            </div>
          )}

          {activeTab === "Notifications" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Notifications Content</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;

// import React, { useState } from 'react';

// const Settings = () => {
//   const [activeTab, setActiveTab] = useState('profile');

//   return (
//     <div className="p-6 bg-base-200 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6">Settings</h1>

//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* --- Sidebar Tabs --- */}
//         <div className="flex flex-col gap-2 w-full lg:w-64 bg-white p-4 rounded-lg shadow h-fit">
//           <button
//             onClick={() => setActiveTab('profile')}
//             className={`btn btn-ghost justify-start ${activeTab === 'profile' ? 'btn-active bg-primary text-white hover:bg-primary' : ''}`}
//           >
//             User Profile
//           </button>
//           <button
//             onClick={() => setActiveTab('security')}
//             className={`btn btn-ghost justify-start ${activeTab === 'security' ? 'btn-active bg-primary text-white hover:bg-primary' : ''}`}
//           >
//             Security
//           </button>
//           <button
//             onClick={() => setActiveTab('notifications')}
//             className={`btn btn-ghost justify-start ${activeTab === 'notifications' ? 'btn-active bg-primary text-white hover:bg-primary' : ''}`}
//           >
//             Notifications
//           </button>
//         </div>

//         {/* --- Content Area --- */}
//         <div className="flex-1 bg-white p-8 rounded-lg shadow">

//           {/* Profile Section */}
//           {activeTab === 'profile' && (
//             <div>

//             </div>
//           )}

//           {/* Security Section */}
//           {activeTab === 'security' && (
//             <div>

//             </div>
//           )}

//           {/* Notifications Section */}
//           {activeTab === 'notifications' && (
//             <div>

//               </div>

//           )}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Settings;
