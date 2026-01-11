import React from 'react';
import { Outlet } from 'react-router-dom';
import UserDashboard from './UserDashboard';
import AdmineFooter from '../Admin/AdmineFooter';

const UserLayout = () => {
    return (
        <div>
            <UserDashboard/>
          
           <Outlet/>

           <AdmineFooter/>
        
        </div>
    );
};

export default UserLayout;