import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import PublicLayout from "../Publi/PublicLayout";
import AuthLayout from "../Auth/AuthLayout";
import UserLayout from "../UserLayout/UserLayout";
import AdminLayout from "../Admin/AdminLayout";
import Hero from "../Home/Hero";
import Home from "../Home/Home";
import Item from "../Home/Item";
import Items from "../Home/Items";
import Cart from "../Home/Cart";
import ItemList from "../Home/ItemList";
import ProductDetail from "../Home/ProductDetail";


import Login from "../Auth/Login";
import Register from "../Auth/Register";
import ProtectedRoute from "./ProtectedRoute";
import UserDashboard from "../UserLayout/UserDashboard";
import UserData from "../UserLayout/UserData";
import User from "../UserLayout/User";

import AdminDashboard from "../Admin/AdminDashboard";
import AdminHome from "../Admin/AdminHome";
import UserManagement from "../Admin/UserManagement";
import ContentManagement from "../Admin/ContentManagement";
import Analytics from "../Admin/Analytics";
import Settings from "../Admin/Settings";
import Support from "../Admin/Support";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route index element={<Hero />} />
        <Route path="hero" element={<Home />} />
        <Route path="item" element={<Item />} />
        <Route path="items" element={<Items />} />
        <Route path="items-list" element={<ItemList />} />
        <Route path="product" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
     
      </Route>

      {/* Authentication Routes */}
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* User Routes */}
      <Route
        path="dashboard"
        element={
          <ProtectedRoute requiredRole="user">
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<User />} />
        <Route path="dashboard-data" element={<UserData />} />
      </Route>

      {/* Admin Routes */}
      <Route
        path="admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="home" element={<AdminHome />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="content" element={<ContentManagement />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
        <Route path="support" element={<Support />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </>
  )
);
export default router;





// import React from "react";
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
// } from "react-router-dom";
// import PublicLayout from "../Publi/PublicLayout";

// import AuthLayout from "../Auth/AuthLayout";
// import Home from "../Home/Home";
// import Login from "../Auth/Login";
// import Register from "../Auth/Register";
// import Hero from "../Home/Hero";
// import Item from "../Home/Item";
// import Items from "../Home/Items";
// import ProtectedRoute from "./ProtectedRoute";
// import UserDashboard from "../UserLayout/UserDashboard";
// import AdminDashboard from "../Admin/AdminDashboard";
// import AdminHome from "../Admin/AdminHome";
// import AdminLayout from "../Admin/AdminLayout";
// import UserLayout from "../UserLayout/UserLayout";
// import UserData from "../UserLayout/UserData";
// import User from "../UserLayout/User";
// import UserManagement from "../Admin/UserManagement";
// import ContentManagement from "../Admin/ContentManagement";
// import Analytics from "../Admin/Analytics";
// import Settings from "../Admin/Settings";
// import Support from "../Admin/Support";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//       <Route element={<PublicLayout />}>
//         <Route path="/" element={<Hero />} />
//         <Route path="item" element={<Item />} />
//         <Route path="hero" element={<Home />} />
//         <Route path="items" element={<Items />} />
//       </Route>

//       <Route element={<AuthLayout />}>
//         <Route path="login" element={<Login />} />
//         <Route path="register" element={<Register />} />
//       </Route>

//       <Route
//         path="dashboard"
//         element={
//           <ProtectedRoute requiredRole="user">
//             <UserLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<User />} />
//         <Route path="dashboard-data" element={<UserData />} />
//       </Route>

//       <Route
//         path="admin"
//         element={
//           <ProtectedRoute requiredRole="admin">
//             <AdminLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route element={<AdminDashboard />} />
//         <Route path="dashboard" element={<AdminDashboard />} />
//         <Route path="home" element={<AdminHome />} />
//         <Route path="users" element={<UserManagement/>} />
//         <Route path="content" element={<ContentManagement/>}/>
//         <Route path="analytics" element={<Analytics/>}/>
//         <Route path="settings" element={<Settings/>} />

//         <Route path="support" element={<Support/>} />

//       </Route>

//       <Route path="*" element={<h1>404 Not Found</h1>} />
//     </>
//   )
// );

// export default router;
