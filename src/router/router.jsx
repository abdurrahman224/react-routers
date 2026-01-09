import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import PublicLayout from "../Publi/PublicLayout";

import AuthLayout from "../Auth/AuthLayout";
import Home from "../Home/Home";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Hero from "../Home/Hero";
import Item from "../Home/Item";
import Items from "../Home/Items";
import ProtectedRoute from "./ProtectedRoute";
import UserDashboard from "../UserLayout/UserDashboard";
import AdminDashboard from "../Admin/AdminDashboard";
import AdminHome from "../Admin/AdminHome";
import AdminLayout from "../Admin/AdminLayout";
import UserLayout from "../UserLayout/UserLayout";
import UserData from "../UserLayout/UserData";
import User from "../UserLayout/User";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Hero />} />
        <Route path="item" element={<Item />} />
        <Route path="hero" element={<Home />} />
        <Route path="items" element={<Items />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

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

      <Route
        path="admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route element={<AdminDashboard />} />
        <Route path="home" element={<AdminHome />} />
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>

      <Route path="*" element={<h1>404 Not Found</h1>} />
    </>
  )
);

export default router;
