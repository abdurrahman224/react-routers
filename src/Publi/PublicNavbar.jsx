import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openDrawer, selectCart } from "../features/cart/cartSlice";

const PublicNavbar = () => {
  const [categories, setCategories] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const location = useLocation();
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  
  const path = location.pathname;
  const cartCount = (cart.items || []).reduce((s, it) => s + (it.qty || 0), 0);

  useEffect(() => {
    fetch("/JSON/Dummy.json")
      .then((r) => r.json())
      .then((json) => {
        const cats = json.map((c) => c.category).filter(Boolean);
        setCategories(cats);
      })
      .catch(() => setCategories([]));
  }, []);

  const isActive = (to) => path === to || path.startsWith(to + "/");

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md transition font-medium ${
        isActive(to)
          ? "bg-blue-100 text-blue-600"
          : "text-gray-700 hover:bg-gray-100"
      }`}
      onClick={() => setMobileMenuOpen(false)}
    >
      {children}
    </Link>
  );

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-blue-600">ShopApp</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/">Home</NavLink>
            {categories.map((cat) => (
              <NavLink key={cat} to={`/products/${encodeURIComponent(cat)}`}>
                {cat}
              </NavLink>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <button
              onClick={() => dispatch(openDrawer())}
              className="relative p-2 rounded-full hover:bg-gray-100 transition"
              aria-label="Open cart"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>

            {/* Login Button */}
            <Link
              to="/login"
              className="hidden sm:block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition font-medium"
            >
              Login
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-2">
              <NavLink to="/">Home</NavLink>
              {categories.map((cat) => (
                <NavLink key={cat} to={`/products/${encodeURIComponent(cat)}`}>
                  {cat}
                </NavLink>
              ))}
              <Link
                to="/login"
                className="px-3 py-2 text-blue-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default PublicNavbar;
//     </div>
//   );
// };

// export default PublicNavbar;
