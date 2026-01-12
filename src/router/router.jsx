import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// Layouts
import PublicLayout from "../Publi/PublicLayout";
import AuthLayout from "../Auth/AuthLayout";
import UserLayout from "../UserLayout/UserLayout";
import AdminLayout from "../Admin/AdminLayout";

// Public Pages
import Hero from "../Home/Hero";
import Home from "../Home/Home";
import Products from "../Home/Products";
import ProductDetail from "../Home/ProductDetail";
import Cart from "../Home/Cart";
import Item from "../Home/Item";
import Items from "../Home/Items";
import ItemList from "../Home/ItemList";

// Auth Pages
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import ProtectedRoute from "./ProtectedRoute";

// User Pages
import User from "../UserLayout/User";
import UserData from "../UserLayout/UserData";

// Admin Pages
import AdminDashboard from "../Admin/AdminDashboard";
import AdminHome from "../Admin/AdminHome";
import UserManagement from "../Admin/UserManagement";
import ContentManagement from "../Admin/ContentManagement";
import Analytics from "../Admin/Analytics";
import Settings from "../Admin/Settings";
import Support from "../Admin/Support";

// 404 Component
const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center">
    <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
    <p className="text-xl text-gray-600 mb-6">Page not found</p>
    <a href="/" className="text-blue-500 hover:underline">
      ← Back to Home
    </a>
  </div>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route index element={<Hero />} />
        <Route path="category/:categoryName" element={<Home />} />
        <Route path="brand/:brandName" element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:category" element={<Products />} />
        <Route path="products/:category/:id" element={<ProductDetail />} />
        <Route path="product/:category/:id" element={<ProductDetail />} />
        <Route path="product" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="item" element={<Item />} />
        <Route path="items" element={<Items />} />
        <Route path="items-list" element={<ItemList />} />
      </Route>

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* User Dashboard */}
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

      {/* Admin Dashboard */}
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

      {/* 404 Fallback */}
      <Route path="*" element={<NotFound />} />
    </>
  )
);

export default router;
// );

// export default router;
