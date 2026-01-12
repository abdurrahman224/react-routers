import React from "react";
import { Outlet } from "react-router-dom";
import PublicNavbar from "./PublicNavbar";
import PublicFooter from "./PublicFooter";
import CartDrawer from "./CartDrawer";

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <CartDrawer />
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;
