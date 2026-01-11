import React from 'react';
import {  useSelector } from 'react-redux';
import {  selectAuth } from '../features/auth/authSlice';


const AdminDashboard = () => {
  const { user } = useSelector(selectAuth);
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="py-2">Admin , {user?.email ?? 'admin'}.</p>
      <p className="py-1">Role: {user?.role ?? 'ADMIN'}</p>
    </div>
  );
};

export default AdminDashboard;
