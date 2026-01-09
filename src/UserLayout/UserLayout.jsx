import React from 'react';
import { Outlet } from 'react-router-dom';
import UserDashboard from './UserDashboard';

const UserLayout = () => {
    return (
        <div>
            <UserDashboard/>
          
           <Outlet/>
        
        </div>
    );
};

export default UserLayout;