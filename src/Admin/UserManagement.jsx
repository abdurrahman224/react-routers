import React, { useState } from "react";

const UserManagement = () => {
  // Sample Data (Real app mein ye API se aayega)
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Aman Singh",
      email: "aman@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Rahul Kumar",
      email: "rahul@example.com",
      role: "Editor",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Sanya Gupta",
      email: "sanya@example.com",
      role: "User",
      status: "Active",
    },
  ]);

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const UserDataTh = (
    <tr className="bg-gray-500">
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  );

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button className="btn btn-primary btn-sm">+ Add New User</button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="table w-full">
          {/* Table Header */}
          <thead>{UserDataTh}</thead>

          {/* Table Body */}
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td>
                  <div className="font-bold">{user.name}</div>
                </td>
                <td>{user.email}</td>
                <td>
                  <span className="badge badge-ghost badge-sm">
                    {user.role}
                  </span>
                </td>
                <td>
                  <div
                    className={`badge ${
                      user.status === "Active"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {user.status}
                  </div>
                </td>
                <td className="flex gap-2">
                  <button className="btn btn-ghost btn-xs text-info">
                    Edit
                  </button>
                  <button
                    className="btn btn-ghost btn-xs text-error"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
