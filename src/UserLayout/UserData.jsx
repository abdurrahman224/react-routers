import React from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from '../features/auth/authSlice';

const UserData = () => {

  const { user } = useSelector(selectAuth);

    return (
        <div>
     <div className="p-6">
       <h1 className="text-3xl font-bold">User Dashboard</h1>
       <p className="py-2">Welcome, {user?.email ?? 'user'}.</p>
       <p className="py-1">Role: {user?.role ?? 'USER'}</p>
       
     </div>
        </div>
    );
};

export default UserData;