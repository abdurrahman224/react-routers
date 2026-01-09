import React from 'react';
import { useDispatch,  } from 'react-redux';
import { logout, } from '../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  return (
   

      <div>
            <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
  
     <Link to="/dashboard">
    <a className="btn btn-ghost text-xl"> User Dashboard </a>


        </Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
        <Link to="dashboard-data">

         User Data 

        </Link>
      <li>
       
      </li>
      
    </ul>
  </div>
  <div className="navbar-end">
   <button onClick={handleLogout} className="btn btn-sm btn-warning mt-4">Logout</button>
  </div>
</div>
        </div>





  );
};

export default UserDashboard;
